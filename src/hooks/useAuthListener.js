import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase/auth';

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser')) || {}
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  });

  return { user };
};

export default useAuthListener;
