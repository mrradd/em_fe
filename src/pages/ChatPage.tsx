import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useReducer, useRef, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import { ChatAPI } from "../api/ChatAPI";
import { ChatCard } from "../components/ChatCard";
import type { ChatDTO } from "../dtos/ChatDTO";
import { Affix, Button, Stack, Text, Textarea, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { uiStore } from "../stores/TheUiStore";

type ChatPageState = {
  chatThread: ChatThreadDetailDTO,
  textValue: string,
};

const initialState: ChatPageState = {
  chatThread: {} as ChatThreadDetailDTO,
  textValue: "",
}

function reducer(state: ChatPageState, action: any) {
  switch (action.type) {
    case "setChatThread":
      return {
        ...state,
        chatThread: action.chatThread as ChatThreadDetailDTO,
      }
    case "updateTextValue":
      return {
        ...state,
        textValue: action.textValue as string,
      }
    case "appendChats": {
      const existingChats = state.chatThread?.chats ?? [];
      return {
        ...state,
        chatThread: {
          ...state.chatThread,
          chats: [...existingChats, ...(action.chats as ChatDTO[])],
        },
      };
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
  const [isSendPending, startSendTransition] = useTransition();
  const params = useParams();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [affixRect, setAffixRect] = useState<{ left: number; width: number } | null>(null);
  const theme = useMantineTheme();
  const smBreakpoint = typeof theme.breakpoints.sm === "number"
    ? `${theme.breakpoints.sm}px`
    : theme.breakpoints.sm;
  const isSmallScreen = useMediaQuery(`(max-width: ${smBreakpoint})`);
  const hideTextarea = isSmallScreen && uiStore.navbarOpened;

  useLayoutEffect(() => {
    const updateAffixRect = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setAffixRect({ left: rect.left, width: rect.width });
    };

    updateAffixRect();

    const handleResize = () => updateAffixRect();
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => updateAffixRect());
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

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

  const renderButton = () => {
    if (isSendPending) {
      return (<Button>...THINKING...</Button>);
    }

    return (<Button onClick={sendChat}>Send</Button>);
  };

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

  const sendChat = () => {
    startSendTransition(async () => {
      /** 
       * This user chat is loaded into the list after a send. Its id and date are dummy data
       * and do not represent the final data from the database. It is mearly a placeholder until
       * a proper load happens.
       */
      const userChat: ChatDTO = {
        id: `local-${Date.now()}`,//temporary id
        threadId: state.chatThread.id,
        message: state.textValue,
        role: "user",
        createdTimestamp: Date.now(),//temporary timestamp
      };

      dispatch({ type: "appendChats", chats: [userChat] });
      dispatch({ type: "updateTextValue", textValue: "" });

      const resp: ChatDTO | undefined = await ChatAPI.sendChatRequest(state.textValue, state.chatThread.id);

      if (resp) {
        dispatch({ type: "appendChats", chats: [resp] });
      }
    });
  };

  return (
    <>
      <div ref={contentRef}>
        <Stack style={{ paddingBottom: "200px" }}>
          {renderChats()}
        </Stack>
      </div>
      <Affix
        position={{ bottom: 0 }}
        withinPortal={false}
        style={{
          left: affixRect ? `${affixRect.left}px` : 0,
          width: affixRect ? `${affixRect.width}px` : "100%",
          right: "auto",
        }}
      >
        {!hideTextarea && (
          <div style={{ padding: "12px", background: "#fff", borderTop: "1px solid #e9ecef" }}>
            <Stack>
              <Textarea value={state.textValue} rows={5} onChange={(e) => {
                dispatch({ type: "updateTextValue", textValue: e.target.value })
              }} />
              {renderButton()}
            </Stack>
          </div>
        )}
      </Affix>
    </>
  );
});
