import '@mantine/core/styles.css';

import { TbEdit, TbTrash } from 'react-icons/tb';
import { ActionIcon, AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetchNotes } from '@/entities';
import { Routering } from '../pages';
import { AppMantineProvider, AppRouter } from './';

export const App = () => {
  const [opened, { toggle }] = useDisclosure();

  const { notes, isLoading } = useFetchNotes();
  console.log(notes, isLoading);

  return (
    <AppMantineProvider>
      <AppRouter>
        <AppShell
          header={{ height: 60 }}
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
              <ActionIcon variant="subtle" aria-label="Удалить">
                <TbTrash />
              </ActionIcon>
              <ActionIcon variant="subtle" aria-label="Редактировать">
                <TbEdit />
              </ActionIcon>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md" withBorder>
            Navbar
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))}
          </AppShell.Navbar>
          <AppShell.Main pt="md">
            <Routering />
          </AppShell.Main>
        </AppShell>
      </AppRouter>
    </AppMantineProvider>
  );
};
