import { Button, Text } from "@mantine/core"
import { useTransition } from "react";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";

/**
 * Displays a button allowing for creating a new ChatThread. Once the thread is created,
 * it is navigated to immediately.
 */
export const NewThreadButton = observer(() => {
  const [isPending, startTransition] = useTransition();
  const { chatThreadStore } = useStores();
  const navigate = useNavigate();

  const handleNewThreadButton = () => {
    startTransition(async () => {
      const resp: ChatThreadDetailDTO | undefined = await chatThreadStore.createNewChatThread("New Thread");

      if (resp) {
        navigate(`/chat/${resp.id}`);
      }
      else {
        alert("Unable to load the new Chat Thread.");
      }
    });
  };

  const renderButton = () => {
    if (isPending) {
      return <Text>...Loading...</Text>
    }

    return <Button onClick={handleNewThreadButton}>New Thread</Button>;
  };

  return (
    <>
      {renderButton()}
    </>
  );
});