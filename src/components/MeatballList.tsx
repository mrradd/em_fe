import { Container, Stack, Text } from "@mantine/core";
import { useEffect, useTransition } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { MeatballCard } from "./MeatballCard";

/**
 * Retrieves a list of Chat Threads from the store and displays them.
 */
export const MeatballList = observer(() => {
  const { meatballStore } = useStores();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await meatballStore.fetchMeatballs();
    });
  }, [meatballStore]);

  const renderMeatballs = () => {
    const list = meatballStore?.meatballList ?? [];

    if (isPending) {
      return <Text>...Loading meatballs...</Text>
    }

    return list.map((val) => (
      <MeatballCard key={val.id} name={val.name} id={val.id} />
    ));
  };

  return (
    <Stack style={{ minWidth: "25%", width: "25%", overflowY: "scroll", height: "85vh", padding: "10px"}} >
      {renderMeatballs()}
    </Stack>
  );
});
