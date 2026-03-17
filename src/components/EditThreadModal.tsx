import { Button, Group, Loader, Modal, NativeSelect, Space, TextInput } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useStores } from "../hooks/useStores";

type EditThreadModalProps = {
  threadId: string,
  meatballId: string,
  isOpened: boolean,
  name: string,
  onClose: () => void,
};

/**
 * Modal that allows for editing data about the thread, initially just the name.
 */
export const EditThreadModal = observer(({ threadId, meatballId, name, isOpened, onClose }: EditThreadModalProps) => {
  const [newName, setNewName] = useState(name ?? "");
  const [selectedMeatballIndex, setSelectedMeatballIndex] = useState(0);
  const [isPending, confirmTransition] = useTransition();
  const { chatThreadStore, meatballStore } = useStores();

  useEffect(() => {
    console.log(meatballId);
    const meatballIndex = meatballStore.meatballList.findIndex((mb) => {
      return mb.id === meatballId;
    });

    setSelectedMeatballIndex(meatballIndex);

  }, [threadId, meatballId, meatballStore.meatballList]);

  const meatballOptionsList = useMemo(() => {
    const options = meatballStore.meatballList.map((mb, index) => {
      return { label: mb.name, value: index.toString() };
    })

    options.unshift({ label: "NONE", value: "-1" });

    return options;
  }, [meatballStore.meatballList]);

  const cancelPressed = () => {
    onClose();
  };

  const confirmPressed = () => {
    confirmTransition(async () => {
      await chatThreadStore.updateThread(
        threadId,
        newName,
        selectedMeatballIndex > -1 ? meatballStore.meatballList[selectedMeatballIndex].id : "",
      );

      onClose();
    });
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
      <NativeSelect
        label="Meatball"
        value={selectedMeatballIndex}
        data={meatballOptionsList}
        onChange={(e) => setSelectedMeatballIndex(parseInt(e.target.value))}
      />
      <Space h="lg" />
      <Group grow>
        <Button onClick={confirmPressed}>Confirm</Button>
        <Button onClick={cancelPressed}>Cancel</Button>
      </Group>
    </Modal>
  );
});