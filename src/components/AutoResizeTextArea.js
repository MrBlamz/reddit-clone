import React from 'react';
import { Textarea } from '@chakra-ui/react';
import ResizeTextArea from 'react-textarea-autosize';

const AutoResizeTextArea = React.forwardRef((props, ref) => (
  <Textarea
    minH='unset'
    overflow='hidden'
    w='100%'
    resize='none'
    ref={ref}
    minRows={1}
    transition='height none'
    as={ResizeTextArea}
    {...props}
  />
));

export default AutoResizeTextArea;
