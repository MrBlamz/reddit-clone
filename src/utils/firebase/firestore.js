import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import app from '../../firebase.config';

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
  const sanitizedUsername = username.toLowerCase();
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

  return docSnapshot.exists() ? docSnapshot.data() : {};
};

export const checkIfCommunityExists = async (communityName) => {
  const sanitizedCommunityName = communityName.toLowerCase().trim();
  const docSnapshot = await getDocumentFromCollection(
    'communityNames',
    sanitizedCommunityName
  );

  return docSnapshot.exists() ? docSnapshot.data() : null;
};

export const fetchPosts = () => getCollection('posts');

export const fetchPost = async (postId) => {
  const docSnapshot = await getDocumentFromCollection('posts', postId);

  return docSnapshot.exists() ? docSnapshot.data() : {};
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

export const fetchCommunityPosts = (communityId) =>
  getDocumentsFromCollectionByConstraints(
    'posts',
    where('communityId', '==', communityId)
  );

// Posting to db functions

export const writeUsernameInDb = (username, userId) => {
  const sanitizedUsername = username.toLowerCase();
  return Promise.all([
    setDoc(doc(db, 'usernames', sanitizedUsername), { userId }),
    setDoc(doc(db, 'users', userId), { username: username }),
  ]);
};

export const createCommunity = async (name) => {
  const docRef = createDocument('communities');
  const sanitizedCommunityName = name.toLowerCase().trim();

  const newCommunity = {
    name,
    id: docRef.id,
  };

  return Promise.all([
    setDoc(docRef, newCommunity),
    setDoc(doc(db, 'communityNames', sanitizedCommunityName), newCommunity),
  ]);
};

export const createPost = (
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

  return setDoc(docRef, newPost);
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
