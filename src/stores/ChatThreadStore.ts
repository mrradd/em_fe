import { makeAutoObservable } from "mobx";
import type { ChatThread } from "../models/ChatThread";

class ChatThreadStore {
  threadList = [] as ChatThread[];

  constructor() {
    makeAutoObservable(this);
  }

  setThreadList(threads: ChatThread[]) {
    this.threadList = threads;
  }
}

export const chatThreadStore = new ChatThreadStore();