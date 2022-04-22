import { useBreakpointValue, useToast } from '@chakra-ui/react';
import Toast from '../components/Toast';

export const useNotification = () => {
  const position = useBreakpointValue({ base: 'top', md: 'bottom' });
  const toast = useToast({
    duration: 3000,
    position: position,
  });

  const sendNotification = (status, message) => {
    toast({
      render: () => <Toast variant={status} text={message} />,
    });
  };

  return { sendNotification };
};
