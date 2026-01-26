import './App.css';
import { AppShell, BackgroundImage, Burger, NavLink, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding='md'
      header={{ height: 60 }}
      navbar={{
        width: 150,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Text c='white'>Electric Meatball</Text>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom='sm'
          size='sm'
          color='white'
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack>
          <NavLink
            href='/home'
            label='Home'
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
        </Routes>
      </AppShell.Main>
    </AppShell >
  );
}

export default App;