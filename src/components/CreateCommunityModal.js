import { useRef } from 'react';
import {
  Box,
  Divider,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import useModal from '../hooks/useModal';
import NewCommunityForm from './NewCommunityForm';

const CreateCommunityModal = () => {
  const ref = useRef();
  const { isOpen, onClose } = useModal('CreateCommunityModal');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered initialFocusRef={ref}>
      <ModalOverlay backdropFilter='auto' backdropBlur='3px' />
      <ModalContent
        maxW={{ base: 'full', sm: '90%', md: 600 }}
        bg={useColorModeValue('brand.light', 'brand.dark')}
        p={4}
      >
        <ModalCloseButton
          color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
        />
        <VStack spacing={4}>
          <Box as='header' w='full'>
            <Heading fontSize={16}>Create a community</Heading>
          </Box>
          <Divider />
          <Box w='full'>
            <NewCommunityForm innerRef={ref} onClose={onClose} />
          </Box>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
