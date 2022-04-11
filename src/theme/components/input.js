import { mode } from '@chakra-ui/theme-tools';

const Input = {
  variants: {
    primary: (props) => ({
      field: {
        bg: 'inherit',
        border: mode('2px solid', '1px solid')(props),
        borderColor: mode('brand.borderLight', 'brand.borderDark')(props),
        _focus: {
          borderColor: mode('#000', '#fff')(props),
        },
      },
    }),
  },
};

export default Input;
