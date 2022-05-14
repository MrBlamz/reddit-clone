import { useMemo, useState } from 'react';
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
import ActionButton from './buttons/ActionButton';
import { CommentVotingButtons } from './buttons/CommentVotingButtons';
import { Editor } from './Editor';
import { updateCommentContent } from '../utils/firebase/firestore';
import { useNotification } from '../hooks/useNotification';

const Comment = ({
  author,
  content,
  votes,
  timestamp,
  isPostAuthor,
  isAuthor,
  commentId,
}) => {
  const textColor = useColorModeValue('brand.secondary', 'brand.primary');
  const { sendNotification } = useNotification();
  const [state, setState] = useState({
    content,
    isEditing: false,
  });

  const handleCancelEditingClick = () =>
    setState((prevState) => ({ ...prevState, isEditing: false }));

  const handleSaveEditingClick = async (newContent) => {
    try {
      await updateCommentContent(newContent, commentId);
      setState((prevState) => ({
        ...prevState,
        content: newContent,
        isEditing: false,
      }));
      sendNotification('success', 'Comment updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const buttons = useMemo(() => {
    const ACTION_BUTTONS = [
      {
        ariaLabel: 'Edit comment',
        text: 'Edit',
        onClick: () =>
          setState((prevState) => ({ ...prevState, isEditing: true })),
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
  }, [isAuthor]);

  return (
    <Box
      p={3}
      pl={12}
      border='1px'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius='5px'
      position='relative'
    >
      <CommentVotingButtons
        commentId={commentId}
        votesNumber={votes}
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
        {state.isEditing ? (
          <Editor
            content={state.content}
            onCancel={handleCancelEditingClick}
            onSave={handleSaveEditingClick}
          />
        ) : (
          <Text whiteSpace='pre-line' lineHeight={1.4}>
            {state.content}
          </Text>
        )}
      </VStack>
      <Flex ml={-2} display={state.isEditing && 'none'}>
        {buttons}
      </Flex>
    </Box>
  );
};

export default Comment;
