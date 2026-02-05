import { Card, Text } from "@mantine/core";
import Markdown from 'react-markdown'

type ChatCardProps = {
  message: string,
  role: string,
};

/**
 * Displays the name, created date, and control buttons for a single thread in a card form.
 */
export const ChatCard = ({ message, role }: ChatCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section style={{ paddingLeft: "10px", paddingTop: "10px" }}>
        <Text size="sm" truncate="end">{role === "user" ? "You" : "EM"}</Text>
      </Card.Section>

      <Card.Section style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Markdown>{message}</Markdown>
      </Card.Section>

    </Card>
  );
};
