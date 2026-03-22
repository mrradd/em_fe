import "./App.css";
import { AppShell, Burger, Button, Divider, Space, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { ThreadList } from "./components/ThreadList";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { ChatPage } from "./pages/ChatPage";
import { NewThreadButton } from "./components/NewThreadButton";
import { useStores } from "./hooks/useStores";
import { MeatballsPage } from "./pages/MeatballsPage";
import { useUiHook } from "./hooks/useUiHook";
import { MeatballList } from "./components/MeatballList";
import { NewMeatballButton } from "./components/NewMeatballButton";
import { useEffect } from "react";

/**
 * The main entry point for the application.
 */
export const App = observer(() => {
  const navigate = useNavigate();
  const { uiStore, modelStore } = useStores();
  const { resetAllSelectedIds } = useUiHook();

  useEffect(() => {
    modelStore.fetchModels();
  }, []);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !uiStore.navbarOpened },
      }}
    >
      <AppShell.Header>
        <Text c="black">Electric Meatball</Text>
        <Burger
          opened={uiStore.navbarOpened}
          onClick={uiStore.toggleNavbar}
          hiddenFrom="sm"
          size="sm"
          color="black"
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Space h="sm" />
        <Stack style={{ marginLeft: "10px", marginRight: "10px" }}>
          <Button onClick={() => {
            resetAllSelectedIds();
            navigate("/");
          }}>Home</Button>
          <NewThreadButton />
          <NewMeatballButton />
        </Stack>

        <Space h="sm" />
        <Divider />
        <Text>Meatballs</Text>
        <Space h="sm" />
        <MeatballList />

        <Divider />
        <Text>Threads</Text>
        <Space h="sm" />

        <Stack style={{ overflow: "auto", padding: "5px" }}>
          <ThreadList />
        </Stack>
        <Space h="sm" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat/:threadId" element={<ChatPage />}></Route>
          <Route path="/meatball" element={<MeatballsPage />}></Route>
          <Route path="/meatball/:id" element={<MeatballsPage />}></Route>
        </Routes>
      </AppShell.Main>
    </AppShell >
  );
});