import { VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import InputField from './forms/InputField';
import MultiStepForm, { FormStep } from './forms/MultiStepForm';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid Email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ handleSubmit }) => {
  return (
    <MultiStepForm
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <FormStep validationSchema={validationSchema}>
        <VStack spacing={3}>
          <InputField name='email' placeholder='Email' />
          <InputField name='password' type='password' placeholder='Password' />
        </VStack>
      </FormStep>
    </MultiStepForm>
  );
};

export default SignInForm;
