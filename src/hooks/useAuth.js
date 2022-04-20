import { useDispatch } from 'react-redux';
import { actions as authActions } from '../store/auth';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

export const useAuth = () => {
  const dispatch = useDispatch();

  const fetchUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (user) {
      dispatch(authActions.fetchUserFromLocalStorage({ user, userData }));
    }
  };

  const listenForAuthChanges = () => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await fetchUserData(user.uid);

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(userData));

        dispatch(
          authActions.login({
            user: user.toJSON(),
            userData,
          })
        );

        return;
      }

      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      dispatch(authActions.logout());
    });
  };

  return {
    fetchUserFromLocalStorage,
    listenForAuthChanges,
  };
};
