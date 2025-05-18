import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Paper, Stack, Text } from '@mantine/core';
import { NoteData } from '../../shared';

export const NoteCard = ({ title, content, createdAt }: NoteData) => {
  return (
    <Paper withBorder shadow="sm" p="md" radius="md" bg="dark.6" mt={10}>
      <Stack gap="xs">
        <Text fw={700} size="xl" truncate="end">
          {title}
        </Text>
        <Text size="md" c="dimmed" lineClamp={2}>
          {content}
        </Text>
        <Text size="xs" style={{ alignSelf: 'flex-end' }}>
          {createdAt ? format(new Date(createdAt), 'dd.MM.yyyy HH:mm', { locale: ru }) : ''}
        </Text>
      </Stack>
    </Paper>
  );
};
