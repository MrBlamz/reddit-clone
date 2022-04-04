import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const DropdownMenu = ({ description, onClick, options = [], selected }) => {
  const color = useColorModeValue('brand.secondary', 'brand.primary');

  const isSelected = (item) => item === selected;

  const handleClick = (event) => {
    const nodeName = event.target.nodeName;

    if (nodeName !== 'BUTTON') return;

    onClick(event);
  };

  return (
    <Menu isLazy gutter={-5} autoSelect={false}>
      <MenuButton
        w='fit-content'
        as={Button}
        rightIcon={<IoMdArrowDropdown />}
        variant='transparent'
        fontSize='14px'
        padding={0}
        _hover={{ outline: 'none' }}
        color={color}
      >
        {description}
      </MenuButton>
      <MenuList
        minW={0}
        bg={useColorModeValue('brand.light', 'brand.dark')}
        fontSize='14px'
        onClick={handleClick}
        pointerEvents='none'
      >
        {Array.isArray(options) &&
          options.map((option) => (
            <MenuItem
              key={option}
              fontWeight={isSelected(option) && 'bold'}
              color={isSelected(option) && color}
              pointerEvents='all'
            >
              {option}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
