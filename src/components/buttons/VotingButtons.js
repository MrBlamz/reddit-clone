import { Stack, Text } from '@chakra-ui/react';
import DownVoteButton from './DownVoteButton';
import UpVoteButton from './UpVoteButton';

const VotingButtons = ({ votes, ...rest }) => (
  <Stack alignItems='center' justifyContent='center' lineHeight={0} {...rest}>
    <UpVoteButton />
    <Text fontWeight='bold'>{votes}</Text>
    <DownVoteButton />
  </Stack>
);

export default VotingButtons;
