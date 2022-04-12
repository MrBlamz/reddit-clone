import { useDispatch, useSelector } from 'react-redux';
import {
  actions as authActions,
  selectAuthStatus,
  selectUserId,
  selectUsername,
} from '../store/auth';
import { auth } from '../utils/firebase/auth';
import { fetchUserData } from '../utils/firebase/firestore';

const useUser = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthStatus);
  const username = useSelector(selectUsername);
  const userId = useSelector(selectUserId);

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
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        dispatch(authActions.logout());
      }
    });
  };

  return {
    isLoggedIn,
    username,
    userId,
    fetchUserFromLocalStorage,
    listenForAuthChanges,
  };
};

export default useUser;
