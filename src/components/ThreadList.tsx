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
    const list = Array.isArray(chatThreadStore.threadList) ? chatThreadStore.threadList : [];

    if (isPending) {
      return <Text>...Loading...</Text>
    }

    return list.map((val) => (
      <ThreadCard key={val.id} name={val.name} id={val.id} createdTimestamp={val.createdTimestamp} />
    ));
  };

  return (
    <Stack>
      {renderThreads()}
    </Stack>
  );
});
