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

  const addCommentVote = (vote, commentId) => {
    const payload = { vote, commentId };
    dispatch(userActions.addCommentVote(payload));
  };

  const deleteCommentVote = (commentId) => {
    const payload = { commentId };
    dispatch(userActions.deleteCommentVote(payload));
  };

  const followCommunity = (communityId) => {
    const payload = { communityId };
    dispatch(userActions.followCommunity(payload));
  };

  const unfollowCommunity = (communityId) => {
    const payload = { communityId };
    dispatch(userActions.unfollowCommunity(payload));
  };

  return {
    isLoggedIn,
    userId,
    username,
    addPostVote,
    deletePostVote,
    addCommentVote,
    deleteCommentVote,
    followCommunity,
    unfollowCommunity,
  };
};
