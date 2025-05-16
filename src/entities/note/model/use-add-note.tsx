import { push, ref } from 'firebase/database';
import { db } from '../../../firebase';
import { NoteData } from '../../../shared';

export const useAddNote = () => {
  const requestAddNote = async (newNote: NoteData) => {
    try {
      const notesDbRef = ref(db, 'notes');
      const res = await push(notesDbRef, newNote);
      console.log('New note added: ', res);
      return res;
    } catch (error) {
      console.error('Error adding note: ', error);
      throw error;
    }
  };

  return requestAddNote;
};
