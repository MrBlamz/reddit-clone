import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useUser } from '../hooks/useUser';
import { createPost } from '../utils/firebase/firestore';
import AutoResizeTextArea from './AutoResizeTextArea';
import { CommunitySelector } from './CommunitySelector';
import Field from './forms/Field';

const validationSchema = yup.object({
  title: yup.string().required('This community requires a title.'),
  content: yup.string().required('This community requires body text.'),
});

const initialValues = {
  title: '',
  content: '',
};

const isInvalid = (name, form) => form.touched[name] && form.errors[name];

const hasErrors = (form) => {
  for (const value in initialValues) {
    if (isInvalid(value, form)) {
      return true;
    }
  }

  return false;
};

const LoginMessage = () => (
  <FormControl isInvalid>
    <FormErrorMessage fontWeight='bold' fontSize={12}>
      Login to create a post
    </FormErrorMessage>
  </FormControl>
);

const ErrorMessage = ({ message }) => (
  <FormControl isInvalid>
    <FormErrorMessage fontWeight='bold' fontSize={12}>
      {message}
    </FormErrorMessage>
  </FormControl>
);

const NewPostForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userId, username } = useUser();
  const [community, setCommunity] = useState(null);

  const handleFormSubmit = async (values) => {
    const { title, content } = values;

    if (!community) {
      return;
    }

    try {
      const { name: communityName, id: communityId } = community;
      const postId = await createPost(
        title,
        userId,
        username,
        content,
        communityId,
        communityName
      );

      navigate(`/r/${communityName}/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommunitySelect = (selectedCommunity) => {
    setCommunity(selectedCommunity);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {(props) => (
        <Form>
          <VStack spacing={3} alignItems='flex-start'>
            <Box w={{ base: 'full', lg: 300 }}>
              <CommunitySelector onSelect={handleCommunitySelect} />
            </Box>

            <Field name='title' label='Post Title' hidden>
              <Input placeholder='Title' disabled={!isLoggedIn} />
            </Field>

            <Field name='content' label='Post Content' hidden>
              <AutoResizeTextArea
                minH={32}
                whiteSpace='pre-wrap'
                placeholder='Text (Required)'
                disabled={!isLoggedIn}
              />
            </Field>

            <Flex
              alignSelf='flex-end'
              alignItems='flex-end'
              direction='column'
              w='fit-content'
              ml='auto'
            >
              <Button
                variant='primary'
                type='submit'
                w='100px'
                fontSize={14}
                isLoading={props.isSubmitting}
                isDisabled={!isLoggedIn || hasErrors(props) || !community}
              >
                Post
              </Button>

              {!isLoggedIn && <LoginMessage />}

              {isLoggedIn && hasErrors(props) && (
                <ErrorMessage message='Please fix the above requirements' />
              )}
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
