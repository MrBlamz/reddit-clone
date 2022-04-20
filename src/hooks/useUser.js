import { useSelector } from 'react-redux';
import { selectAuthStatus, selectUserId, selectUsername } from '../store/auth';

export const useUser = () => {
  const isLoggedIn = useSelector(selectAuthStatus);
  const userId = useSelector(selectUserId);
  const username = useSelector(selectUsername);

  return {
    isLoggedIn,
    userId,
    username,
  };
};
