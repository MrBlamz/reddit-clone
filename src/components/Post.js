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
import React, { useMemo } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { MdOutlineEdit } from 'react-icons/md';
import { VscComment } from 'react-icons/vsc';
import { getElapsedTimeAsString } from '../utils/date';
import ActionButton from './buttons/ActionButton';
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

const ButtonsContainer = ({ children }) => {
  return (
    <Flex w='full'>
      <Wrap spacing={0} w={{ base: 'full', md: 'fit-content' }}>
        {React.Children.map(children, (child) => (
          <WrapItem>{child}</WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};

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

  const buttons = useMemo(() => {
    const ACTION_BUTTONS = [
      {
        ariaLabel: 'Open Comments',
        icon: <VscComment />,
        text: `${commentsNumber} ${
          commentsNumber === 1 ? 'Comment' : 'Comments'
        }`,
        props: {
          pointerEvents: 'none',
        },
      },
      {
        ariaLabel: 'Share post',
        icon: <BiShare style={{ transform: 'rotateY(180deg)' }} />,
        text: 'Share',
      },
      {
        ariaLabel: 'Save post',
        icon: <BsBookmark />,
        text: 'Save',
      },
    ];

    return ACTION_BUTTONS.map((btn) => (
      <ActionButton
        key={btn.ariaLabel}
        ariaLabel={btn.ariaLabel}
        icon={btn.icon}
        text={btn.text}
        p={2}
        {...btn.props}
      />
    ));
  }, [commentsNumber]);

  const MobileLayout = () => (
    <Container>
      <Header title={title} author={author} timestamp={timestamp} />
      <Content>{content}</Content>
      <ButtonsContainer>
        <VoteButtons votes={votes} postId={postId} />
        {buttons}
      </ButtonsContainer>
    </Container>
  );

  const DesktopLayout = () => (
    <Container position='relative'>
      <VoteButtons votes={votes} postId={postId} />
      <Header title={title} author={author} timestamp={timestamp} />
      <Content>{content}</Content>
      <ButtonsContainer>{buttons}</ButtonsContainer>
    </Container>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

export default Post;
