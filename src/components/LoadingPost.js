import { Box, Center, SkeletonText, useColorModeValue } from '@chakra-ui/react';

const LoadingPost = (props) => {
  return (
    <Box
      h={{ base: 400, md: 250 }}
      borderRadius={5}
      p={3}
      bg={useColorModeValue('brand.light', 'brand.dark')}
      {...props}
    >
      <Center spacing={3} w='full' h='full'>
        <SkeletonText w='full' noOfLines={{ base: 24, md: 14 }} />
      </Center>
    </Box>
  );
};

export default LoadingPost;
