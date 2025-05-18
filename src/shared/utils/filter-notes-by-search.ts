import { NoteData, NotesRecord } from '../types/note-types';

export const filterNotesBySearch = (
  notes: NotesRecord,
  searchStr: string
): Array<[string, NoteData]> => {
  if (!searchStr.trim()) {
    return Object.entries(notes);
  }

  const lowerSearchStr = searchStr.toLocaleLowerCase();

  return Object.entries(notes).filter(([_, { title = '', content = '' }]) => {
    const lowerTitle = title?.toLowerCase() || '';
    const lowerContent = content?.toLowerCase() || '';

    return lowerTitle.includes(lowerSearchStr) || lowerContent.includes(lowerSearchStr);
  });
};
