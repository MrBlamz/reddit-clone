import {
  Box,
  Button,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthStatus, selectUsername } from '../store/auth';

const CreateComment = () => {
  const [inputValue, setInputValue] = useState('');
  const isLoggedIn = useSelector(selectAuthStatus);
  const username = useSelector(selectUsername);
  const usernameColor = useColorModeValue('brand.secondary', 'brand.primary');

  const handleInputChange = (event) => setInputValue(event.target.value);

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
        <Textarea
          h={24}
          variant='noBorder'
          resize='none'
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
          >
            Comment
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CreateComment;
