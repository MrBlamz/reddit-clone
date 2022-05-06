import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  ADD_VOTE,
  DELETE_VOTE,
  SWAP_VOTE,
  FOLLOW_COMMUNITY,
  UNFOLLOW_COMMUNITY,
} from '../../constants';
import app from '../../firebase.config';
import { sanitizeString } from '../string';

export const db = getFirestore(app);

const getDocumentFromCollection = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  return await getDoc(docRef);
};

const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => doc.data());
};

const getDocumentsFromCollectionByConstraints = async (
  collectionName,
  ...constraints
) => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

const createDocument = (collectionName) => doc(collection(db, collectionName));

// Fetching from db functions

export const checkIfUsernameIsAvailable = async (username) => {
  const sanitizedUsername = sanitizeString(username);
  const querySnapshot = await getDocs(collection(db, 'usernames'));

  return querySnapshot.docs.every((doc) => doc.id !== sanitizedUsername);
};

export const fetchUsername = async (userId) => {
  const docSnapshot = await getDocumentFromCollection('users', userId);

  if (docSnapshot.exists()) {
    return docSnapshot.data().username;
  }

  throw new Error('Username not found');
};

export const fetchUserData = async (userId) => {
  const docSnapshot = await getDocumentFromCollection('users', userId);

  return docSnapshot.exists() && docSnapshot.data();
};

export const fetchCommunityId = async (communityName) => {
  const sanitizedCommunityName = sanitizeString(communityName);

  const docSnapshot = await getDocumentFromCollection(
    'communityNames',
    sanitizedCommunityName
  );

  return docSnapshot.exists() ? docSnapshot.data().id : null;
};

export const fetchCommunityData = async (communityName) => {
  const communityId = await fetchCommunityId(communityName);

  if (!communityId) return;

  const docSnapshot = await getDocumentFromCollection(
    'communities',
    communityId
  );

  return docSnapshot.exists() && docSnapshot.data();
};

export const fetchPosts = () => getCollection('posts');

export const fetchPost = async (postId) => {
  const docSnapshot = await getDocumentFromCollection('posts', postId);

  return docSnapshot.exists() ? docSnapshot.data() : null;
};

export const fetchCommunitiesByName = (name) => {
  const sanitizedName = sanitizeString(name);

  return getDocumentsFromCollectionByConstraints(
    'communities',
    where('sanitizedName', '>=', sanitizedName),
    where('sanitizedName', '<=', sanitizedName + '\uf8ff')
  );
};

export const fetchPostComments = (postId) =>
  getDocumentsFromCollectionByConstraints(
    'comments',
    where('postId', '==', postId)
  );

export const fetchPostComment = async (commentId) => {
  const docSnapshot = await getDocumentFromCollection('comments', commentId);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }

  throw new Error('Comment not found!');
};

export const fetchOrderedCommentsByPostTime = (postId, options) =>
  getDocumentsFromCollectionByConstraints(
    'comments',
    where('postId', '==', postId),
    orderBy('timestamp', options)
  );

export const fetchOrderedCommentsByVoteNumber = (postId) =>
  getDocumentsFromCollectionByConstraints(
    'comments',
    where('postId', '==', postId),
    orderBy('votes', 'desc'),
    orderBy('timestamp', 'desc')
  );

export const fetchPostsByVoteNumber = () =>
  getDocumentsFromCollectionByConstraints(
    'posts',
    orderBy('votes', 'desc'),
    orderBy('timestamp', 'desc')
  );

export const fetchPostsByPostTime = (options) =>
  getDocumentsFromCollectionByConstraints(
    'posts',
    orderBy('timestamp', options)
  );

export const fetchCommunityPostsByVoteNumber = (communityId) =>
  getDocumentsFromCollectionByConstraints(
    'posts',
    where('communityId', '==', communityId),
    orderBy('votes', 'desc'),
    orderBy('timestamp', 'desc')
  );

export const fetchCommunityPostsByPostTime = (communityId, options) =>
  getDocumentsFromCollectionByConstraints(
    'posts',
    where('communityId', '==', communityId),
    orderBy('timestamp', options)
  );

// Posting to db functions

export const writeUsernameInDb = (username, userId) => {
  const sanitizedUsername = sanitizeString(username);
  return Promise.all([
    setDoc(doc(db, 'usernames', sanitizedUsername), { userId }),
    setDoc(doc(db, 'users', userId), { username: username }),
  ]);
};

const saveUsername = (username, userId) => {
  const sanitizedUsername = sanitizeString(username);
  setDoc(doc(db, 'usernames', sanitizedUsername), { userId });
};

const saveUserData = (userId, userData) =>
  setDoc(doc(db, 'users', userId), userData);

export const handleSignUpWithEmailAndPassword = (userId, userData) => {
  const { username } = userData;

  return Promise.all([
    saveUsername(username, userId),
    saveUserData(userId, userData),
  ]);
};

export const createCommunity = async (name, description) => {
  const docRef = createDocument('communities');
  const sanitizedName = sanitizeString(name);

  const newCommunity = {
    name,
    description,
    sanitizedName,
    members: 0,
    timestamp: Date.now(),
    id: docRef.id,
  };

  return Promise.all([
    setDoc(docRef, newCommunity),
    setDoc(doc(db, 'communityNames', sanitizedName), { id: docRef.id }),
  ]);
};

export const createPost = async (
  title,
  userId,
  author,
  content,
  communityId,
  communityName
) => {
  const docRef = createDocument('posts');

  const newPost = {
    title,
    content,
    author,
    communityName,
    votes: 0,
    commentsNumber: 0,
    userId,
    communityId,
    id: docRef.id,
    timestamp: Date.now(),
  };

  await setDoc(docRef, newPost);

  return docRef.id;
};

export const createComment = async (content, author, userId, postId) => {
  const docRef = createDocument('comments');

  const newComment = {
    author,
    content,
    userId,
    postId,
    votes: 0,
    timestamp: Date.now(),
    id: docRef.id,
  };

  await setDoc(docRef, newComment);

  return newComment;
};

const updateUserVotes = (userDataDoc, collection, action, id, vote) => {
  switch (action) {
    case ADD_VOTE:
    case SWAP_VOTE:
      return { ...userDataDoc.data().votes[collection], [id]: vote };

    case DELETE_VOTE:
      const votes = { ...userDataDoc.data().votes[collection] };
      delete votes[id];
      return votes;

    default:
      return { ...userDataDoc.data().votes[collection] };
  }
};

export const handleVote = async (collection, action, vote, userId, id) => {
  const OPTIONS = {
    [ADD_VOTE]: (doc) => (vote ? doc.data().votes + 1 : doc.data().votes - 1),
    [DELETE_VOTE]: (doc) =>
      vote ? doc.data().votes - 1 : doc.data().votes + 1,
    [SWAP_VOTE]: (doc) => (vote ? doc.data().votes + 2 : doc.data().votes - 2),
  };

  const userDataRef = doc(db, 'users', userId);
  const docRef = doc(db, collection, id);

  try {
    return await runTransaction(db, async (transaction) => {
      const userDataDoc = await transaction.get(userDataRef);
      const doc = await transaction.get(docRef);
      const handleVote = OPTIONS[action];

      const updatedVoteNumber = handleVote(doc);
      const updatedUserVotes = updateUserVotes(
        userDataDoc,
        collection,
        action,
        id,
        vote
      );

      transaction.update(docRef, { votes: updatedVoteNumber });
      transaction.update(userDataRef, {
        [`votes.${collection}`]: updatedUserVotes,
      });

      return updatedVoteNumber;
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUserFollowingCommunities = (userDataDoc, action, communityId) => {
  switch (action) {
    case FOLLOW_COMMUNITY:
      return {
        ...userDataDoc.data().following.communities,
        [communityId]: true,
      };

    case UNFOLLOW_COMMUNITY:
      const userCommunities = { ...userDataDoc.data().following.communities };
      delete userCommunities[communityId];
      return userCommunities;

    default:
      return { ...userDataDoc.data().following.communities };
  }
};

export const handleFollowingCommunity = async (action, communityId, userId) => {
  const OPTIONS = {
    [FOLLOW_COMMUNITY]: (doc) => doc.data().members + 1,
    [UNFOLLOW_COMMUNITY]: (doc) => doc.data().members - 1,
  };

  const userDataRef = doc(db, 'users', userId);
  const communityDocRef = doc(db, 'communities', communityId);

  try {
    return await runTransaction(db, async (transaction) => {
      const userDataDoc = await transaction.get(userDataRef);
      const communityDoc = await transaction.get(communityDocRef);
      const handleAction = OPTIONS[action];

      const updatedCommunityMemberCount = handleAction(communityDoc);
      const updatedUserFollowingCommunities = updateUserFollowingCommunities(
        userDataDoc,
        action,
        communityId
      );

      transaction.update(communityDocRef, {
        members: updatedCommunityMemberCount,
      });
      transaction.update(userDataRef, {
        'following.communities': updatedUserFollowingCommunities,
      });

      return updatedCommunityMemberCount;
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
