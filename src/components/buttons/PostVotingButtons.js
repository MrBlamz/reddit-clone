import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../../hooks/useNotification';
import { useUser } from '../../hooks/useUser';
import { selectVote } from '../../store/auth';
import {
  addPostVote as addPostVoteOnServer,
  deletePostVote as deletePostVoteOnServer,
  swapPostVote as swapPostVoteOnServer,
} from '../../utils/firebase/firestore';
import VotingButtons from './VotingButtons';

export const PostVotingButtons = ({ postId, votesNumber, ...props }) => {
  const userVote = useSelector(selectVote(postId));
  const [votes, setVotes] = useState(votesNumber);
  const { isLoggedIn, userId, addPostVote, deletePostVote } = useUser();
  const { sendNotification } = useNotification();

  const handleDeletingVote = async (vote) => {
    const updatedVotesNumber = await deletePostVoteOnServer(
      vote,
      userId,
      postId
    );
    deletePostVote(postId);
    setVotes(updatedVotesNumber);
    sendNotification('success', 'Your vote has been removed successfully.');
  };

  const handleAddingVote = async (vote) => {
    const updatedVotesNumber = await addPostVoteOnServer(vote, userId, postId);
    addPostVote(vote, postId);
    setVotes(updatedVotesNumber);
    sendNotification('success', 'Your vote was added successfully.');
  };

  const handleSwappingVote = async (vote) => {
    const updatedVotesNumber = await swapPostVoteOnServer(vote, userId, postId);
    addPostVote(vote, postId);
    setVotes(updatedVotesNumber);
    sendNotification('success', 'Your vote has been swapped successfully.');
  };

  const handleClick = (vote) => async (event) => {
    event.stopPropagation();

    // Prevent logged out users from voting
    if (!isLoggedIn) {
      sendNotification('warning', 'You must login to vote on posts.');
      return;
    }

    try {
      // runs if previous vote is equal to the new vote
      if (userVote === vote) {
        handleDeletingVote(vote);
        return;
      }

      // runs if user has a previous valid vote (boolean) and old vote is
      // different than new vote
      if (typeof userVote === 'boolean' && userVote !== vote) {
        handleSwappingVote(vote);
        return;
      }

      handleAddingVote(vote);
    } catch (error) {
      console.log(error);
      sendNotification(
        'error',
        'There was an error adding your vote. Please try again.'
      );
    }
  };

  return (
    <VotingButtons
      postId={postId}
      userVote={userVote}
      votesNumber={votes}
      onUpVoteClick={handleClick(true)}
      onDownVoteClick={handleClick(false)}
      {...props}
    />
  );
};
