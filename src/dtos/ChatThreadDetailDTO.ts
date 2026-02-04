import type { ChatDTO } from "./ChatDTO";

export type ChatThreadDetailDTO = {
  id: string, //uuid
  name: string,
  created_timestamp: number, //in ms.
  chats: ChatDTO[],
}