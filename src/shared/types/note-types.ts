export interface Note {
  title: string;
  content: string;
  createdAt: string;
}

export interface Notes {
  [id: string]: Note;
}
