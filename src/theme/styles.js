import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('brand.bgLight', 'brand.bgDark')(props),
      WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
    },
  }),
};

export default styles;
