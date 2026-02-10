import type { Chat } from "./Chat";

export type ChatThread = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  chats: Chat[],
}