import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DizzyMascotIcon } from '../components/icons';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('/');

  return (
    <Center
      position='absolute'
      top={0}
      left={0}
      direction='column'
      w='100vw'
      h='100vh'
      zIndex={-1}
    >
      <VStack spacing={6} textAlign='center'>
        <DizzyMascotIcon boxSize={32} />
        <VStack spacing={3}>
          <Heading fontSize={18}>
            Sorry, the page you were searching for seems to have vanished.
          </Heading>
          <Text fontSize={14}>
            Maybe it's under development or the link is incorrect.
          </Text>
        </VStack>

        <Button variant='primary' onClick={handleClick}>
          Go Home
        </Button>
      </VStack>
    </Center>
  );
};
