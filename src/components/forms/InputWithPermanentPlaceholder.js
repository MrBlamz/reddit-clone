import { Box, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const InputWithPermanentPlaceholder = ({
  placeholder = '',
  innerRef,
  ...props
}) => {
  const [placeholderWidth, setPlaceholderWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    setPlaceholderWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Box w='full' position='relative'>
      <Text
        ref={ref}
        as='span'
        position='absolute'
        top={2}
        left={2}
        color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
      >
        {placeholder}
      </Text>
      <Input
        pl={`${placeholderWidth + 8}px`}
        variant='primary'
        ref={innerRef}
        {...props}
      />
    </Box>
  );
};

export default InputWithPermanentPlaceholder;
