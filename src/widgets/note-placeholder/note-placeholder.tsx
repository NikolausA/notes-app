import { Paper, Stack, Text } from '@mantine/core';

export const NotePlaceholder = () => {
  return (
    <Paper withBorder p="md" radius="md" bg="dark.6">
      <Stack align="center" justify="center" h="100%">
        <Text size="xl" fw={500}>
          Выберите заметку слева
        </Text>
        <Text size="sm" c="dimmed">
          Или создайте новую
        </Text>
      </Stack>
    </Paper>
  );
};
