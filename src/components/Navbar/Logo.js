import {
  HStack,
  Image,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import logo from '../../assets/logo/logo.svg';
import brandTextWhite from '../../assets/logo/text_white_theme.svg';
import brandTextDark from '../../assets/logo/text_dark_theme.svg';

const Logo = (props) => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const brandName = useColorModeValue(brandTextWhite, brandTextDark);

  return (
    <HStack spacing={2}>
      <Image
        minW='32px'
        minH='32px'
        src={logo}
        alt='Brand Logo'
        objectFit='fill'
      />
      {isDesktop && (
        <Image
          minW='60px'
          minH='20px'
          src={brandName}
          alt='Brand Name'
          objectFit='fill'
        />
      )}
    </HStack>
  );
};

export default Logo;
