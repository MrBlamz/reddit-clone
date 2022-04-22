import { useDispatch, useSelector } from 'react-redux';
import {
  actions as userActions,
  selectAuthStatus,
  selectUserId,
  selectUsername,
} from '../store/auth';

export const useUser = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthStatus);
  const userId = useSelector(selectUserId);
  const username = useSelector(selectUsername);

  const addPostVote = (vote, postId) => {
    const payload = { vote, postId };
    dispatch(userActions.addPostVote(payload));
  };

  const deletePostVote = (postId) => {
    const payload = { postId };
    dispatch(userActions.deletePostVote(payload));
  };

  return {
    isLoggedIn,
    userId,
    username,
    addPostVote,
    deletePostVote,
  };
};
