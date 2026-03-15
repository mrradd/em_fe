import { Button, Text } from "@mantine/core"
import { useTransition } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useUiHook } from "../hooks/useUiHook";

/**
 * Displays a button allowing for creating a new Meatball. Once the Meatball is created,
 * the Customize Meatball page is loaded with the new Meatball.
 */
export const NewMeatballButton = observer(() => {
  const [isPending, startTransition] = useTransition();
  const { meatballStore } = useStores();
  const { resetAllSelectedIds } = useUiHook();

  const handleNewMeatballButton = () => {
    startTransition(async () => {
      resetAllSelectedIds();
      meatballStore.createMeatball("New Meatball");
    });
  };

  const renderButton = () => {
    if (isPending) {
      return <Text>...Creating meatball...</Text>
    }

    return <Button onClick={handleNewMeatballButton}>New Meatball</Button>;
  };

  return (
    <>
      {renderButton()}
    </>
  );
});