import { Button, Text } from '@chakra-ui/react';

export const ActionButton = ({ ariaLabel, icon, text, ...rest }) => (
  <Button
    variant='action'
    aria-label={ariaLabel}
    leftIcon={icon}
    fontSize='xl'
    {...rest}
  >
    <Text fontSize='xs'>{text}</Text>
  </Button>
);

export default ActionButton;
