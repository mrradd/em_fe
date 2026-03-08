import type { Meatball } from "../../models/Meatball";

export type MeatballDTO = {
  id: string, //uuid
  name: string,
  description: string,
  instructions: string,
  createdTimestamp: number, //in ms.
  editedTimestamp?: number, //in ms.
}

export function toMeatball(dto: MeatballDTO): Meatball {
  return {
    id: dto?.id || "",
    name: dto?.name || "",
    description: dto?.description || "",
    instructions: dto?.instructions || "",
    createdTimestamp: dto?.createdTimestamp || 0,
    editedTimestamp: dto?.editedTimestamp || 0,
  } as Meatball;
}