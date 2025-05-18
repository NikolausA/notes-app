import { ref, update } from 'firebase/database';
import { db } from '../../../firebase';
import { NoteData } from '../../../shared';

export const useUpdateNote = () => {
  const requestUpdateNote = (id: string, note: NoteData) => {
    const noteDbRef = ref(db, `notes/${id}`);

    update(noteDbRef, note).then((res) => console.log('Note has been updated', res));
  };

  return requestUpdateNote;
};
