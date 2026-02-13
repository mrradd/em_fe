import { Modal } from "@mantine/core";
import { observer } from "mobx-react-lite";

type EditThreadModalProps = {
  threadId: string,
  isOpened: boolean,
  name: string,
  onClose: () => void,
};

/**
 * Modal that allows for editing data about the thread, initially the name.
 */
export const EditThreadModal = observer(({ threadId, name, isOpened, onClose }: EditThreadModalProps) => {
  return (
    <Modal opened={isOpened} onClose={onClose} title={`Edit '${name}'`} centered>
      {threadId}
    </Modal>
  );
});