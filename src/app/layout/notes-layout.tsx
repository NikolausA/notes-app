import { useState } from 'react';
import { TbEdit, TbLogout, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Burger, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetchNotes } from '@/entities';
import { useAuth } from '../';
import { Note } from '../../shared';
import { NoteCard, NotePlaceholder, NoteViewer } from '../../widgets';

export const NotesLayout = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [opened, { toggle }] = useDisclosure();
  const { notes, isLoading } = useFetchNotes();

  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const selectedNote: Note | null = selectedNoteId ? notes[selectedNoteId] : null;
  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleLogout = () => {
    signout(() => navigate('/login'));
  };

  return (
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
        <Flex h="100%" align="center" p="md">
          {/* Левая часть — бургер */}
          <Group justify="flex-start" w={200}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>

          {/* Центр — редактировать / удалить */}
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <ActionIcon variant="subtle" aria-label="Удалить" disabled={!selectedNote}>
              <TbTrash />
            </ActionIcon>
            <ActionIcon variant="subtle" aria-label="Редактировать" disabled={!selectedNote}>
              <TbEdit />
            </ActionIcon>
          </Flex>

          {/* Правая часть — имя пользователя и логаут */}
          <Group justify="flex-end" w={200}>
            {user && (
              <>
                <Text fw={500}>{user.name}</Text>
                <ActionIcon variant="subtle" onClick={handleLogout}>
                  <TbLogout />
                </ActionIcon>
              </>
            )}
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" withBorder>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.entries(notes).map(([id, { title, content, createdAt }]) => {
            const isSelected = id === selectedNoteId;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectNote(id)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: isSelected ? '#2C2E33' : 'transparent',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              >
                <NoteCard title={title} content={content} createdAt={createdAt} />
              </button>
            );
          })
        )}
      </AppShell.Navbar>
      <AppShell.Main pt={80}>
        {selectedNote ? (
          <NoteViewer
            title={selectedNote.title}
            content={selectedNote.content}
            createdAt={selectedNote.createdAt}
          />
        ) : (
          <NotePlaceholder />
        )}
      </AppShell.Main>
    </AppShell>
  );
};
