import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ADD_VOTE,
  DELETE_VOTE,
  SWAP_VOTE,
  ADDED_VOTE_MESSAGE,
  DELETED_VOTE_MESSAGE,
  SWAPPED_VOTE_MESSAGE,
  LOGIN_MESSAGE,
  ERROR_MESSAGE,
  COLLECTIONS,
} from '../../constants';
import { useNotification } from '../../hooks/useNotification';
import { useUser } from '../../hooks/useUser';
import { selectPostVote } from '../../store/auth';
import { handleVote as handleVoteOnServer } from '../../utils/firebase/firestore';
import VotingButtons from './VotingButtons';

export const PostVotingButtons = ({
  postId,
  votesNumber,
  onClick,
  ...props
}) => {
  const userVote = useSelector(selectPostVote(postId));
  const [votes, setVotes] = useState(votesNumber);
  const { isLoggedIn, userId, addPostVote, deletePostVote } = useUser();
  const { sendNotification } = useNotification();

  const handleVotingLogic = async (option, vote) => {
    let updatedVotesNumber;
    let message;
    const OPTIONS = {
      [ADD_VOTE]: async () => {
        updatedVotesNumber = await handleVoteOnServer(
          COLLECTIONS.POST,
          ADD_VOTE,
          vote,
          userId,
          postId
        );
        addPostVote(vote, postId);
        message = ADDED_VOTE_MESSAGE;
      },

      [DELETE_VOTE]: async () => {
        updatedVotesNumber = await handleVoteOnServer(
          COLLECTIONS.POST,
          DELETE_VOTE,
          vote,
          userId,
          postId
        );
        deletePostVote(postId);
        message = DELETED_VOTE_MESSAGE;
      },

      [SWAP_VOTE]: async () => {
        updatedVotesNumber = await handleVoteOnServer(
          COLLECTIONS.POST,
          SWAP_VOTE,
          vote,
          userId,
          postId
        );
        addPostVote(vote, postId);
        message = SWAPPED_VOTE_MESSAGE;
      },
    };

    const handleVote = OPTIONS[option];

    await handleVote();
    setVotes(updatedVotesNumber);
    sendNotification('success', message);
    if (onClick) onClick(updatedVotesNumber);
  };

  const handleClick = (vote) => async (event) => {
    event.stopPropagation();

    // Prevent logged out users from voting
    if (!isLoggedIn) {
      sendNotification('warning', LOGIN_MESSAGE);
      return;
    }

    try {
      // runs if previous vote is equal to the new vote
      if (userVote === vote) {
        handleVotingLogic(DELETE_VOTE, vote);
        return;
      }

      // runs if user has a previous valid vote (boolean) and old vote is
      // different than new vote
      if (typeof userVote === 'boolean' && userVote !== vote) {
        handleVotingLogic(SWAP_VOTE, vote);
        return;
      }

      handleVotingLogic(ADD_VOTE, vote);
    } catch (error) {
      console.log(error);
      sendNotification('error', ERROR_MESSAGE);
    }
  };

  return (
    <VotingButtons
      userVote={userVote}
      votesNumber={votes}
      onUpVoteClick={handleClick(true)}
      onDownVoteClick={handleClick(false)}
      {...props}
    />
  );
};
