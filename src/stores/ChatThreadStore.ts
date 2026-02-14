import { makeAutoObservable } from "mobx";
import type { ChatThread } from "../models/ChatThread";
import { ChatAPI } from "../api/ChatAPI";
import type { ChatThreadDTO } from "../dtos/ChatThreadDTO";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import type { UpdateChatThreadRequestDTO } from "../dtos/UpdateChatThreadRequestDTO";

export class ChatThreadStore {
  threadList = [] as ChatThread[];
  selectedThreadId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Calls the API to create a new chat thread by name and inserts it into the store.
   * @param newThreadName The name for the new chat thread.
   * @returns The new Chat Thread on success or `undefined` otherwise.
   */
  async createNewChatThread(newThreadName: string): Promise<ChatThread | undefined> {
    const resp: ChatThreadDetailDTO | undefined = await ChatAPI.createNewChatThread(newThreadName);

    if (resp) {
      const newChatThread = {
        id: resp?.id,
        name: resp?.name,
        chats: resp?.chats,
        createdTimestamp: resp?.createdTimestamp,
      } as ChatThread;

      this.insertChatThread(newChatThread);

      return newChatThread
    }

    return undefined;
  }

  /**
   * Deletes a thread by id via the API and removes it from the store on success.
   * @param threadId The thread id to delete.
   * @returns True when the delete succeeds; otherwise false.
   */
  async deleteThreadById(threadId: string): Promise<boolean> {
    const success: boolean = await ChatAPI.deleteThread(threadId);

    if (success) {
      this.threadList = this.threadList.filter((thread: ChatThread) => {
        return thread.id !== threadId;
      });
    }

    return success;
  }

  /**
   * Fetches the thread list from the API, maps DTOs to store threads, and replaces the store list.
   */
  async fetchThreadList() {
    const threadDtos: ChatThreadDTO[] | undefined = await ChatAPI.getThreadList();

    if (threadDtos) {
      const threads = threadDtos.map((thread: ChatThreadDTO) => {
        return {
          id: thread.id,
          name: thread.name,
          createdTimestamp: thread.createdTimestamp,
          chats: [],
        };
      });

      this.setThreadList(threads);
    }
  }

  /**
   * Sends an update request for a thread and updates the matching thread in the store.
   * @param threadId The id of the thread to update.
   * @param newName The new name to apply to the thread.
   * @returns The updated thread if the request succeeds; otherwise `undefined`.
   */
  async updateThread(threadId: string, newName: string): Promise<ChatThread | undefined> {
    const updatedThread: ChatThreadDTO | undefined = await ChatAPI.updateThread({
      id: threadId,
      newThreadName: newName,
    } as UpdateChatThreadRequestDTO);

    if (!updatedThread) {
      return undefined;
    }

    let updatedStoreThread: ChatThread | undefined = undefined;

    const tempThreadList = this.threadList.slice();
    let updatedIndex = -1;
    for (let i = 0; i < tempThreadList.length; i += 1) {
      const thread = tempThreadList[i];
      if (thread.id !== threadId) {
        continue;
      }

      updatedStoreThread = {
        ...thread,
        name: updatedThread.name,
      };

      updatedIndex = i;
      break;
    }

    if (updatedIndex !== -1 && updatedStoreThread) {
      tempThreadList[updatedIndex] = updatedStoreThread;
      this.threadList = tempThreadList;
    }

    return updatedStoreThread;
  }

  insertChatThread(chatThread: ChatThread) {
    this.threadList = this.threadList.concat(chatThread);
  }

  setThreadList(threads: ChatThread[]) {
    this.threadList = threads;
  }

  setSelectedThreadId(threadId: string) {
    this.selectedThreadId = threadId;
  }
}
