import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './colors';
import Button from './components/button';
import Link from './components/link';
import Textarea from './components/textarea';
import Input from './components/input';

const config = { initialColorMode: 'light', useSystemColorMode: true };

const overrides = {
  config,
  styles,
  colors,
  components: {
    Button,
    Link,
    Textarea,
    Input,
  },
};

export default extendTheme(overrides);
