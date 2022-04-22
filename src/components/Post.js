import {
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { getElapsedTimeAsString } from '../utils/date';
import {
  CommentsButton,
  SaveButton,
  ShareButton,
} from './buttons/ActionButton';
import { PostVotingButtons } from './buttons/PostVotingButtons';

const Container = ({ children, ...rest }) => (
  <Flex
    borderRadius={5}
    px={{ base: 3, md: 12 }}
    py={{ base: 4, md: 2 }}
    bg={useColorModeValue('brand.light', 'brand.dark')}
    {...rest}
  >
    <VStack spacing={2} w='full' alignItems='flex-start'>
      {children}
    </VStack>
  </Flex>
);

const Header = ({ title, author, timestamp }) => (
  <VStack spacing={2} alignItems='flex-start'>
    <HStack
      spacing={2}
      color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
    >
      <Text fontSize={12}>Posted by u/{author}</Text>
      <Text fontSize={12}>{getElapsedTimeAsString(timestamp)}</Text>
    </HStack>

    <Heading fontSize={20}>{title}</Heading>
  </VStack>
);

const Content = ({ children }) => (
  <Text whiteSpace='pre-line' lineHeight={1.4}>
    {children}
  </Text>
);

const Buttons = ({ commentsNumber, children }) => (
  <Flex w='full'>
    <Wrap
      spacing={2}
      w={{ base: 'full', md: 'fit-content' }}
      justify='space-around'
    >
      {React.Children.map(children, (child) => (
        <WrapItem>{child}</WrapItem>
      ))}
      <WrapItem>
        <CommentsButton
          commentsNumber={commentsNumber}
          p={{ base: 0, md: 2 }}
          pointerEvents='none'
        />
      </WrapItem>
      <WrapItem>
        <ShareButton p={{ base: 0, md: 2 }} />
      </WrapItem>
      <WrapItem>
        <SaveButton p={{ base: 0, md: 2 }} />
      </WrapItem>
    </Wrap>
  </Flex>
);

const VoteButtons = ({ votes, postId }) => (
  <PostVotingButtons
    fontSize='14px'
    votesNumber={votes}
    postId={postId}
    h='full'
    justifyContent='flex-start'
    direction={{ base: 'row', md: 'column' }}
    position={{ base: 'static', md: 'absolute' }}
    top={2}
    left={2}
  />
);

const Post = ({
  title,
  content,
  author,
  votes,
  commentsNumber,
  timestamp,
  postId,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 48rem)');

  return isMobile ? (
    <Container>
      <Header title={title} author={author} timestamp={timestamp} />
      <Content>{content}</Content>
      <Buttons commentsNumber={commentsNumber}>
        <VoteButtons votes={votes} postId={postId} />
      </Buttons>
    </Container>
  ) : (
    <Container position='relative'>
      <VoteButtons votes={votes} postId={postId} />
      <Header title={title} author={author} timestamp={timestamp} />
      <Content>{content}</Content>
      <Buttons commentsNumber={commentsNumber} />
    </Container>
  );
};

export default Post;
