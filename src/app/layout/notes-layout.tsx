import { useEffect, useState } from 'react';
import { TbDeviceFloppy, TbEdit, TbLogout, TbPlus, TbSearch, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, AppShell, Burger, Flex, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetchNotes } from '@/entities';
import { useAuth } from '../';
import { filterNotesBySearch, NoteData, useDebounce } from '../../shared';
import { NoteCard, NoteEditor, NotePlaceholder, NoteViewer } from '../../widgets';

export const NotesLayout = () => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [opened, { toggle }] = useDisclosure();
  const { notes, isLoading } = useFetchNotes();
  const [filtredNotes, setFiltredNotes] = useState<Array<[string, NoteData]>>([]);

  useEffect(() => {
    setFiltredNotes(filterNotesBySearch(notes, searchQuery));
  }, [notes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useDebounce(() => setFiltredNotes(() => filterNotesBySearch(notes, searchQuery)), 1000, [
    notes,
    searchQuery,
  ]);

  // console.log(filtredNotes);

  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const selectedNote: NoteData | null = selectedNoteId ? notes[selectedNoteId] : null;
  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCreateNewNote = () => {
    setSelectedNoteId(null);
    setIsCreating(true);
    setIsEditing(false);
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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Flex justify="center" align="center" style={{ flex: 1 }} gap="sm">
            {selectedNote && (
              <>
                <ActionIcon variant="subtle" aria-label="Удалить">
                  <TbTrash />
                </ActionIcon>
                <ActionIcon onClick={handleEdit} variant="subtle" aria-label="Редактировать">
                  {isEditing ? <TbDeviceFloppy /> : <TbEdit />}
                </ActionIcon>
              </>
            )}
          </Flex>
          <Flex align="center" gap="md">
            <TextInput
              placeholder="Поиск заметок..."
              variant="filled"
              radius="md"
              size="sm"
              leftSection={<TbSearch size="1rem" />}
              value={searchQuery}
              style={{ width: 200 }}
              onChange={handleSearch}
            />

            {user && (
              <Flex align="center" gap="sm">
                <Text fw={500}>{user.name}</Text>
                <ActionIcon variant="subtle" onClick={handleLogout}>
                  <TbLogout />
                </ActionIcon>
              </Flex>
            )}
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" withBorder>
        <Flex justify="center" mb="sm">
          <ActionIcon
            onClick={handleCreateNewNote}
            bg="dark.6"
            style={{
              width: '60%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="lg"
          >
            <TbPlus size="1.5rem" />
          </ActionIcon>
        </Flex>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          filtredNotes.map(([id, { title, content, createdAt }]) => {
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
        {isCreating ? (
          <NoteEditor
            id=""
            selectedNote={{ title: '', content: '' }}
            setIsCreating={setIsCreating}
          />
        ) : selectedNote ? (
          isEditing ? (
            <NoteEditor id={selectedNoteId!} selectedNote={selectedNote} />
          ) : (
            <NoteViewer
              title={selectedNote.title}
              content={selectedNote.content}
              createdAt={selectedNote.createdAt}
            />
          )
        ) : (
          <NotePlaceholder />
        )}
      </AppShell.Main>
    </AppShell>
  );
};
