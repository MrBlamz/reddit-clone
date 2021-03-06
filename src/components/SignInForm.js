import { Input, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import Field from './forms/Field';

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
        <VStack>
          <Field name='email' label='Email' hidden>
            <Input placeholder='Email' />
          </Field>
          <Field name='password' label='Password' hidden>
            <Input type='password' placeholder='Password' />
          </Field>
        </VStack>
      </FormStep>
    </MultiStepForm>
  );
};

export default SignInForm;
