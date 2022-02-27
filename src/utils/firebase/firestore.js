import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
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

export const writeUsernameInDb = (username, userID) => {
  const sanitizedUsername = username.toLowerCase();
  return Promise.all([
    setDoc(doc(db, 'usernames', sanitizedUsername), { userID }),
    setDoc(doc(db, 'users', userID), { username: username }),
  ]);
};

export const fetchUsername = async (userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data().username;
  }

  throw new Error('Username not found');
};

export const fetchUserData = async (userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.exists() ? docSnapshot.data() : {};
};
