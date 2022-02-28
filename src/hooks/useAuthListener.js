import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

const useAuthListener = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const authUserData = JSON.parse(localStorage.getItem('authUserData'));

  const [user, setUser] = useState(
    authUser ? { ...authUser, data: authUserData } : null
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userData = await fetchUserData(authUser.uid);
        authUser.data = userData;
        localStorage.setItem('authUser', JSON.stringify(authUser));
        localStorage.setItem('authUserData', JSON.stringify(userData));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authUserData');
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
};

export default useAuthListener;
