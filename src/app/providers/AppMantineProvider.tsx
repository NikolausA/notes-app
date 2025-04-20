// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import { ReactNode } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';

interface AppMantineProviderProps {
  children: ReactNode;
}

// const emotionCache = createCache({ key: "css", prepend: true });

const theme = createTheme({
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  primaryColor: 'gray',

  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E', // основной фон
      '#141517',
      '#101113',
    ],
  },

  components: {
    ActionIcon: {
      defaultProps: {
        color: 'gray.0',
      },
      styles: () => ({
        root: {
          color: 'white',
        },
      }),
    },
    Skeleton: {
      styles: () => ({
        root: {
          backgroundColor: '#2C2E33',
          borderRadius: '8px',
        },
      }),
    },
  },
});

export const AppMantineProvider = ({ children }: AppMantineProviderProps) => {
  return (
    // <CacheProvider value={emotionCache}>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
    // </CacheProvider>
  );
};
