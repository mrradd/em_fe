import { Button, Group, Loader, Modal, Space, TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useState, useTransition } from "react";
import { useStores } from "../hooks/useStores";

type EditThreadModalProps = {
  threadId: string,
  isOpened: boolean,
  name: string,
  onClose: () => void,
};

/**
 * Modal that allows for editing data about the thread, initially just the name.
 */
export const EditThreadModal = observer(({ threadId, name, isOpened, onClose }: EditThreadModalProps) => {
  const [newName, setNewName] = useState(name ?? "");
  const [isPending, confirmTransition] = useTransition();
  const { chatThreadStore } = useStores();

  const confirmPressed = () => {
    confirmTransition(async () => {
      await chatThreadStore.updateThread(threadId, newName);
      onClose();
    });
  };

  const cancelPressed = () => {
    onClose();
  };

  return (
    <Modal opened={isOpened} onClose={onClose} title={`Edit '${name}'`} centered>
      {isPending && <Loader color="blue" />}
      <TextInput
        value={newName}
        label="New Name"
        onChange={(e) => setNewName(e.currentTarget.value)}
      />
      <Space h="lg" />
      <Group grow>
        <Button onClick={confirmPressed}>Confirm</Button>
        <Button onClick={cancelPressed}>Cancel</Button>
      </Group>
    </Modal>
  );
});
