import '@mantine/core/styles.css';

import { useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ActionIcon, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetchNotes } from '@/entities';
import { Routering } from '../pages';
import { Note } from '../shared';
import { NoteCard } from '../widgets';
import { AppMantineProvider, AppRouter } from './';

export const App = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [opened, { toggle }] = useDisclosure();
  const { notes, isLoading } = useFetchNotes();

  const selectedNote: Note | null = selectedNoteId ? notes[selectedNoteId] : null;
  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  return (
    <AppMantineProvider>
      <AppRouter>
        <AppShell
          header={{ height: 60, offset: true }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header withBorder>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <ActionIcon variant="subtle" aria-label="Удалить" disabled={!selectedNote}>
                <TbTrash />
              </ActionIcon>
              <ActionIcon variant="subtle" aria-label="Редактировать" disabled={!selectedNote}>
                <TbEdit />
              </ActionIcon>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md" withBorder>
            Navbar
            {Object.entries(notes).map(([id, { title, content, createdAt }]) => (
              <div key={id} onClick={() => handleSelectNote(id)} style={{ cursor: 'pointer' }}>
                <NoteCard title={title} content={content} createdAt={createdAt} />
              </div>
            ))}
          </AppShell.Navbar>
          <AppShell.Main pt="76px">
            <Routering selectedNote={selectedNote} />
          </AppShell.Main>
        </AppShell>
      </AppRouter>
    </AppMantineProvider>
  );
};
