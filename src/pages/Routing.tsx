import { Route, Routes } from 'react-router-dom';
import { NotesLayout } from '../app';
import { PrivateRoute } from '../features';
import { LoginForm } from '../widgets';

export const Routering = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <NotesLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
