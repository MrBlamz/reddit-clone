import { IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiDownvote } from 'react-icons/bi';

const DownVoteButton = ({ ...rest }) => (
  <IconButton
    variant='action'
    aria-label='Downvote'
    icon={<BiDownvote />}
    minW={0}
    p='0px 5px'
    fontSize='lg'
    color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
    _hover={{
      color: 'brand.secondary',
      bg: useColorModeValue('brand.iconFadedLight', 'brand.iconFadedDark'),
    }}
    {...rest}
  />
);

export default DownVoteButton;
