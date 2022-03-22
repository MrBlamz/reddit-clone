import { Button, Text } from '@chakra-ui/react';
import { BiShare } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { VscComment } from 'react-icons/vsc';

export const ActionButton = ({ ariaLabel, icon, text, ...rest }) => (
  <Button
    variant='action'
    aria-label={ariaLabel}
    leftIcon={icon}
    fontSize='xl'
    {...rest}
  >
    <Text fontSize='xs'>{text}</Text>
  </Button>
);

export const CommentsButton = ({ commentsNumber, ...rest }) => (
  <ActionButton
    ariaLabel='Open Comments'
    icon={<VscComment />}
    text={`${commentsNumber} ${commentsNumber === 1 ? 'Comment' : 'Comments'}`}
    {...rest}
  />
);

export const ShareButton = ({ ...rest }) => (
  <ActionButton
    ariaLabel='Share post'
    icon={<BiShare style={{ transform: 'rotateY(180deg)' }} />}
    text='Share'
    {...rest}
  />
);

export const SaveButton = ({ ...rest }) => (
  <ActionButton
    ariaLabel='Save post'
    icon={<BsBookmark />}
    text='Save'
    {...rest}
  />
);

export default ActionButton;
