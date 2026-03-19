export type UpdateChatThreadRequestDTO = {
  id: string, //uuid
  newThreadName?: string,
  newMeatballId?: string,
  modelName: string,
};