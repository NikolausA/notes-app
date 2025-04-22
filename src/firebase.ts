import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAbHHEtqlPTkHG84rhqwBqZluq6B1cOun0',
  authDomain: 'notesapp-7c7aa.firebaseapp.com',
  projectId: 'notesapp-7c7aa',
  storageBucket: 'notesapp-7c7aa.firebasestorage.app',
  messagingSenderId: '987165782502',
  appId: '1:987165782502:web:d1636ab279dd2813126627',
  databaseURL: 'https://notesapp-7c7aa-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
