import { Skeleton } from '@chakra-ui/react';

const LoadingComment = (props) => {
  return <Skeleton h={160} w='full' {...props} />;
};

export default LoadingComment;
