import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import placeholderAvatar from '../assets/avatar/avatar.png';
import { getElapsedTimeAsString } from '../utils/date';
import VotingButtons from './buttons/VotingButtons';

const Comment = ({ author, content, upVotes, downVotes, timestamp }) => {
  const textColor = useColorModeValue('brand.iconLight', 'brand.iconDark');

  return (
    <Box
      p={3}
      pl={12}
      border='1px'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius='5px'
      position='relative'
    >
      <VotingButtons
        downVotes={downVotes}
        upVotes={upVotes}
        direction='column'
        position='absolute'
        top={2}
        left={2}
      />
      <VStack minH={90} alignItems='flex-start' spacing={3}>
        <HStack fontSize='xs'>
          <Avatar size='sm' src={placeholderAvatar} />
          <Text fontWeight='bold'>{author}</Text>
          <Text color={textColor}>{getElapsedTimeAsString(timestamp)}</Text>
        </HStack>
        <Text lineHeight={1.4} fontSize='1rem'>
          {content}
        </Text>
      </VStack>
    </Box>
  );
};

export default Comment;
