import {
  Button,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Navbar = (props) => {
  return (
    <Flex
      as='nav'
      justifyContent='space-between'
      alignItems='center'
      py='1'
      px={{ base: 2, md: 5 }}
      minH='45px'
      borderBottom='1px solid'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      bg={useColorModeValue('brand.light', 'brand.dark')}
    >
      <Flex mr={5}>
        <Link as={RouterLink} to='/' _focus={{ outline: 'none' }}>
          <Logo />
        </Link>
      </Flex>

      <Flex w={{ base: '70%', lg: '50%' }}>
        <SearchBar />
      </Flex>

      <HStack spacing='4'>
        <HStack spacing='3' display={{ base: 'none', lg: 'flex' }}>
          <Button variant='secondary' w='120px' h='32px'>
            Log In
          </Button>
          <Button variant='primary' w='120px' h='32px'>
            Sign Up
          </Button>
        </HStack>
        <Flex>
          <UserMenu />
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
