import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase';
import { NotesRecord } from '../../../shared';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<NotesRecord>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const notesDbRef = ref(db, 'notes');

    const unsubscribe = onValue(notesDbRef, (snapshot) => {
      const loadedNotes = (snapshot.val() || {}) as NotesRecord;

      setNotes(loadedNotes);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { notes, isLoading };
};
