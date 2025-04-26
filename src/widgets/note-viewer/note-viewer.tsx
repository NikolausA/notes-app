import { format } from 'date-fns';
import { marked } from 'marked';
import { Paper, Stack, Text } from '@mantine/core';
import { Note } from '../../shared';

export const NoteViewer = ({ title, content, createdAt }: Note) => {
  return (
    <Paper>
      <Stack>
        <Text fw={700} size="xl">
          {title}
        </Text>
        <Text size="xs" c="dimmed">
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
        <div>
          dangerouslySetInnerHTML={{ __html: marked(content) }}
          style={{ marginTop: 16 }}
        </div>
      </Stack>
    </Paper>
  );
};
