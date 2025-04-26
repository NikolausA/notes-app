import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase';
import { Notes } from '../../../shared';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<Notes>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const notesDbRef = ref(db, 'notes');

    const unsubscribe = onValue(notesDbRef, (snapshot) => {
      const loadedNotes = (snapshot.val() || {}) as Notes;

      setNotes(loadedNotes);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return { notes, isLoading };
};
