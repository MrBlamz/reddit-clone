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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../assets/logo/logo.svg';
import brandTextWhite from '../assets/logo/text_white_theme.svg';
import brandTextDark from '../assets/logo/text_dark_theme.svg';

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

const UserMenu = () => {
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
        <MenuItem>
          <HStack spacing={4}>
            <Icon as={FiLogIn} boxSize='20px' />
            <span>Log In / Sign Up</span>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

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
