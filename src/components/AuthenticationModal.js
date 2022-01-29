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
  useToast,
} from '@chakra-ui/react';
import art from '../assets/modalArt.png';
import { FcGoogle } from 'react-icons/fc';
import {
  signInWithGoogleAccount,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../utils/firebase/auth';
import AuthenticationForm from './AuthenticationForm';
import Toast from './Toast';

const SuccessfulSignInToast = ({ username = '' }) => (
  <Toast variant='success' text='Welcome Back!' />
);

const SuccessfulSignUpToast = () => (
  <Toast variant='success' text='Your account has been registered!' />
);

const FailedAuthenticationToast = ({ error }) => (
  <Toast variant='error' text={error} />
);

const AuthenticationModal = ({ mode, setMode, isOpen, onClose }) => {
  const isLogin = mode === 'login';
  const toast = useToast({
    duration: 3000,
    position: 'bottom',
  });

  const handleFormSubmit = (values, actions) => {
    const { email, password } = values;

    const result = isLogin
      ? signInWithEmailAndPassword(email, password)
      : signUpWithEmailAndPassword(email, password);

    result
      .then(() => {
        onClose();
        toast({
          render: () =>
            isLogin ? <SuccessfulSignInToast /> : <SuccessfulSignUpToast />,
        });
      })
      .catch((error) => {
        toast({
          render: () => <FailedAuthenticationToast error={error.message} />,
        });
      })
      .finally(() => actions.setSubmitting(false));
  };

  const handleGoogleButtonClick = () => {
    signInWithGoogleAccount()
      .then((result) => {
        const { creationTime, lastSignInTime } =
          result.user.auth.currentUser.metadata;
        const isNewUser = creationTime === lastSignInTime;

        onClose();
        toast({
          render: () =>
            isNewUser ? <SuccessfulSignUpToast /> : <SuccessfulSignInToast />,
        });
      })
      .catch((error) => {
        toast({
          render: () => <FailedAuthenticationToast error={error.message} />,
        });
      });
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
                <AuthenticationForm
                  isSignUp={!isLogin}
                  handleFormSubmit={handleFormSubmit}
                />
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
                    onClick={() => setMode(isLogin ? 'signUp' : 'login')}
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
