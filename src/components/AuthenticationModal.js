import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import art from '../assets/modalArt.png';
import { FcGoogle } from 'react-icons/fc';
import {
  signInWithGoogleAccount,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../utils/firebase/auth';
import SignUpForm from './SignUpForm';
import {
  fetchUsername,
  handleSignUpWithEmailAndPassword,
} from '../utils/firebase/firestore';
import SignInForm from './SignInForm';
import useModal from '../hooks/useModal';
import { useNotification } from '../hooks/useNotification';
import { USER_DATA as NEW_USER_DATA } from '../store/auth';

const ACCOUNT_REGISTERED_MESSAGE = 'Your account has been registered!';
const LOGIN_MESSAGE = 'Welcome back ';

const AuthenticationModal = () => {
  const { isOpen, isLogin, onClose, changeMode } = useModal(
    'AuthenticationModal'
  );
  const { sendNotification } = useNotification();

  const handleFormError = (message, formActions) => {
    sendNotification('error', message);
    formActions.setSubmitting(false);
  };

  const handleSignUpFormSubmit = async (values, actions) => {
    const { email, password, username } = values;

    try {
      const { user } = await signUpWithEmailAndPassword(email, password);
      const userData = { ...NEW_USER_DATA, username };

      await handleSignUpWithEmailAndPassword(user.uid, userData);

      onClose();
      sendNotification('success', ACCOUNT_REGISTERED_MESSAGE);
    } catch ({ message }) {
      handleFormError(message, actions);
    }
  };

  const handleSignInFormSubmit = async (values, actions) => {
    const { email, password } = values;

    try {
      const { user } = await signInWithEmailAndPassword(email, password);
      const username = await fetchUsername(user.uid);
      onClose();
      sendNotification('success', LOGIN_MESSAGE + username);
    } catch ({ message }) {
      handleFormError(message, actions);
    }
  };

  const handleGoogleButtonClick = async () => {
    sendNotification('warning', 'Google authentication is currently disabled.');
    // try {
    //   const { user } = await signInWithGoogleAccount();

    //   const { creationTime, lastSignInTime } = user.auth.currentUser.metadata;
    //   const isNewUser = creationTime === lastSignInTime;

    //   onClose();

    //   if (isNewUser) {
    // TODO - prompt for username and then save userdata on server
    //     const userData = { ...NEW_USER_DATA, username: 'Google' };
    //     // saveUserDataOnServer(user.uid, userData);
    //     sendNotification('success', ACCOUNT_REGISTERED_MESSAGE);
    //     return;
    //   }

    //   const username = await fetchUsername(user.uid);
    //   sendNotification('success', LOGIN_MESSAGE + username);
    // } catch (error) {
    //   console.log(error);
    //   sendNotification('error', error.message);
    // }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      bg={useColorModeValue('brand.light', 'brand.dark')}
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: 'full', sm: '90%', md: '700px' }}>
        <ModalCloseButton
          color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
        />
        <Flex
          bg={useColorModeValue('brand.light', 'brand.dark')}
          p={{ base: 4, sm: 0 }}
        >
          <Box
            display={{ base: 'none', sm: 'block' }}
            backgroundSize='cover'
            backgroundRepeat='no-repeat'
            backgroundImage={art}
            minH='600px'
            w='130px'
            mr={5}
          ></Box>
          <Flex direction='column' my='10%'>
            <Box>
              <Text fontWeight='bold'>{isLogin ? 'Login' : 'Sign up'}</Text>
              <Text fontSize='xs'>
                By continuing, you agree to our{' '}
                <Link variant='primary'>User Agreement</Link> and{' '}
                <Link variant='primary'>Privacy Policy</Link>.
              </Text>
            </Box>
            <Box w={{ base: 'full', md: '80%' }}>
              <Flex mt='20%'>
                <Button
                  variant='outline'
                  fontWeight='normal'
                  w='full'
                  onClick={handleGoogleButtonClick}
                >
                  <Icon as={FcGoogle} boxSize='20px' mr='auto' />
                  <Text mr='auto'>
                    {isLogin ? 'Log in' : 'Sign up'} with Google
                  </Text>
                </Button>
              </Flex>

              <HStack spacing={4} my='10%'>
                <Divider />
                <Text fontSize='xs'>OR</Text>
                <Divider />
              </HStack>

              <Box>
                {isLogin ? (
                  <SignInForm handleSubmit={handleSignInFormSubmit} />
                ) : (
                  <SignUpForm handleSubmit={handleSignUpFormSubmit} />
                )}
              </Box>

              <Box mt='10%'>
                <HStack spacing={1}>
                  <Text fontSize='smaller'>
                    {isLogin ? 'New to Reddit?' : 'Already a redditor?'}
                  </Text>
                  <Link
                    variant='primary'
                    fontSize='smaller'
                    fontWeight='bold'
                    onClick={changeMode}
                  >
                    {isLogin ? 'SIGN UP' : 'LOG IN'}
                  </Link>
                </HStack>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default AuthenticationModal;
