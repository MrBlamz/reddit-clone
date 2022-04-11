import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DizzyMascotIcon } from '../components/icons';
import useModal from '../hooks/useModal';

const Community404 = () => {
  const { onOpen } = useModal('CreateCommunityModal');
  const navigate = useNavigate();

  const handleHomeButtonClick = () => navigate('/');

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
      <VStack spacing={7} textAlign='center'>
        <DizzyMascotIcon boxSize={32} />
        <VStack spacing={3}>
          <Heading fontSize={18}>
            Sorry, there aren't any communities on Reddit with that name.
          </Heading>
          <Text fontSize={14}>
            This community may have been banned or the community name is
            incorrect.
          </Text>
        </VStack>
        <HStack spacing={3}>
          <Button variant='secondary' fontSize={14} onClick={onOpen}>
            Create Community
          </Button>
          <Button variant='primary' onClick={handleHomeButtonClick}>
            Go Home
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Community404;
