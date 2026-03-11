import type { ChatDTO } from "./ChatDTO";

export type ChatThreadDetailDTO = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  meatballId: string, //uuid
  chats: ChatDTO[],
}