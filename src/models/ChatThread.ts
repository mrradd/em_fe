import type { Chat } from "./Chat";

export type ChatThread = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  meatballId: string, //uuid
  chats: Chat[],
}