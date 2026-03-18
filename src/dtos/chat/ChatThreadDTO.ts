export type ChatThreadDTO = {
  id: string, //uuid
  name: string,
  meatballId: string, //uuid
  modelName: string,
  createdTimestamp: number, //in ms.
}