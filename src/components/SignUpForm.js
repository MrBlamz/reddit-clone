import { Input } from '@chakra-ui/react';
import * as yup from 'yup';
import { checkIfEmailIsNotRegistered } from '../utils/firebase/auth';
import { checkIfUsernameIsAvailable } from '../utils/firebase/firestore';
import Field from './forms/Field';

import MultiStepForm, { FormStep } from './forms/MultiStepForm';

const validationSchema = {
  step1: yup.object({
    email: yup
      .string()
      .email('Must be a valid Email')
      .required('Email is required')
      .test({
        name: 'Email is already registered check',
        message: 'This email is already associated with an existing account',
        test: async (value) => {
          try {
            const isAvailable = await checkIfEmailIsNotRegistered(value);
            return isAvailable;
          } catch (error) {}
        },
      }),
  }),
  step2: yup.object({
    username: yup
      .string()
      .required('Username is required')
      .min(4, 'Username must have a minimum of 4 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and digits')
      .test({
        name: 'Username already exists check',
        message: 'This username already exists',
        test: async (value) => {
          try {
            const isAvailable = await checkIfUsernameIsAvailable(value);
            return isAvailable;
          } catch (error) {}
        },
      }),

    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have a minimum of 6 characters'),
  }),
};

const SignUpForm = ({ handleSubmit }) => {
  return (
    <MultiStepForm
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      <FormStep validationSchema={validationSchema.step1}>
        <Field name='email'>
          <Input placeholder='Email' />
        </Field>
      </FormStep>

      <FormStep validationSchema={validationSchema.step2}>
        <Field name='username'>
          <Input placeholder='Username' />
        </Field>
        <Field name='password'>
          <Input type='password' placeholder='Password' />
        </Field>
      </FormStep>
    </MultiStepForm>
  );
};

export default SignUpForm;
