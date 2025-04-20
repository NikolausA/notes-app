import { Route, Routes } from 'react-router-dom';
import { NoteView } from './';

export const Routering = () => {
  return (
    <Routes>
      <Route path="/" element={<NoteView />} />
    </Routes>
  );
};
