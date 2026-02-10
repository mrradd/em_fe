/* eslint-disable react-refresh/only-export-components */
import './App.css';
import { AppShell, Burger, Button, Divider, Space, Stack, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ThreadList } from './components/ThreadList';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ChatPage } from './pages/ChatPage';
import { NewThreadButton } from './components/NewThreadButton';
import { uiStore } from './stores/TheUiStore';

/**
 * The main entry point for the application.
 */
export const App = observer(() => {
  const navigate = useNavigate();
  const opened = uiStore.navbarOpened;

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
          onClick={uiStore.toggleNavbar}
          hiddenFrom='sm'
          size='sm'
          color='black'
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Space h="sm" />
        <Stack style={{ marginLeft: "10px", marginRight: "10px" }}>
          <Button onClick={() => { navigate("/") }}>Home</Button>
          <NewThreadButton />
        </Stack>

        <Space h="sm" />
        <Divider />
        <Space h="sm" />

        <Stack style={{ overflow: "auto" }}>
          <ThreadList />
        </Stack>
        <Space h="sm" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chat/:threadId' element={<ChatPage />}></Route>
        </Routes>
      </AppShell.Main>
    </AppShell >
  );
});