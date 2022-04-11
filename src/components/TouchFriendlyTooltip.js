import { Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

const TouchFriendlyTooltip = ({ label, children, ...props }) => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  const onMouseEnter = () => setIsLabelOpen(true);
  const onMouseLeave = () => setIsLabelOpen(false);
  const onClick = () => setIsLabelOpen(true);

  return (
    <Tooltip label={label} isOpen={isLabelOpen} {...props}>
      <span
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default TouchFriendlyTooltip;
