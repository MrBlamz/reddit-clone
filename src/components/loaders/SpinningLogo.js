import { Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import logo from '../../assets/logo/logo.svg';

const spin = keyframes`
  100% {transform: rotate(360deg)}
`;

const SpinningLogo = (props) => (
  <Image
    src={logo}
    w={{ base: '15%', md: '10%' }}
    h={{ base: '15%', md: '10%' }}
    alt='Brand Logo'
    objectFit='fill'
    animation={`${spin} 1.5s linear infinite`}
    {...props}
  />
);

export default SpinningLogo;
