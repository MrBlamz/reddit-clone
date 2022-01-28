import { Box, chakra, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsLightningFill } from 'react-icons/bs';
import { IoMdAlert, IoMdCheckmarkCircle } from 'react-icons/io';

const Toast = ({ variant, text }) => {
  const { icon, iconBg, title, titleColorLight, titleColorDark } =
    VARIANTS[variant];

  return (
    <Flex
      maxW='sm'
      w='full'
      mx='auto'
      mb='3%'
      bg={useColorModeValue('brand.light', 'brand.dark')}
      shadow='md'
      rounded='lg'
      overflow='hidden'
    >
      <Flex justifyContent='center' alignItems='center' w={12} bg={iconBg}>
        <Icon as={icon} color='white' boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color={useColorModeValue(titleColorLight, titleColorDark)}
            fontWeight='bold'
          >
            {title}
          </chakra.span>
          <chakra.p
            color={useColorModeValue('gray.600', 'gray.200')}
            fontSize='sm'
          >
            {text}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  );
};

const VARIANTS = {
  success: {
    icon: IoMdCheckmarkCircle,
    iconBg: 'green.500',
    title: 'Success',
    titleColorLight: 'green.500',
    titleColorDark: 'green.400',
  },
  error: {
    icon: BsLightningFill,
    iconBg: 'red.500',
    title: 'Error',
    titleColorLight: 'red.500',
    titleColorDark: 'red.400',
  },
  info: {
    icon: IoMdAlert,
    iconBg: 'blue.500',
    title: 'Info',
    titleColorLight: 'blue.500',
    titleColorDark: 'blue.400',
  },
  warning: {
    icon: IoMdAlert,
    iconBg: 'yellow.500',
    title: 'Warning',
    titleColorLight: 'yellow.400',
    titleColorDark: 'yellow.300',
  },
};

export default Toast;
