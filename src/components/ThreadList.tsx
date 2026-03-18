import { Stack, Text } from "@mantine/core";
import { ThreadCard } from "./ThreadCard";
import { useEffect, useTransition } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";

/**
 * Retrieves a list of Chat Threads from the store and displays them.
 */
export const ThreadList = observer(() => {
  const { chatThreadStore } = useStores();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await chatThreadStore.fetchThreadList();
    });
  }, [chatThreadStore]);

  const renderThreads = () => {
    const list = chatThreadStore?.threadList ?? [];

    if (isPending) {
      return <Text>...Loading threads...</Text>
    }

    return list.map((val) => (
      <ThreadCard
        key={val.id} meatballId={val.meatballId ?? ""}
        name={val.name}
        id={val.id}
        modelName={val.modelName}
        createdTimestamp={val.createdTimestamp} />
    ));
  };

  return (
    <Stack>
      {renderThreads()}
    </Stack>
  );
});
