import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const AlertDialog = ({
  isOpen,
  onClose,
  closeRef,
  title,
  content,
  cancelButtonText,
  ActionButtonText,
  onActionButtonClick,
}) => {
  const [state, setState] = useState({
    isSubmitting: false,
  });

  const handleActionButtonClick = async () => {
    setState((prevState) => ({ ...prevState, isSubmitting: true }));

    try {
      await onActionButtonClick();
      onClose();
    } catch (error) {
      console.log(error);
      setState((prevState) => ({ ...prevState, isSubmitting: false }));
    }
  };

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={closeRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg={useColorModeValue('brand.light', 'brand.dark')}>
          <AlertDialogCloseButton />
          <AlertDialogHeader p={0}>
            <Box py={4} px={6}>
              <Text fontSize={16}>{title}</Text>
            </Box>
            <Divider />
          </AlertDialogHeader>
          <AlertDialogBody py={8} fontSize={{ base: 14, md: 16 }}>
            {content}
          </AlertDialogBody>
          <AlertDialogFooter
            bg={useColorModeValue('#edeff1', '#343536')}
            borderTop='1px solid #fff'
            borderRadius={'0 0 5px 5px'}
          >
            <HStack>
              <Button
                variant='secondary'
                ref={closeRef}
                onClick={onClose}
                h={9}
                fontSize={14}
              >
                {cancelButtonText}
              </Button>
              <Button
                h={9}
                fontSize={14}
                variant='primary'
                _hover={{
                  bg: 'red.500',
                  borderColor: 'red.500',
                }}
                onClick={handleActionButtonClick}
                isLoading={state.isSubmitting}
              >
                {ActionButtonText}
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};
