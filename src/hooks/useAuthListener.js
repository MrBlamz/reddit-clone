import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

const useAuthListener = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userData = await fetchUserData(authUser.uid);
        authUser.data = userData;
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => listener();
  });

  return { user };
};

export default useAuthListener;
