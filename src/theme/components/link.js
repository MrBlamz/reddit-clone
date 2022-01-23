import { darken, mode, whiten } from '@chakra-ui/theme-tools';

const Link = {
  variants: {
    primary: (props) => ({
      color: mode('brand.secondary', 'brand.primary')(props),
      _hover: {
        color: mode(
          whiten('brand.secondary', 15),
          darken('brand.primary', 15)
        )(props),
        textDecoration: 'none',
      },
    }),
  },
};

export default Link;
