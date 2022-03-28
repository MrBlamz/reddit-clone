import {
  Center,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { CommentsIcon } from './icons';

const NoComments = (props) => (
  <Center minH={340} opacity={0.6} {...props}>
    <VStack color={useColorModeValue('brand.iconLight', 'brand.iconDark')}>
      <CommentsIcon
        boxSize={8}
        color={useColorModeValue('brand.secondary', 'brand.iconDark')}
      />
      <Heading fontSize={18}>No Comments Yet</Heading>
      <Text fontSize={14}>Be the first to share what you think!</Text>
    </VStack>
  </Center>
);

export default NoComments;
