import { makeAutoObservable } from "mobx";
import type { ChatThread } from "../models/ChatThread";
import { ChatAPI } from "../api/ChatAPI";
import type { ChatThreadDTO } from "../dtos/ChatThreadDTO";

export class ChatThreadStore {
  threadList = [] as ChatThread[];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Calls the API to create a new chat thread by name and inserts it into the store.
   * @param newThreadName The name for the new chat thread.
   */
  async createNewChatThread(newThreadName: string) {
    const newChatThread = await ChatAPI.createNewChatThread(newThreadName);

    if (newChatThread) {
      this.insertChatThread(newChatThread);
    }
  }

  /**
   * Fetches the thread list from the API, maps DTOs to store threads, and replaces the store list.
   */
  async fetchThreadList() {
    const threadDtos = await ChatAPI.getThreadList();

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

  setThreadList(threads: ChatThread[]) {
    this.threadList = threads;
  }

  insertChatThread(chatThread: ChatThread) {
    this.threadList = this.threadList.concat(chatThread);
  }
}
