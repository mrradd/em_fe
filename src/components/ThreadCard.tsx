import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { msToDate } from "../utils/RadUtils";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { DeleteThreadModal } from "./DeleteThreadModal";
import { useDisclosure } from "@mantine/hooks";
import { EditThreadModal } from "./EditThreadModal";
import { useStores } from "../hooks/useStores";
import { useEffect, useState } from "react";

type ThreadCardProps = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
};

/**
 * Displays the name, created date, and control buttons for a single thread in a card form. When the
 * Chat Thread is 'viewed', its color changes.
 */
export const ThreadCard = observer(({ id, name, createdTimestamp }: ThreadCardProps) => {
  const { chatThreadStore } = useStores();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const [deleteModalOpened, deleteModalhandlers] = useDisclosure(false);
  const [editModalOpened, editModalhandlers] = useDisclosure(false);

  useEffect(() => {
    console.log("herp derp");
    setIsSelected(chatThreadStore.selectedThreadId === id);
  }, [chatThreadStore.selectedThreadId, id]);

  const deletePressed = () => {
    deleteModalhandlers.open();
  };

  const deleteModalOnClose = () => {
    deleteModalhandlers.close();
  };

  const editPressed = () => {
    editModalhandlers.open();
  };

  const editModalOnClose = () => {
    editModalhandlers.close();
  };

  const viewPressed = () => {
    chatThreadStore.setSelectedThreadId(id);
    navigate(`/chat/${id}`);
  };

  return (
    <>
      <EditThreadModal threadId={id} isOpened={editModalOpened} onClose={editModalOnClose} name={name} />
      <DeleteThreadModal threadId={id} isOpened={deleteModalOpened} onClose={deleteModalOnClose} name={name} />

      <Card className={isSelected ? "selected_thread" : ""} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Flex
            mih={10}
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap">
            <Text size="lg">{name}</Text>
            <Text size="sm" truncate="end">Created: {msToDate(createdTimestamp)}</Text>
          </Flex>
        </Card.Section>

        <Card.Section>
          <Group
            mih={50}
            gap="lg"
            justify="center"
            align="center"
            wrap="nowrap"
          >
            <Button onClick={editPressed}>Edit</Button>
            <Button onClick={deletePressed}>Delete</Button>
            <Button onClick={viewPressed}>View</Button>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
});
