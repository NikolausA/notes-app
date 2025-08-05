import { ref, remove } from 'firebase/database';
import { db } from '../../firebase';

export const useDeleteNote = () => {
  const requestDeleteNote = (id: string) => {
    const noteDbRef = ref(db, `notes/${id}`);
    remove(noteDbRef);
  };

  return requestDeleteNote;
};
