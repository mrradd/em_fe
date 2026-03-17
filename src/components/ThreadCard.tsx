import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { msToDate } from "../utils/RadUtils";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { DeleteThreadModal } from "./DeleteThreadModal";
import { useDisclosure } from "@mantine/hooks";
import { EditThreadModal } from "./EditThreadModal";
import { useStores } from "../hooks/useStores";
import { useEffect, useMemo, useState } from "react";
import { useUiHook } from "../hooks/useUiHook";

type ThreadCardProps = {
  id: string, //uuid
  name: string,
  meatballId: string,
  createdTimestamp: number, //in ms.
};

/**
 * Displays the name, created date, and control buttons for a single thread in a card form. When the
 * Chat Thread is 'viewed', its color changes.
 */
export const ThreadCard = observer(({ id, meatballId, name, createdTimestamp }: ThreadCardProps) => {
  //TODO CH. FIND A WAY TO UPDATE THE ASSIGNED MEATBALL IF THE MEATBALL WAS CHANGED. E.G. RIGHT NOW MEATBALL NAME DOES NOT UPDATE ON THE THREAD CARD.
  const { chatThreadStore, meatballStore } = useStores();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const [deleteModalOpened, deleteModalhandlers] = useDisclosure(false);
  const [editModalOpened, editModalhandlers] = useDisclosure(false);
  const { resetAllSelectedIds } = useUiHook();

  useEffect(() => {
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
    resetAllSelectedIds();
    chatThreadStore.setSelectedThreadId(id);
    navigate(`/chat/${id}`);
  };

  const meatballName = useMemo(() => {
    return meatballStore.getMeatballByID(meatballId)?.name ?? "NONE";
  }, [meatballStore, meatballId]);

  const dateTime = useMemo(() => {
    return msToDate(createdTimestamp)
  }, [createdTimestamp]);

  return (
    <>
      <EditThreadModal threadId={id} meatballId={meatballId} isOpened={editModalOpened} onClose={editModalOnClose} name={name} />
      <DeleteThreadModal threadId={id} isOpened={deleteModalOpened} onClose={deleteModalOnClose} name={name} />

      <Card className={isSelected ? "selected_thread" : ""} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap">
            <Text size="lg">{name}</Text>
            <Text size="sm" truncate="end">Meatball: {meatballName}</Text>
            <Text size="sm" truncate="end">Created: {dateTime}</Text>
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
