import { Modal } from "@mantine/core";
import { observer } from "mobx-react-lite";

type DeleteThreadModalProps = {
  threadId: string,
  isOpened: boolean,
  onClose: () => void,
};

/**
 * Modal that, upon confirmation, sends a delete request to the API for the given threadId.
 */
export const DeleteThreadModal = observer(({ threadId, isOpened, onClose }: DeleteThreadModalProps) => {
  return (
    <Modal opened={isOpened} onClose={onClose} title={"Delete Thread?"} centered>
      derp
    </Modal>
  );
});