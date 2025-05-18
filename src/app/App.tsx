import '@mantine/core/styles.css';

import { Routering } from '../pages';
import { AppMantineProvider, AppRouter, AuthProvider } from './';

export const App = () => {
  return (
    <AuthProvider>
      <AppMantineProvider>
        <AppRouter>
          <Routering />
        </AppRouter>
      </AppMantineProvider>
    </AuthProvider>
  );
};
