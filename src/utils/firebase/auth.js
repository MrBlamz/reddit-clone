import { app } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword as loginWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

auth.useDeviceLanguage();

export const signInWithGoogleAccount = () => {
  return signInWithPopup(auth, provider);
};

export const signInWithEmailAndPassword = (email, password) =>
  loginWithEmailAndPassword(auth, email, password);

export const signUpWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = () => auth.signOut();
