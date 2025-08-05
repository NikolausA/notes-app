import { ref, update } from 'firebase/database';
import { NoteData } from '../../../shared';
import { db } from '../../firebase';

export const useUpdateNote = () => {
  const requestUpdateNote = (id: string, note: NoteData) => {
    const noteDbRef = ref(db, `notes/${id}`);

    update(noteDbRef, note).then((res) => console.log('Note has been updated', res));
  };

  return requestUpdateNote;
};
