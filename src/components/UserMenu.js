import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { signOut } from '../utils/firebase/auth';

const Item = ({ onClick, icon, text, ...rest }) => (
  <MenuItem onClick={onClick} {...rest}>
    <HStack spacing={4}>
      <Icon boxSize='20px' as={icon} />
      <span>{text}</span>
    </HStack>
  </MenuItem>
);

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
          <Item
            onClick={toggleColorMode}
            icon={useColorModeValue(BsMoon, BsSun)}
            text={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          />
        </MenuGroup>
        <MenuDivider />
        {user ? (
          <Item onClick={signOut} icon={FiLogOut} text='Logout' />
        ) : (
          <Item
            onClick={() => openAuthenticationModal('login')}
            icon={FiLogIn}
            text='Log In / Sign Up'
          />
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
