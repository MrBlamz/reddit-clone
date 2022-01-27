import { app } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

auth.useDeviceLanguage();

export const signInWithGoogleAccount = () => {
  return signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  });
};

export const signUpWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOut = () => auth.signOut();
