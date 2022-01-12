import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('brand.bgLight', 'brand.bgDark')(props),
    },
  }),
};

export default styles;
