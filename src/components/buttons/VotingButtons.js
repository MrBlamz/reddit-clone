import { Stack, Text } from '@chakra-ui/react';
import DownVoteButton from './DownVoteButton';
import UpVoteButton from './UpVoteButton';

const VotingButtons = ({ upVotes, downVotes, ...rest }) => (
  <Stack alignItems='center' justifyContent='center' lineHeight={0} {...rest}>
    <UpVoteButton />
    <Text fontWeight='bold'>{upVotes - downVotes}</Text>
    <DownVoteButton />
  </Stack>
);

export default VotingButtons;
