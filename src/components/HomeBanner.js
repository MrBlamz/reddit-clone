import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import banner from '../assets/homeBanner.png';
import mascotImage from '../assets/snoo.png';
import useModal from '../hooks/useModal';
import { useNotification } from '../hooks/useNotification';

export const HomeBanner = (props) => {
  const { onOpen } = useModal('CreateCommunityModal');
  const { sendNotification } = useNotification();

  const handleCreatePostButtonClick = () =>
    sendNotification('warning', 'Work in progress.');

  return (
    <Flex
      bg={useColorModeValue('brand.light', 'brand.dark')}
      border='1px'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius={5}
      {...props}
    >
      <Box>
        <Image src={banner} alt='Home banner' />

        <VStack alignItems='flex-start' p={3} spacing={3}>
          <Flex gap={3} alignItems='center' mt={-6}>
            <Image src={mascotImage} alt='Reddit Mascot' w='40px' h='68px' />
            <Text as='h2' fontWeight='bold'>
              Home
            </Text>
          </Flex>
          <Text>
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </Text>
          <Button w='full' variant='primary' onClick={onOpen}>
            Create Community
          </Button>
          <Button
            w='full'
            variant='secondary'
            onClick={handleCreatePostButtonClick}
          >
            Create Post
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
