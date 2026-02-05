import { observer } from "mobx-react-lite";
import { useEffect, useReducer, useTransition } from "react";
import { useParams } from "react-router-dom";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import { ChatAPI } from "../api/ChatAPI";
import { ChatCard } from "../components/ChatCard";
import type { ChatDTO } from "../dtos/ChatDTO";
import { Stack, Text } from "@mantine/core";

type ChatPageState = {
  chatThread: ChatThreadDetailDTO,
};

const initialState: ChatPageState = {
  chatThread: {} as ChatThreadDetailDTO,
}

function reducer(state: ChatPageState, action: any) {
  switch (action.type) {
    case "setChatThread":
      return {
        ...state,
        chatThread: action.chatThread as ChatThreadDetailDTO,
      }
    default:
      console.log(`Reducer action '${action}' is not valid.`);
      return state;
  }
}

/**
 * Renders all chats for a single thread.
 */
export const ChatPage = observer(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  useEffect(() => {
    startTransition(async () => {
      if (!params.threadId) {
        console.warn("No threadId given.")
        return;
      }

      const resp: ChatThreadDetailDTO | undefined = await ChatAPI.getThreadDetails(params.threadId);

      if (!resp) {
        console.warn("No proper ChatThreadDetailDTO returned.");
        return;
      }

      dispatch({ type: "setChatThread", chatThread: resp });
    });
  }, [params.threadId]);

  const renderChats = () => {
    if (isPending) {
      return <Text>...LOADING...</Text>
    }

    if (state.chatThread?.chats?.length === 0) {
      return <Text>No chats in this thread yet.</Text>
    }

    return state.chatThread?.chats?.map((chat: ChatDTO) => {
      return (
        <ChatCard
          key={chat.id}
          message={chat.message}
          role={chat.role} />
      );
    });
  };

  return (
    <Stack>
      {renderChats()}
    </Stack>
  );
});
