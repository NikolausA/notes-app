import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useAuth } from '../../app';

interface Credentials {
  name: string;
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [inputs, setInputs] = useState<Credentials>({
    name: '',
    email: '',
    password: '',
  });

  const { signin } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(inputs, () => {
      navigate('/');
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setInputs({ name: '', email: '', password: '' });
  };

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" w={400} mx="auto" mt="xl" bg="dark.6">
      <Title order={2} ta="center" mb="md">
        Вход в аккаунт
      </Title>

      <form onSubmit={handleSubmit} onChange={handleChange} onReset={handleReset} ref={formRef}>
        <Stack gap="md">
          <TextInput name="name" label="Имя" placeholder="Ваше имя" required />
          <TextInput name="email" label="Email" placeholder="example@mail.com" required />
          <PasswordInput name="password" label="Пароль" placeholder="Ваш пароль" required />

          <Group justify="center" mt="md">
            <Button type="submit" fullWidth>
              Войти
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
