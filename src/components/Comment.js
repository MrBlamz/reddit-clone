import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import placeholderAvatar from '../assets/avatar/avatar.png';
import { getElapsedTimeAsString } from '../utils/date';
import VotingButtons from './buttons/VotingButtons';

const Comment = ({ author, content, votes, timestamp, isPostAuthor }) => {
  const textColor = useColorModeValue('brand.secondary', 'brand.primary');

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
        votes={votes}
        direction='column'
        position='absolute'
        top={2}
        left={2}
      />
      <VStack minH={90} alignItems='flex-start' spacing={3}>
        <HStack fontSize='xs'>
          <Avatar size='sm' src={placeholderAvatar} />
          <Flex fontWeight='bold'>
            <Text>{author}</Text>
            {isPostAuthor && (
              <Text color={textColor} ml={1}>
                OP
              </Text>
            )}
          </Flex>
          <Text color={useColorModeValue('brand.iconLight', 'brand.iconDark')}>
            {getElapsedTimeAsString(timestamp)}
          </Text>
        </HStack>
        <Text whiteSpace='pre-line' lineHeight={1.4} fontSize='1rem'>
          {content}
        </Text>
      </VStack>
    </Box>
  );
};

export default Comment;
