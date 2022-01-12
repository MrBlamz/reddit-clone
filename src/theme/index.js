import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './colors';
import Button from './components/button';

const config = { initialColorMode: 'light', useSystemColorMode: true };

const overrides = {
  config,
  styles,
  colors,
  components: {
    Button,
  },
};

export default extendTheme(overrides);
