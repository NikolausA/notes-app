import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { NotesRecord } from '../../../shared';
import { db } from '../../firebase';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<NotesRecord>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('notes');
    if (cached) {
      setNotes(JSON.parse(cached));
      setIsLoading(false);
    }

    const notesDbRef = ref(db, 'notes');
    const unsubscribe = onValue(notesDbRef, (snapshot) => {
      const loadedNotes = (snapshot.val() || {}) as NotesRecord;
      setNotes(loadedNotes);
      setIsLoading(false);
      try {
        localStorage.setItem('notes', JSON.stringify(loadedNotes));
      } catch (err) {
        console.error('Failed to save notes to localStorage:', err);
      }
    });

    return unsubscribe;
  }, []);

  return { notes, isLoading };
};
