import { extendTheme } from '@chakra-ui/react';

import {
  Button,
  Container,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Modal,
  PinInput,
  Radio,
} from './components';
import { colors, fonts, fontSizes } from './foundations';
import { styles } from './styles';

const theme = extendTheme({
  styles,
  colors,
  fonts,
  fontSizes,
  components: {
    Button,
    Container,
    FormLabel,
    FormErrorMessage,
    Heading,
    Link,
    Input,
    Modal,
    PinInput,
    Radio,
  },
});

export { theme };
