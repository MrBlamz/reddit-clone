import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

const Field = ({ label, hidden, ...props }) => {
  const [field, meta] = useField(props);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...field });
    }
    return child;
  });

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={props.name} hidden={hidden}>
        {label}
      </FormLabel>

      {childrenWithProps}

      <FormErrorMessage fontWeight='bold' fontSize={12}>
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Field;
