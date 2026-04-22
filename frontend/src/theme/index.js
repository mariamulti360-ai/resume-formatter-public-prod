import { createTheme } from '@mui/material/styles';

// Cores inspiradas no degradê: Magenta, Roxo e Laranja
const instagramGradient = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

export const getAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#bc1888', // Magenta base
    },
    secondary: {
      main: '#cc2366',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#121212',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          // Exemplo de como usar o gradiente em botões contidos
          '&.MuiButton-containedPrimary': {
            background: instagramGradient,
          },
        },
      },
    },
  },
});