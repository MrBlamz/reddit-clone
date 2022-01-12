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
import { FiLogIn } from 'react-icons/fi';

const UserMenu = (props) => {
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

export default UserMenu;
