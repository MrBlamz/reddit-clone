import { useState } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';

export const FollowCommunityButton = ({ isFollower, onClick, ...props }) => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const handleHover = (value) => () => setIsHoveringButton(value);

  return (
    <Button
      w={90}
      variant={useColorModeValue('secondary', 'primary')}
      borderColor={useColorModeValue('white', 'black')}
      onClick={onClick}
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
      {...props}
    >
      {isFollower && isHoveringButton
        ? 'Leave'
        : isFollower
        ? 'Joined'
        : 'Join'}
    </Button>
  );
};
