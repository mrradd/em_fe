import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { msToDate } from "../utils/RadUtils";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { DeleteThreadModal } from "./DeleteThreadModal";
import { useDisclosure } from "@mantine/hooks";

type ThreadCardProps = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
};

/**
 * Displays the name, created date, and control buttons for a single thread in a card form.
 */
export const ThreadCard = observer(({ id, name, createdTimestamp }: ThreadCardProps) => {
  const navigate = useNavigate();
  const [deleteModalOpened, deleteModalhandlers] = useDisclosure(false);

  const deletePressed = () => {
    return deleteModalhandlers.open();
  };

  const editPressed = useCallback(() => {
    console.log("Edit pressed");
  }, []);

  const viewPressed = useCallback(() => {
    navigate(`/chat/${id}`);
  }, [id, navigate]);

  return (
    <>
      <DeleteThreadModal threadId={id} isOpened={deleteModalOpened} onClose={() => { deleteModalhandlers.toggle() }}></DeleteThreadModal>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
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
