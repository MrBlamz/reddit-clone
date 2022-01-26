import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const AuthenticationForm = ({ signUp }) => {
  const handleLoginSubmit = (values, actions) => {
    setTimeout(() => {
      console.log('Logging in');
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const handleSignUpSubmit = (values, actions) => {
    setTimeout(() => {
      console.log('Signing up');
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const validateEmail = (value) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!value) {
      return 'Email is required';
    }

    if (!regex.test(value)) {
      return 'Email is not valid';
    }

    return null;
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }

    return null;
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={signUp ? handleSignUpSubmit : handleLoginSubmit}
    >
      {(props) => (
        <Form>
          <VStack spacing={3}>
            <Field name='email' validate={validateEmail}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  isRequired
                >
                  <Input
                    {...field}
                    id='email'
                    placeholder='Email'
                    aria-label='Email Input'
                    type='email'
                  />
                  <FormErrorMessage fontWeight='bold'>
                    {form.errors.email}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' validate={validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  isRequired
                >
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    placeholder='Password'
                    aria-label='Password Input'
                  />
                  <FormErrorMessage fontWeight='bold'>
                    {form.errors.password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              variant='primary'
              w='full'
              type='submit'
              isLoading={props.isSubmitting}
            >
              {signUp ? 'Sign Up' : 'Log In'}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default AuthenticationForm;