import { Button, Center, Flex, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NoPosts = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate('submit');

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
      <Flex direction='column' alignItems='center'>
        <VStack spacing={3}>
          <Heading fontSize={18}>There are no posts in this subreddit</Heading>
          <Heading fontSize={14}>
            Be the first to till this fertile land.
          </Heading>
        </VStack>
        <Button variant='primary' w={200} mt={4} onClick={handleClick}>
          Add a post
        </Button>
      </Flex>
    </Center>
  );
};

export default NoPosts;
