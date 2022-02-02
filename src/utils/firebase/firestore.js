import {
  collection,
  doc,
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

export const writeUsernameInDb = async (username, uid) => {
  const sanitizedUsername = username.toLowerCase();
  return setDoc(doc(db, 'usernames', sanitizedUsername), { uid });
};
