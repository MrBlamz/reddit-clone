import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/logo/logo.svg';
import brandTextWhite from '../assets/logo/text_white_theme.svg';
import brandTextDark from '../assets/logo/text_dark_theme.svg';
import AuthenticationModal from './AuthenticationModal';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { signOut } from '../utils/firebase/auth';

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

const UserMenu = ({ user, openAuthenticationModal }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton as={Button} variant='transparent' fontSize='xl' ml={-2}>
        <Flex>
          <Icon
            as={AiOutlineUser}
            color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
          />
          <Icon
            as={BiChevronDown}
            color={useColorModeValue('brand.dark', 'brand.light')}
          />
        </Flex>
      </MenuButton>
      <MenuList
        fontSize='lg'
        bg={useColorModeValue('brand.light', 'brand.dark')}
        borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
        minW={0}
      >
        <MenuGroup title='Options'>
          <MenuItem onClick={toggleColorMode}>
            <HStack spacing={4}>
              <Icon boxSize='20px' as={useColorModeValue(BsMoon, BsSun)} />
              <span>{colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </HStack>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        {user ? (
          <MenuItem onClick={signOut}>
            <HStack spacing={4}>
              <Icon as={FiLogOut} boxSize='20px' />
              <span>Logout</span>
            </HStack>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => openAuthenticationModal('login')}>
            <HStack spacing={4}>
              <Icon as={FiLogIn} boxSize='20px' />
              <span>Log In / Sign Up</span>
            </HStack>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
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
