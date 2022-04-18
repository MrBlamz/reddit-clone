import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

const Field = ({ name, label, hidden, ...props }) => {
  const [field, meta] = useField(name);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...field, id: name });
    }
    return child;
  });

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={name} hidden={hidden}>
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
