import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import useUser from '../hooks/useUser';
import { createComment } from '../utils/firebase/firestore';
import AutoResizeTextArea from './AutoResizeTextArea';

const CreateComment = ({ postId, onSubmit }) => {
  const { isLoggedIn, userId, username } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usernameColor = useColorModeValue('brand.secondary', 'brand.primary');

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const newComment = await createComment(
        inputValue,
        username,
        userId,
        postId
      );
      if (onSubmit) onSubmit(newComment);
    } catch (error) {
      console.log(error);
    }

    setInputValue('');
    setIsSubmitting(false);
  };

  return (
    <Box>
      {isLoggedIn && (
        <HStack spacing={1} fontSize={14}>
          <Text>Comment as</Text>
          <Text as='span' color={usernameColor}>
            {username}
          </Text>
        </HStack>
      )}
      <VStack
        p={1}
        borderRadius={5}
        borderWidth={1}
        borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
        _focusWithin={{
          borderColor: useColorModeValue('brand.secondary', 'brand.light'),
        }}
        cursor={!isLoggedIn && 'not-allowed'}
        opacity={!isLoggedIn && 0.7}
      >
        <AutoResizeTextArea
          minH={24}
          whiteSpace='pre-wrap'
          variant='noBorder'
          disabled={!isLoggedIn}
          cursor={!isLoggedIn && 'not-allowed'}
          placeholder={
            isLoggedIn ? 'What are your thoughts?' : 'Login to make a comment!'
          }
          bg='inherit'
          _disabled={{
            _placeholder: {
              color: 'grey.100',
            },
          }}
          value={inputValue}
          onChange={handleInputChange}
        />

        <Box
          bg={useColorModeValue('brand.light', 'brand.dark')}
          w='full'
          textAlign='end'
        >
          <Button
            disabled={!isLoggedIn || inputValue === ''}
            variant='primary'
            w='100px'
            h='35px'
            fontSize='14px'
            alignSelf='flex-end'
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CreateComment;
