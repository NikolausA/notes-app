import { format } from 'date-fns';
import { Paper, Stack, Text } from '@mantine/core';
import { Note } from '../../shared';

export const NoteCard = ({ title, content, createdAt }: Note) => {
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
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
      </Stack>
    </Paper>
  );
};
