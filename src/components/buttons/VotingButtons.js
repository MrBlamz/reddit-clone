import { Flex, Text } from '@chakra-ui/react';
import DownVoteButton from './DownVoteButton';
import UpVoteButton from './UpVoteButton';

const isUpVote = (vote) => vote === true;
const isDownVote = (vote) => vote === false;

const VotingButtons = ({
  votesNumber,
  userVote,
  onUpVoteClick,
  onDownVoteClick,
  ...props
}) => {
  return (
    <Flex alignItems='center' justifyContent='center' {...props}>
      <UpVoteButton isUpVote={isUpVote(userVote)} onClick={onUpVoteClick} />
      <Text fontWeight='bold'>{votesNumber}</Text>
      <DownVoteButton
        isDownVote={isDownVote(userVote)}
        onClick={onDownVoteClick}
      />
    </Flex>
  );
};

export default VotingButtons;
