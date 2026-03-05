import { Button, Text } from "@mantine/core"
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";

/**
 * Displays a button allowing for creating a new Meatball. Once the Meatball is created,
 * the Customize Meatball page is loaded with the new Meatball.
 */
export const NewThreadButton = observer(() => {
  const [isPending, startTransition] = useTransition();
  const { meatballStore } = useStores();
  const navigate = useNavigate();

  const handleNewMeatballButton = () => {
    startTransition(async () => {
      
    });
  };

  const renderButton = () => {
    if (isPending) {
      return <Text>...Loading meatball...</Text>
    }

    return <Button onClick={handleNewMeatballButton}>New Meatball</Button>;
  };

  return (
    <>
      {renderButton()}
    </>
  );
});