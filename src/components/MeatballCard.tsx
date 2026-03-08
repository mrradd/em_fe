import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { useStores } from "../hooks/useStores";
import { useEffect, useState } from "react";
import { DeleteModal } from "./DeleteModal";

type MeatballCardProps = {
  id: string, //uuid
  name: string,
};

/**
 * Displays the name, and control buttons for a single meatball in a card form. When the
 * Meatball is 'viewed', its color changes.
 */
export const MeatballCard = observer(({ id, name }: MeatballCardProps) => {
  const { meatballStore } = useStores();
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const [deleteModalOpened, deleteModalhandlers] = useDisclosure(false);

  useEffect(() => {
    setIsSelected(meatballStore.selectedMeatballId === id);
  }, [meatballStore.selectedMeatballId, id]);

  const deletePressed = () => {
    deleteModalhandlers.open();
  };

  const deleteModalOnClose = () => {
    deleteModalhandlers.close();
  };

  const doDeletion = async (): Promise<boolean> => {
    return await meatballStore.deleteThreadById(id);
  };

  const viewPressed = () => {
    meatballStore.setSelectedThreadId(id);
    navigate(`/meatball/${id}`);
  };

  return (
    <>
      <DeleteModal
        id={id}
        isOpened={deleteModalOpened}
        onCancel={deleteModalOnClose}
        deleteFn={doDeletion}
        name={name} />

      <Card className={isSelected ? "selected_meatball" : ""} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Flex
            mih={10}
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap">
            <Text size="lg">{name}</Text>
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
            <Button onClick={deletePressed}>Delete</Button>
            <Button onClick={viewPressed}>View</Button>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
});
