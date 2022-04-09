import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CommunityHeader = ({ communityName }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/r/${communityName}`);

  return (
    <Box
      as='header'
      py={{ base: 5, md: 7 }}
      bg='green.400'
      onClick={handleClick}
      _hover={{ cursor: 'pointer' }}
    >
      <Heading
        mx={{ base: 3, md: 72 }}
        fontSize={{ base: 20, md: 22 }}
        color='white'
      >
        {communityName}
      </Heading>
    </Box>
  );
};

export default CommunityHeader;
