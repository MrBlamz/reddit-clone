import { useRef } from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import useModal from '../hooks/useModal';
import { IoInformationCircleOutline } from 'react-icons/io5';
import NewCommunityForm from './NewCommunityForm';
import TouchFriendlyTooltip from './TouchFriendlyTooltip';

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

          <VStack w='full' alignItems='flex-start' spacing={1}>
            <Heading fontSize={16}>Name</Heading>
            <HStack
              fontSize={12}
              color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
            >
              <Text>
                Community names including capitalization cannot be changed.
              </Text>
              <TouchFriendlyTooltip
                label={
                  'Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme").'
                }
                fontSize={12}
                fontWeight='bold'
                bg='#000'
                color='#fff'
                w={200}
                textAlign='center'
              >
                <IoInformationCircleOutline size={16} />
              </TouchFriendlyTooltip>
            </HStack>
          </VStack>

          <Box w='full'>
            <NewCommunityForm innerRef={ref} onClose={onClose} />
          </Box>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
