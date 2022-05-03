import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  checkIfCommunityExists,
  createCommunity,
} from '../utils/firebase/firestore';
import AutoResizeTextArea from './AutoResizeTextArea';
import InputWithPermanentPlaceholder from './forms/InputWithPermanentPlaceholder';
import TouchFriendlyTooltip from './TouchFriendlyTooltip';

const COMMUNITY_NAME_MAX_CHARACTERS = 21;
const ERROR_MESSAGE =
  'Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores.';
const DESCRIPTION_ERROR_MESSAGE =
  'Community description must be between 5-100 characters, and can only contain letters, numbers and spaces';

const initialValues = { name: '', description: '' };

const validationSchema = yup.object({
  name: yup
    .string()
    .required('A community name is required')
    .min(3, ERROR_MESSAGE)
    .max(COMMUNITY_NAME_MAX_CHARACTERS, ERROR_MESSAGE)
    .matches(/^[_a-zA-Z0-9]+$/, ERROR_MESSAGE),
  description: yup
    .string()
    .required('A community description is required')
    .min(5, DESCRIPTION_ERROR_MESSAGE)
    .max(100, DESCRIPTION_ERROR_MESSAGE)
    .matches(/^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/, DESCRIPTION_ERROR_MESSAGE),
});

const NewCommunityForm = ({ innerRef, onClose }) => {
  const navigate = useNavigate();
  const infoColor = useColorModeValue('brand.iconLight', 'brand.iconDark');
  const color = useColorModeValue('brand.iconLight', 'brand.iconDark');
  const errorBorderColor = useColorModeValue('crimson', 'red.300');
  const [charactersLeft, setCharactersLeft] = useState(
    COMMUNITY_NAME_MAX_CHARACTERS
  );

  const handleInputChange = (field, form) => (event) => {
    form.setErrors({});

    const nameLength = event.target.value.length;
    setCharactersLeft(COMMUNITY_NAME_MAX_CHARACTERS - nameLength);

    field.onChange(event);
  };

  const handleFormSubmit = async (values, actions) => {
    const { name, description } = values;

    try {
      const communityData = await checkIfCommunityExists(name);

      if (communityData) {
        actions.setFieldError(
          'name',
          `Sorry, r/${name} is taken. Try another.`
        );

        return;
      }

      await createCommunity(name, description);

      navigate(`/r/${name}`);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      validateOnChange={false}
    >
      {(props) => (
        <Form>
          <VStack>
            <VStack w='full' alignItems='flex-start' spacing={1}>
              <Heading fontSize={16}>Name</Heading>
              <HStack fontSize={12} color={color}>
                <Text>
                  Community names including capitalization cannot be changed.
                </Text>
                <TouchFriendlyTooltip
                  label={
                    'Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme").'
                  }
                  fontSize={12}
                  fontWeight='bold'
                  bg='#000'
                  color='#fff'
                  w={200}
                  textAlign='center'
                >
                  <IoInformationCircleOutline size={16} />
                </TouchFriendlyTooltip>
              </HStack>
            </VStack>

            <Field name='name'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor='name' hidden>
                    Community Name
                  </FormLabel>
                  <InputWithPermanentPlaceholder
                    maxLength={21}
                    placeholder='r/'
                    innerRef={innerRef}
                    id='name'
                    {...field}
                    onChange={handleInputChange(field, form)}
                    border='2px solid'
                    borderColor={form.errors.name && errorBorderColor}
                  />

                  <VStack spacing={1} w='full' position='relative'>
                    <Text
                      w='inherit'
                      mt={2}
                      color={charactersLeft === 0 ? 'red' : infoColor}
                      fontSize={12}
                    >{`${charactersLeft} Characters remaining`}</Text>
                    <FormErrorMessage
                      w='inherit'
                      fontWeight='bold'
                      fontSize={12}
                    >
                      {form.errors.name}
                    </FormErrorMessage>
                  </VStack>
                </FormControl>
              )}
            </Field>

            <VStack w='full' alignItems='flex-start' spacing={1}>
              <Heading fontSize={16}>Description</Heading>
              <HStack fontSize={12} color={color}>
                <Text>Summary about this community.</Text>
              </HStack>
            </VStack>

            <Field name='description'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel htmlFor='communityDescription' hidden>
                    Community Description
                  </FormLabel>

                  <AutoResizeTextArea
                    minH={32}
                    whiteSpace='pre-wrap'
                    maxLength={100}
                    id='communityDescription'
                    {...field}
                    borderColor={form.errors.description && errorBorderColor}
                  />

                  <FormErrorMessage w='inherit' fontWeight='bold' fontSize={12}>
                    {form.errors.description}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <HStack w='full' justifyContent='flex-end' spacing={3}>
              <Button variant='secondary' fontSize={14} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant='primary'
                isLoading={props.isSubmitting}
                type='submit'
                fontSize={14}
              >
                Create Community
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewCommunityForm;
