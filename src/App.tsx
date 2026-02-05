import './App.css';
import { AppShell, BackgroundImage, Burger, Container, NavLink, Space, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ThreadList } from './components/ThreadList';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ChatPage } from './pages/ChatPage';
import { NewThreadButton } from './components/NewThreadButton';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding='md'
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Text c='black'>Electric Meatball</Text>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom='sm'
          size='sm'
          color='black'
        />
      </AppShell.Header>

      <AppShell.Navbar>

        <Stack>
          <Space />
          <Container>
            <NewThreadButton />
          </Container>
          <ThreadList />
        </Stack>

      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chat/:threadId' element={<ChatPage />}></Route>
        </Routes>
      </AppShell.Main>
    </AppShell >
  );
}

export default App;