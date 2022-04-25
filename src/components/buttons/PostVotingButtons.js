import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../../hooks/useNotification';
import { useUser } from '../../hooks/useUser';
import { selectPostVote } from '../../store/auth';
import {
  addPostVote as addPostVoteOnServer,
  deletePostVote as deletePostVoteOnServer,
  swapPostVote as swapPostVoteOnServer,
} from '../../utils/firebase/firestore';
import VotingButtons from './VotingButtons';

const ADD_VOTE = 'addVote';
const DELETE_VOTE = 'deleteVote';
const SWAP_VOTE = 'swapVote';
const ADDED_VOTE_MESSAGE = 'Your vote has been added successfully.';
const DELETED_VOTE_MESSAGE = 'Your vote has been removed successfully.';
const SWAPPED_VOTE_MESSAGE = 'Your vote has been swapped successfully.';
const LOGIN_MESSAGE = 'You must login to vote on posts.';
const ERROR_MESSAGE = 'There was an error adding your vote. Please try again.';

export const PostVotingButtons = ({ postId, votesNumber, ...props }) => {
  const userVote = useSelector(selectPostVote(postId));
  const [votes, setVotes] = useState(votesNumber);
  const { isLoggedIn, userId, addPostVote, deletePostVote } = useUser();
  const { sendNotification } = useNotification();

  const handleVotingLogic = async (option, vote) => {
    let updatedVotesNumber;
    let message;
    const OPTIONS = {
      [ADD_VOTE]: async () => {
        updatedVotesNumber = await addPostVoteOnServer(vote, userId, postId);
        addPostVote(vote, postId);
        message = ADDED_VOTE_MESSAGE;
      },

      [DELETE_VOTE]: async () => {
        updatedVotesNumber = await deletePostVoteOnServer(vote, userId, postId);
        deletePostVote(postId);
        message = DELETED_VOTE_MESSAGE;
      },

      [SWAP_VOTE]: async () => {
        updatedVotesNumber = await swapPostVoteOnServer(vote, userId, postId);
        addPostVote(vote, postId);
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
