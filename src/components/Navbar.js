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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/logo/logo.svg';
import brandTextWhite from '../assets/logo/text_white_theme.svg';
import brandTextDark from '../assets/logo/text_dark_theme.svg';
import UserMenu from './UserMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth';
import { openLoginModal, openSignUpModal } from '../store/ui';

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
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthStatus);

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
          display={isLoggedIn ? 'none' : { base: 'none', lg: 'flex' }}
        >
          <Button
            variant='secondary'
            w='120px'
            h='32px'
            onClick={() => dispatch(openLoginModal())}
          >
            Log In
          </Button>
          <Button
            variant='primary'
            w='120px'
            h='32px'
            onClick={() => {
              dispatch(openSignUpModal());
            }}
          >
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
