import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAyzfIbuN1Dj3mvskpFvizVgdmyEhAdhgU',
  authDomain: 'reddit-clone-e4f5b.firebaseapp.com',
  projectId: 'reddit-clone-e4f5b',
  storageBucket: 'reddit-clone-e4f5b.appspot.com',
  messagingSenderId: '780034242464',
  appId: '1:780034242464:web:544c45ea26f44ef819d6c5',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
