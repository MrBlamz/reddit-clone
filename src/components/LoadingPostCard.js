import { Skeleton } from '@chakra-ui/react';

const LoadingPostCard = ({ isLoaded, ...rest }) => {
  return (
    <Skeleton height='120px' my={1.5} isLoaded={isLoaded} {...rest}></Skeleton>
  );
};

export default LoadingPostCard;
