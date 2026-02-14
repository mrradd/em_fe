import { Button, Group, Loader, Modal, Space, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useTransition } from "react";
import { useStores } from "../hooks/useStores";
import { useNavigate } from "react-router-dom";

type DeleteThreadModalProps = {
  threadId: string,
  name: string,
  isOpened: boolean,
  onClose: () => void,
};

/**
 * Modal that, upon confirmation, sends a delete request to the API for the given threadId.
 * After a successful deletion, the thread list is fetched again from the backend, and the chat page
 * is navigated away from.
 */
export const DeleteThreadModal = observer(({ name, threadId, isOpened, onClose }: DeleteThreadModalProps) => {
  const [isPending, confirmTransition] = useTransition();
  const { chatThreadStore } = useStores();
  const navigate = useNavigate();

  const confirmPressed = () => {
    confirmTransition(async () => {
      const isDeleted: boolean = await chatThreadStore.deleteThreadById(threadId);

      if (isDeleted) {
        /** TODO CH  NAVIGATE TO THE HOME PAGE AFTER DELETION. THIS IS TEMPORARY UNTIL I FIND A BETTER SOLUTION.
            CHECK IF WE ARE ON THE PAGE OF THE CHAT BEING DELETED. IF SO, NAVIGATE AWAY, ELSE DO NOTHING. */
        navigate("/");
      }
      else {
        //TODO CH  REPLACE WITH PROPER NOTIFICATION.
        alert(`Failed to delete ${name}`);
      }
    });
  };

  const cancelPressed = () => {
    onClose();
  };

  return (
    <Modal opened={isOpened} onClose={onClose} title={`Delete Thread "${name}"`} centered>
      {isPending && <Loader color="blue" />}
      <Text>Are you sure you want to delete "{name}"?</Text>
      <Space h="lg" />
      <Group grow>
        <Button onClick={confirmPressed}>Confirm</Button>
        <Button onClick={cancelPressed}>Cancel</Button>
      </Group>
    </Modal>
  );
});