import { useContext, useState } from 'react';
import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/logo/logo.svg';
import brandTextWhite from '../assets/logo/text_white_theme.svg';
import brandTextDark from '../assets/logo/text_dark_theme.svg';
import UserMenu from './UserMenu';
import AuthenticationModal from './AuthenticationModal';
import UserContext from '../contexts/UserContext';

const Logo = () => {
  const brandName = useColorModeValue(brandTextWhite, brandTextDark);

  return (
    <HStack spacing={2}>
      <Image
        minW='32px'
        minH='32px'
        src={logo}
        alt='Brand Logo'
        objectFit='fill'
      />
      <Image
        display={{ base: 'none', md: 'block' }}
        minW='60px'
        minH='20px'
        src={brandName}
        alt='Brand Name'
        objectFit='fill'
      />
    </HStack>
  );
};

const SearchBar = () => {
  return (
    <InputGroup
      bg={useColorModeValue('brand.inputBgLight', 'brand.inputBgDark')}
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius='100%'
      _hover={{
        borderColor: useColorModeValue('brand.secondary', 'brand.light'),
      }}
    >
      <InputLeftElement
        pointerEvents='none'
        color='brand.iconDark'
        fontSize='1.5rem'
        children={<IoSearchOutline />}
      />
      <Input
        placeholder='Search Reddit'
        focusBorderColor={useColorModeValue('brand.secondary', 'brand.light')}
        _hover={{ outline: 'none' }}
      />
    </InputGroup>
  );
};

const Navbar = () => {
  const user = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentAuthenticationMode, setCurrentAuthenticationMode] =
    useState('login');

  const openAuthenticationModal = (mode = 'login') => {
    setCurrentAuthenticationMode(mode);
    onOpen();
  };

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
        <HStack
          spacing='3'
          display={user ? 'none' : { base: 'none', lg: 'flex' }}
        >
          <Button
            variant='secondary'
            w='120px'
            h='32px'
            onClick={() => openAuthenticationModal('login')}
          >
            Log In
          </Button>
          <Button
            variant='primary'
            w='120px'
            h='32px'
            onClick={() => openAuthenticationModal('signUp')}
          >
            Sign Up
          </Button>
        </HStack>
        <Flex>
          <UserMenu
            user={user}
            openAuthenticationModal={openAuthenticationModal}
          />
        </Flex>
      </HStack>

      <AuthenticationModal
        mode={currentAuthenticationMode}
        setMode={setCurrentAuthenticationMode}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
};

export default Navbar;
