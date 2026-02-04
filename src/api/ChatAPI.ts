import axios from "axios";
import type { ChatThreadDTO } from "../dtos/ChatThreadDTO";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export class ChatAPI {

  static async createNewChatThread(threadName: string) {
    try {
      const resp = await axios.post(
        `${apiUrl}/chat/thread/create`, {
        threadName: threadName,
      });

      if (resp.status !== 200) {
        console.warn(`sendChat: code ${resp.status}`);
        return undefined;
      }

      return resp.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  };

  static async getThreadList(): Promise<ChatThreadDTO[] | undefined> {
    try {
      const resp = await axios.get(
        `${apiUrl}/chat/thread/all`
      );

      if (resp.status !== 200) {
        console.warn(`getThreadList: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data.chatThreads;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  }

  static async sendChatRequest(message: string, threadId: string) {
    try {
      const resp = await axios.post(
        `${apiUrl}/chat/send`, {
        message: message,
        threadId: threadId,
      });

      if (resp.status !== 200) {
        console.warn(`sendChat: code ${resp.status}`);
        return undefined;
      }

      return resp.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  };
}