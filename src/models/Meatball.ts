export type Meatball = {
  id: string, //uuid
  name: string,
  description: string,
  instructions: string,
  createdTimestamp: number, //in ms.
  editedTimestamp?: number, //in ms.
}