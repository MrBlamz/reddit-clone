import { Container as ChakraContainer } from '@chakra-ui/react';

const Container = ({ children }) => {
  return (
    <ChakraContainer maxW='full' p={{ base: 3, md: 6 }}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
