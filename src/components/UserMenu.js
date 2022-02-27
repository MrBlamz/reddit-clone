import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import defaultAvatar from '../assets/avatar/avatar.png';
import { AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { signOut } from '../utils/firebase/auth';

const Item = ({ onClick, icon, text, ...rest }) => (
  <MenuItem onClick={onClick} {...rest}>
    <HStack spacing={4}>
      <Icon boxSize='20px' as={icon} />
      <span>{text}</span>
    </HStack>
  </MenuItem>
);

const SignedOutMenu = ({
  toggleColorMode,
  colorMode,
  openAuthenticationModal,
}) => (
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
        <Item
          onClick={toggleColorMode}
          icon={useColorModeValue(BsMoon, BsSun)}
          text={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        />
      </MenuGroup>
      <MenuDivider />

      <Item
        onClick={() => openAuthenticationModal('login')}
        icon={FiLogIn}
        text='Log In / Sign Up'
      />
    </MenuList>
  </Menu>
);

const SignedInMenu = ({ username, toggleColorMode, colorMode }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded='full'
        variant='link'
        cursor='pointer'
        minW={0}
      >
        <Avatar size='sm' src={defaultAvatar} />
      </MenuButton>
      <MenuList
        alignItems='center'
        bg={useColorModeValue('brand.light', 'brand.dark')}
        borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      >
        <br />
        <Center>
          <Avatar size='2xl' src={defaultAvatar} />
        </Center>
        <br />
        <Center>
          <Text fontWeight='bold'>{username}</Text>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={toggleColorMode}>
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const UserMenu = ({ user, openAuthenticationModal }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  // Default to an empty object to prevent error when user is null (Signed out)
  const { data = {} } = user || {};
  const { username = 'Username' } = data;

  return user ? (
    <SignedInMenu
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
      username={username}
    />
  ) : (
    <SignedOutMenu
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
      openAuthenticationModal={openAuthenticationModal}
    />
  );
};

export default UserMenu;
