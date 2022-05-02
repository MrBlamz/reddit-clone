import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useUser } from '../hooks/useUser';
import { createPost } from '../utils/firebase/firestore';
import AutoResizeTextArea from './AutoResizeTextArea';
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

const ErrorMessage = () => (
  <FormControl isInvalid>
    <FormErrorMessage fontWeight='bold' fontSize={12}>
      Please fix the above requirements
    </FormErrorMessage>
  </FormControl>
);

const NewPostForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userId, username } = useUser();
  const { communityId } = useOutletContext();
  const { communityName } = useParams();

  const handleFormSubmit = async (values) => {
    const { title, content } = values;

    try {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {(props) => (
        <Form>
          <VStack spacing={3}>
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
                isDisabled={!isLoggedIn || hasErrors(props)}
              >
                Post
              </Button>

              {!isLoggedIn && <LoginMessage />}

              {isLoggedIn && hasErrors(props) && <ErrorMessage />}
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
