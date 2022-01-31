import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';

const InputField = ({ isRequired, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched} isRequired={isRequired}>
      {label && (
        <FormLabel id={props.id} htmlFor={props.id}>
          {label}
        </FormLabel>
      )}
      <Input {...field} id={props.id} {...props} />
      <FormErrorMessage fontWeight='bold'>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
