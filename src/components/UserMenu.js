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
import useModal from '../hooks/useModal';
import { useUser } from '../hooks/useUser';

const Item = ({ onClick, icon, text, ...rest }) => (
  <MenuItem onClick={onClick} {...rest}>
    <HStack spacing={4}>
      <Icon boxSize='20px' as={icon} />
      <span>{text}</span>
    </HStack>
  </MenuItem>
);

const SignedOutMenu = ({ toggleColorMode, colorMode }) => {
  const { onOpen } = useModal('LoginModal');

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
          <Item
            onClick={toggleColorMode}
            icon={useColorModeValue(BsMoon, BsSun)}
            text={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          />
        </MenuGroup>
        <MenuDivider />

        <Item onClick={onOpen} icon={FiLogIn} text='Log In / Sign Up' />
      </MenuList>
    </Menu>
  );
};

const SignedInMenu = ({
  username = 'Redditor',
  toggleColorMode,
  colorMode,
}) => {
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

const UserMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, username } = useUser();

  return isLoggedIn ? (
    <SignedInMenu
      username={username}
      colorMode={colorMode}
      toggleColorMode={toggleColorMode}
    />
  ) : (
    <SignedOutMenu colorMode={colorMode} toggleColorMode={toggleColorMode} />
  );
};

export default UserMenu;
