import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import app from '../../firebase.config';

export const db = getFirestore(app);

export const checkIfUsernameIsAvailable = async (username) => {
  const querySnapshot = await getDocs(collection(db, 'usernames'));
  const sanitizedUsername = username.toLowerCase();

  let isAvailable = true;

  for (const i in querySnapshot.docs) {
    const doc = querySnapshot.docs[i];

    if (doc.id === sanitizedUsername) {
      isAvailable = false;
    }
  }

  return isAvailable;
};

export const writeUsernameInDb = (username, userId) => {
  const sanitizedUsername = username.toLowerCase();
  return Promise.all([
    setDoc(doc(db, 'usernames', sanitizedUsername), { userId }),
    setDoc(doc(db, 'users', userId), { username: username }),
  ]);
};

export const fetchUsername = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data().username;
  }

  throw new Error('Username not found');
};

export const fetchUserData = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.exists() ? docSnapshot.data() : {};
};

export const fetchPosts = async () => {
  const posts = [];
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => posts.push(doc.data()));
  return posts;
};

export const fetchPost = async (postId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.exists() ? docSnapshot.data() : {};
};

export const fetchPostComments = async (postId) => {
  const comments = [];
  const q = query(collection(db, 'comments'), where('postId', '==', postId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => comments.push(doc.data()));
  return comments;
};

export const fetchCommunityPosts = async (communityName) => {
  const posts = [];
  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', communityName)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => posts.push(doc.data()));
  return posts;
};

export const createCommunity = (name, description) => {
  const docRef = doc(collection(db, 'communities'));
  const sanitizedUsername = name.toLowerCase();

  const newCommunity = {
    name: sanitizedUsername,
    description,
    id: docRef.id,
  };

  setDoc(docRef, newCommunity);
};

export const createPost = (
  title,
  userId,
  author,
  content,
  communityId,
  communityName
) => {
  const docRef = doc(collection(db, 'posts'));

  const newPost = {
    title,
    content,
    author,
    communityName,
    upVotes: 0,
    downVotes: 0,
    commentsNumber: 0,
    userId,
    communityId,
    id: docRef.id,
    timestamp: Date.now(),
  };

  setDoc(docRef, newPost);
};
