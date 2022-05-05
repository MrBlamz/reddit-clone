import {
  Avatar,
  Heading,
  HStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CommunityHeader = ({ communityName }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/r/${communityName}`);

  return (
    <HStack
      as='header'
      spacing={{ base: 3, md: 6 }}
      px={{ base: 3, md: 7 }}
      py={{ base: 5, md: 7 }}
      bg={useColorModeValue('brand.secondary', 'brand.primary')}
      onClick={handleClick}
      _hover={{ cursor: 'pointer' }}
    >
      <Avatar
        name={communityName}
        size={useBreakpointValue({ base: 'md', md: 'lg' })}
        border={`2px solid ${useColorModeValue('white', 'black')}`}
        bg={useColorModeValue('black', 'white')}
        color={useColorModeValue('white', 'black')}
        fontWeight='bold'
      />
      <Heading fontSize={{ base: 20, md: 22 }} color='brand.inputBgLight'>
        {communityName}
      </Heading>
    </HStack>
  );
};

export default CommunityHeader;
