import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const notesDbRef = ref(db, 'notes');

    return onValue(notesDbRef, (snapshot) => {
      const loadedNotes = snapshot.val() || [];

      setNotes(loadedNotes);
      setIsLoading(false);
    });
  }, []);

  return { notes, isLoading };
};
