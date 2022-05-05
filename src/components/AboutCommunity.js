import {
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { GiCakeSlice } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

export const AboutCommunity = ({
  description,
  timestamp,
  memberCount,
  ...props
}) => {
  const navigate = useNavigate();
  const creationDateAsString = format(timestamp, 'MMM d,yyyy');

  const handleClick = () => navigate('submit');

  return (
    <Flex
      bg={useColorModeValue('brand.light', 'brand.dark')}
      p={3}
      border='1px'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius={5}
      {...props}
    >
      <VStack w='full' alignItems='flex-start' spacing={4} fontSize={14}>
        <Text
          fontSize='sm'
          color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
          fontWeight='bold'
        >
          About Community
        </Text>
        <Text>{description}</Text>
        <Flex direction='column' justifyContent='center' alignItems='center'>
          <Text fontWeight='bold' fontSize={16}>
            {memberCount}
          </Text>
          <Text fontWeight='bold' fontSize={12}>
            {memberCount === 1 ? 'Member' : 'Members'}
          </Text>
        </Flex>
        <Divider />
        <Flex alignItems='center'>
          <Icon as={GiCakeSlice} transform='rotateY(180deg)' boxSize={6} />
          <Text ml={2}>Created {creationDateAsString}</Text>
        </Flex>
        <Button w='full' variant='primary' onClick={handleClick}>
          Create Post
        </Button>
      </VStack>
    </Flex>
  );
};
