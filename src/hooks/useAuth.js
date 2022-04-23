import { useDispatch } from 'react-redux';
import { actions as authActions, USER_DATA } from '../store/auth';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

export const useAuth = () => {
  const dispatch = useDispatch();
  let isFirstRun = true;

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
        const userData = (await fetchUserData(user.uid)) || USER_DATA;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(userData));

        dispatch(
          authActions.login({
            user: user.toJSON(),
            userData,
          })
        );

        if (!isFirstRun) return;
      }

      if (isFirstRun) {
        isFirstRun = false;
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
