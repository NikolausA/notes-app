import { format } from 'date-fns';
import { marked } from 'marked';
import { Paper, Stack, Text, TypographyStylesProvider } from '@mantine/core';
import { Note } from '../../shared';
import styles from './noteViewer.module.css';

export const NoteViewer = ({ title, content, createdAt }: Note) => {
  return (
    <Paper>
      <Stack>
        <Text fw={700} size="xl">
          {title}
        </Text>

        <TypographyStylesProvider>
          <div
            className={styles.typoContent}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
            style={{ marginTop: 16 }}
          />
        </TypographyStylesProvider>
        <Text size="xs" c="dimmed">
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
      </Stack>
    </Paper>
  );
};
