import axios from "axios";
import type { ChatThreadDTO } from "../dtos/ChatThreadDTO";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import type { ChatDTO } from "../dtos/ChatDTO";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export class ChatAPI {

  /**
   * Calls the API to create a new chat thread with the provided thread name.
   * @param newThreadName The name to assign to the new chat thread.
   * @returns The created chat thread details, or `undefined` if the request fails.
   */
  static async createNewChatThread(newThreadName: string): Promise<ChatThreadDetailDTO | undefined> {
    try {
      const resp = await axios.post(
        `${apiUrl}/chat/thread/create`, {
        threadName: newThreadName,
      });

      if (resp.status !== 200) {
        console.warn(`sendChat: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  };

  /**
   * Calls the API to fetch all chat threads.
   * @returns The list of chat threads, or `undefined` if the request fails.
   */
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

  static async getThreadDetails(threadId: string): Promise<ChatThreadDetailDTO | undefined> {
    try {
      const resp = await axios.get(
        `${apiUrl}/chat/thread/${threadId}/detail`
      );

      if (resp.status !== 200) {
        console.warn(`getThreadDetails: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  }

  /**
   * Calls the API to send a chat message for the given thread.
   * @param message The message content to send.
   * @param threadId The ID of the chat thread to send the message to.
   * @returns The LLM response to the sent message, or `undefined` if the request fails.
   */
  static async sendChatRequest(message: string, threadId: string): Promise<ChatDTO | undefined> {
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

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  };
}
