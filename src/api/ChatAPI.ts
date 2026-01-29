import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

/**
 * 
 * @param message 
 * @param threadId 
 * @returns 
 */
export async function sendChatRequest(message: string, threadId: string) {
  try {
    const resp = await axios.post(
      `${apiUrl}/chat/send`, {
        message: message,
        threadId: threadId,
      }
    );
    
    if(resp.status !== 200) {
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