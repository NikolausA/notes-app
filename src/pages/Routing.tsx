import { Route, Routes } from 'react-router-dom';
import { Notes } from '../shared';
import { NotePlaceholder, NoteViewer } from '../widgets';

export const Routering = ({ selectedNote }: Notes) => {
  return (
    <Routes>
      {selectedNote ? (
        <Route
          path="/"
          element={
            <NoteViewer
              title={selectedNote.title}
              content={selectedNote.content}
              createdAt={selectedNote.createdAt}
            />
          }
        />
      ) : (
        <Route path="/" element={<NotePlaceholder />} />
      )}
    </Routes>
  );
};
