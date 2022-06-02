import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Modal: ComponentStyleConfig = {
  parts: ['header', 'dialog', 'footer'],
  baseStyle: {
    header: {
      fontSize: '2xl',
      py: '1em',
      display: { base: 'none', lg: 'unset' },
    },
    dialog: {
      borderRadius: 0,
      height: { base: 'calc(100vh - 120px)', lg: '600px' },
      width: '400px',
      shadow: { base: 'none', lg: 'unset' },
    },
    footer: {
      display: { base: 'none', lg: 'unset' },
    },
  },
};
