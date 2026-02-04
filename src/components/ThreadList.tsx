import { Stack } from "@mantine/core";
import { ThreadCard } from "./ThreadCard";
import { useEffect, useState, useTransition } from "react";
import { ChatAPI } from "../api/ChatAPI";
import type { ChatThreadDTO } from "../dtos/ChatThreadDTO";

/**
 * Retrieves a list of Chat Threads from the api and displays them.
 */
export const ThreadList = () => {
  const [threads, setThreads] = useState<ChatThreadDTO[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const respThreads: ChatThreadDTO[] | undefined = await ChatAPI.getThreadList();

      if (respThreads) {
        setThreads(respThreads);
      }
    });
  }, []);

  const renderThreads = () => {
    const list = Array.isArray(threads) ? threads : [];
    return list.map((val) => (
      <ThreadCard key={val.id} name={val.name} id={val.id} createdTimestamp={val.created_timestamp} />
    ));
  };

  return (
    <Stack>
      {renderThreads()}
    </Stack>
  );
};
