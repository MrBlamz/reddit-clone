import {
  Box,
  Divider,
  Fade,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NewPostForm from '../components/NewPostForm';

const SubmitPost = () => {
  return (
    <Fade in={true}>
      <Box px={{ base: 3, md: '5rem', xl: '28rem' }} py={3}>
        <Flex
          p={3}
          direction='column'
          borderRadius={5}
          bg={useColorModeValue('brand.light', 'brand.dark')}
          alignItems='flex-start'
        >
          <Box as='header' w='full'>
            <Heading fontSize={18}>Create a post</Heading>
            <Divider mt={3} />
          </Box>

          <Box w='full' mt={4}>
            <NewPostForm />
          </Box>
        </Flex>
      </Box>
    </Fade>
  );
};

export default SubmitPost;
