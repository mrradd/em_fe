import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useReducer, useRef, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import type { ChatThreadDetailDTO } from "../dtos/ChatThreadDetailDTO";
import { ChatAPI } from "../api/ChatAPI";
import { ChatCard } from "../components/ChatCard";
import type { ChatDTO } from "../dtos/ChatDTO";
import { Affix, Stack, Text, Textarea, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { uiStore } from "../stores/uiStore";

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
    <>
      <div ref={contentRef}>
        <Stack style={{ paddingBottom: "96px" }}>
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
            <Textarea />
          </div>
        )}
      </Affix>
    </>
  );
});
