import { darken, mode, whiten } from '@chakra-ui/theme-tools';

const Button = {
  baseStyle: {
    borderRadius: 'full',
    border: '1px solid',
    _focus: {
      boxShadow: 'none',
    },
  },
  variants: {
    primary: (props) => ({
      bg: mode('brand.secondary', 'brand.light')(props),
      color: mode('brand.light', 'brand.dark')(props),
      _hover: {
        bg: mode(
          whiten('brand.secondary', 15),
          darken('brand.light', 15)
        )(props),
        _disabled: {
          bg: mode('brand.secondary', 'brand.light')(props),
        },
      },
    }),
    secondary: (props) => ({
      bg: mode('brand.light', 'brand.dark')(props),
      color: mode('brand.secondary', 'brand.light')(props),
      _hover: {
        bg: mode(darken('brand.light', 5), whiten('brand.dark', 10))(props),
      },
      _disabled: {
        bg: mode('brand.light', 'brand.dark')(props),
      },
    }),
    transparent: (props) => ({
      borderColor: 'transparent',
      borderRadius: '5px',
      bg: mode('brand.light', 'brand.dark')(props),
      color: mode('brand.secondary', 'brand.light')(props),
      _hover: {
        borderColor: mode('brand.borderLight', 'brand.borderDark')(props),
      },
      _disabled: {
        bg: mode('brand.light', 'brand.dark')(props),
        border: 'none',
      },
    }),
    action: (props) => ({
      borderColor: 'transparent',
      borderRadius: '2px',
      color: mode('brand.iconLight', 'brand.iconDark')(props),
      _hover: {
        bg: mode('brand.iconFadedLight', 'brand.iconFadedDark')(props),
      },
    }),
  },
};

export default Button;
