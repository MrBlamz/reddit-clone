import { IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { GoArrowDown } from 'react-icons/go';

const DownVoteButton = ({ isDownVote, ...rest }) => {
  const color = useColorModeValue('brand.iconLight', 'brand.iconDark');

  return (
    <IconButton
      variant='action'
      aria-label='Downvote Post'
      icon={<GoArrowDown />}
      size='sm'
      fontSize={{ base: 24, md: 28 }}
      color={isDownVote ? 'brand.secondary' : color}
      _hover={{
        color: 'brand.secondary',
        bg: useColorModeValue('brand.iconFadedLight', 'brand.iconFadedDark'),
      }}
      {...rest}
    />
  );
};

export default DownVoteButton;
