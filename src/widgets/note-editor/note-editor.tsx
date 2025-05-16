import { useState } from 'react';
import { Button, Group, Paper, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useAddNote, useUpdateNote } from '../../entities';
import { NoteData, useDebounce } from '../../shared';

type NoteEditorProps = {
  id: string;
  selectedNote: NoteData;
  setIsCreating?: (value: boolean) => void;
};

export const NoteEditor = ({ id, selectedNote, setIsCreating }: NoteEditorProps) => {
  const [inputs, setInputs] = useState<NoteData>({
    title: selectedNote.title,
    content: selectedNote.content,
  });

  const requestUpdateNote = useUpdateNote();
  const requestAddNote = useAddNote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  useDebounce(
    () => requestUpdateNote(id, { ...inputs, createdAt: new Date().toISOString() }),
    500,
    [inputs]
  );

  const handleSubmit = () => {
    requestAddNote({ ...inputs, createdAt: new Date().toISOString() });
    setIsCreating?.(false);
  };

  const handleClose = () => {
    setIsCreating?.(false);
  };

  const handleReset = () => {
    setInputs({ title: '', content: '' });
  };

  return (
    <Paper>
      <Title order={2} ta="center" mb="md">
        {id ? 'Редактирование заметки' : 'Новая заметка'}
      </Title>
      <Stack>
        <TextInput onChange={handleChange} name="title" value={inputs.title} />
        <Textarea onChange={handleChange} name="content" value={inputs.content} />
        {!id && (
          <Group justify="center" mt="md">
            <Button
              size="md"
              onClick={handleSubmit}
              type="submit"
              disabled={!inputs.title || !inputs.content}
            >
              Сохранить
            </Button>
            <Button
              size="md"
              onClick={handleReset}
              type="submit"
              disabled={!inputs.title && !inputs.content}
            >
              Очистить
            </Button>
            <Button size="md" onClick={handleClose} type="submit">
              Закрыть
            </Button>
          </Group>
        )}
      </Stack>
    </Paper>
  );
};
