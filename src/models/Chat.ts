export type Chat = {
  id: string, //uuid
  threadId: string, //uuid
  message: string,
  role: string,
  createdTimestamp: number, //in ms
}