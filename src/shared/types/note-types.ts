export interface NoteData {
  title: string;
  content: string;
  createdAt?: string | Date;
}

export type NotesRecord = Record<string, NoteData>;
