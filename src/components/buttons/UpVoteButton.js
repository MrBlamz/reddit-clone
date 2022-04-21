import { IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { GoArrowUp } from 'react-icons/go';

const UpVoteButton = ({ isUpVote, ...rest }) => {
  const color = useColorModeValue('brand.iconLight', 'brand.iconDark');

  return (
    <IconButton
      variant='action'
      aria-label='Downvote Post'
      icon={<GoArrowUp />}
      size='sm'
      fontSize={{ base: 24, md: 28 }}
      color={isUpVote ? 'brand.primary' : color}
      _hover={{
        color: 'brand.primary',
        bg: useColorModeValue('brand.iconFadedLight', 'brand.iconFadedDark'),
      }}
      {...rest}
    />
  );
};

export default UpVoteButton;
