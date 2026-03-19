import type { ChatDTO } from "./ChatDTO";

export type ChatThreadDetailDTO = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  meatballId: string, //uuid
  modelName: string, //Name of the LLM model to use.
  chats: ChatDTO[],
}