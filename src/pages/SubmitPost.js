import {
  Box,
  Divider,
  Fade,
  Heading,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import NewPostForm from '../components/NewPostForm';

const SubmitPost = () => {
  return (
    <Fade in={true}>
      <Box px={{ base: 3, md: '5rem', xl: '28rem' }} py={{ base: 3, xl: 10 }}>
        <VStack
          spacing={3}
          p={3}
          bg={useColorModeValue('brand.light', 'brand.dark')}
          borderRadius={5}
        >
          <Box as='header' w='full'>
            <Heading fontSize={18}>Create a post</Heading>
            <Divider mt={3} />
          </Box>

          <Box w='full'>
            <NewPostForm />
          </Box>
        </VStack>
      </Box>
    </Fade>
  );
};

export default SubmitPost;
