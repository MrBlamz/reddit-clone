import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../../hooks/useNotification';
import { useUser } from '../../hooks/useUser';
import { selectCommentVote } from '../../store/auth';
import {
  ADD_VOTE,
  DELETE_VOTE,
  SWAP_VOTE,
  ADDED_VOTE_MESSAGE,
  DELETED_VOTE_MESSAGE,
  SWAPPED_VOTE_MESSAGE,
  LOGIN_MESSAGE,
  ERROR_MESSAGE,
} from '../../constants';
import VotingButtons from './VotingButtons';
import {
  addCommentVote as addCommentVoteOnServer,
  deleteCommentVote as deleteCommentVoteOnServer,
  swapCommentVote as swapCommentVoteOnServer,
} from '../../utils/firebase/firestore';

export const CommentVotingButtons = ({ commentId, votesNumber, ...props }) => {
  const userVote = useSelector(selectCommentVote(commentId));
  const [votes, setVotes] = useState(votesNumber);
  const { isLoggedIn, userId, addCommentVote, deleteCommentVote } = useUser();
  const { sendNotification } = useNotification();

  const handleVotingLogic = async (option, vote) => {
    let updatedVotesNumber;
    let message;
    const OPTIONS = {
      [ADD_VOTE]: async () => {
        updatedVotesNumber = await addCommentVoteOnServer(
          vote,
          userId,
          commentId
        );
        addCommentVote(vote, commentId);
        message = ADDED_VOTE_MESSAGE;
      },

      [DELETE_VOTE]: async () => {
        updatedVotesNumber = await deleteCommentVoteOnServer(
          vote,
          userId,
          commentId
        );
        deleteCommentVote(commentId);
        message = DELETED_VOTE_MESSAGE;
      },

      [SWAP_VOTE]: async () => {
        updatedVotesNumber = await swapCommentVoteOnServer(
          vote,
          userId,
          commentId
        );
        addCommentVote(vote, commentId);
        message = SWAPPED_VOTE_MESSAGE;
      },
    };

    const handleVote = OPTIONS[option];

    await handleVote();
    setVotes(updatedVotesNumber);
    sendNotification('success', message);
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
