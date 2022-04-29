import {
  Button,
  Flex,
  HStack,
  Image,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo/logo.svg';
import brandTextWhite from '../assets/logo/text_white_theme.svg';
import brandTextDark from '../assets/logo/text_dark_theme.svg';
import UserMenu from './UserMenu';
import useModal from '../hooks/useModal';
import { useUser } from '../hooks/useUser';
import { SearchBar } from './SearchBar';

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

const Navbar = () => {
  const { onOpen: openLoginModal } = useModal('LoginModal');
  const { onOpen: openSignUpModal } = useModal('SignUpModal');
  const { isLoggedIn } = useUser();

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
            onClick={openLoginModal}
          >
            Log In
          </Button>
          <Button
            variant='primary'
            w='120px'
            h='32px'
            onClick={openSignUpModal}
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
