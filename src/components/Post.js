import {
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import { BiShare } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { VscComment } from 'react-icons/vsc';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { getElapsedTimeAsString } from '../utils/date';
import ActionButton from './buttons/ActionButton';
import { PostVotingButtons } from './buttons/PostVotingButtons';
import { Editor } from './Editor';
import {
  deletePost as deletePostOnServer,
  updatePostContent,
} from '../utils/firebase/firestore';
import { useNotification } from '../hooks/useNotification';
import { AlertDialog } from './AlertDialog';
import { useNavigate, useParams } from 'react-router-dom';

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

const VoteButtons = ({ votes, postId, onClick }) => (
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
    onClick={onClick}
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
  isAuthor,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 48rem)');
  const [state, setState] = useState({
    votes,
    content,
    isEditing: false,
  });
  const { communityName } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const closeModalRef = useRef();

  const handleCancelEditingClick = () =>
    setState((prevState) => ({ ...prevState, isEditing: false }));

  const handleSaveEditingClick = async (newContent) => {
    try {
      await updatePostContent(newContent, postId);
      setState((prevState) => ({
        ...prevState,
        content: newContent,
        isEditing: false,
      }));
      sendNotification('success', 'Post updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoteUpdate = (votes) =>
    setState((prevState) => ({ ...prevState, votes }));

  const handleDelete = async () => {
    try {
      await deletePostOnServer(postId);
      sendNotification('success', 'Post deleted successfully');
      navigate(`/r/${communityName}`);
    } catch (error) {
      sendNotification('error', error);
    }
  };

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
      {
        ariaLabel: 'Edit post',
        icon: <MdOutlineEdit />,
        text: 'Edit',
        onClick: () =>
          setState((prevState) => ({ ...prevState, isEditing: true })),
        props: {
          display: isAuthor ? 'inherit' : 'none',
        },
      },
      {
        ariaLabel: 'Delete post',
        icon: <MdDeleteOutline />,
        text: 'Delete',
        onClick: onOpen,
        props: {
          display: isAuthor ? 'inherit' : 'none',
        },
      },
    ];

    return ACTION_BUTTONS.map((btn) => (
      <ActionButton
        p={2}
        key={btn.ariaLabel}
        ariaLabel={btn.ariaLabel}
        icon={btn.icon}
        text={btn.text}
        onClick={btn.onClick}
        {...btn.props}
      />
    ));
  }, [commentsNumber, isAuthor, onOpen]);

  const MobileLayout = () => (
    <Container>
      <Header title={title} author={author} timestamp={timestamp} />
      {state.isEditing ? (
        <Editor
          content={state.content}
          onCancel={handleCancelEditingClick}
          onSave={handleSaveEditingClick}
        />
      ) : (
        <Content>{state.content}</Content>
      )}
      <ButtonsContainer>
        <VoteButtons
          votes={state.votes}
          postId={postId}
          onClick={handleVoteUpdate}
        />
        {buttons}
      </ButtonsContainer>
    </Container>
  );

  const DesktopLayout = () => (
    <Container position='relative'>
      <VoteButtons
        votes={state.votes}
        postId={postId}
        onClick={handleVoteUpdate}
      />
      <Header title={title} author={author} timestamp={timestamp} />
      {state.isEditing ? (
        <Editor
          content={state.content}
          onCancel={handleCancelEditingClick}
          onSave={handleSaveEditingClick}
        />
      ) : (
        <Content>{state.content}</Content>
      )}
      <ButtonsContainer>{buttons}</ButtonsContainer>
    </Container>
  );

  return (
    <>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        closeRef={closeModalRef}
        title='Delete Post'
        content="Are you sure you want to delete your post? You can't undo this."
        cancelButtonText='Cancel'
        ActionButtonText='Delete Post'
        onActionButtonClick={handleDelete}
      />
    </>
  );
};

export default Post;
