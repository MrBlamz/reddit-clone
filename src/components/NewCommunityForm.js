import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  checkIfCommunityExists,
  createCommunity,
} from '../utils/firebase/firestore';
import InputWithPermanentPlaceholder from './forms/InputWithPermanentPlaceholder';

const COMMUNITY_NAME_MAX_CHARACTERS = 21;
const ERROR_MESSAGE =
  'Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores.';

const validationSchema = yup.object({
  communityName: yup
    .string()
    .required('A community name is required')
    .min(3, ERROR_MESSAGE)
    .max(COMMUNITY_NAME_MAX_CHARACTERS, ERROR_MESSAGE)
    .matches(/^[_a-zA-Z0-9]+$/, ERROR_MESSAGE),
});

const NewCommunityForm = ({ innerRef, onClose }) => {
  const navigate = useNavigate();
  const infoColor = useColorModeValue('brand.iconLight', 'brand.iconDark');
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
    const { communityName } = values;

    try {
      const communityData = await checkIfCommunityExists(communityName);

      if (communityData) {
        actions.setFieldError(
          'communityName',
          `Sorry, r/${communityName} is taken. Try another.`
        );

        return;
      }

      await createCommunity(communityName);

      navigate(`/r/${communityName}`);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ communityName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      validateOnChange={false}
    >
      {(props) => (
        <Form>
          <Box minH={{ base: 150, md: 140 }} position='relative'>
            <Field name='communityName'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.communityName && form.touched.communityName
                  }
                >
                  <FormLabel htmlFor='communityName' hidden>
                    Community Name
                  </FormLabel>
                  <InputWithPermanentPlaceholder
                    maxLength={21}
                    placeholder='r/'
                    innerRef={innerRef}
                    id='communityName'
                    {...field}
                    onChange={handleInputChange(field, form)}
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
                      {form.errors.communityName}
                    </FormErrorMessage>
                  </VStack>
                </FormControl>
              )}
            </Field>

            <HStack
              position='absolute'
              bottom={0}
              right={0}
              justifyContent='center'
              spacing={3}
            >
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NewCommunityForm;
