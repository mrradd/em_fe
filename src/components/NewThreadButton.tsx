import { Button, Text } from "@mantine/core"
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import type { ChatThread } from "../models/ChatThread";

/**
 * Displays a button allowing for creating a new ChatThread. Once the thread is created,
 * it is navigated to immediately.
 */
export const NewThreadButton = observer(() => {
  const [isPending, startTransition] = useTransition();
  const { chatThreadStore, modelStore } = useStores();
  const navigate = useNavigate();

  const handleNewThreadButton = () => {
    startTransition(async () => {
      const resp: ChatThread | undefined =
        await chatThreadStore.createNewChatThread("New Thread", modelStore.models[0]);

      if (resp) {
        chatThreadStore.setSelectedThreadId(resp.id);
        navigate(`/chat/${resp.id}`);
      }
      else {
        alert("Unable to load the new Chat Thread.");
      }
    });
  };

  const renderButton = () => {
    if (isPending) {
      return <Text>...Creating thread...</Text>
    }

    return <Button onClick={handleNewThreadButton}>New Thread</Button>;
  };

  return (
    <>
      {renderButton()}
    </>
  );
});