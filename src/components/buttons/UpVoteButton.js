import { IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiUpvote } from 'react-icons/bi';

const UpVoteButton = ({ ...rest }) => (
  <IconButton
    variant='action'
    aria-label='Upvote'
    icon={<BiUpvote />}
    minW={0}
    p='0px 5px'
    fontSize='xl'
    color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
    _hover={{
      color: 'brand.primary',
      bg: useColorModeValue('brand.iconFadedLight', 'brand.iconFadedDark'),
    }}
    {...rest}
  />
);

export default UpVoteButton;
