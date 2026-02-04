import { Button, Card, Flex, Text } from "@mantine/core";
import { msToDate } from "../utils/RadUtils";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

type ChatCardProps = {
  id: string, //uuid
  threadId: string, //uuid
  message: string,
  role: string,
  createdTimestamp: number, //in ms
};

/**
 * Displays the name, created date, and control buttons for a single thread in a card form.
 */
export const ChatCard = ({ id, threadId, message, role, createdTimestamp }: ChatCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Text size="sm" truncate="end">{role === "user" ? "You" : "EM"}</Text>
      </Card.Section>

      <Card.Section>
        <Text>{message}</Text>
      </Card.Section>
    </Card>
  );
};
