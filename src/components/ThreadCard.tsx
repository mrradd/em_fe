import { Button, Card, Flex, Text } from "@mantine/core";
import { msToDate } from "../utils/RadUtils";

type ThreadCardProps = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
};

export const ThreadCard = ({ id, name, createdTimestamp }: ThreadCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Flex
          mih={10}
          gap="sm"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap">
          <Text>{name}</Text>
          <Text>{msToDate(createdTimestamp)}</Text>
        </Flex>
      </Card.Section>

      <Card.Section>
        <Flex
          mih={50}
          gap="sm"
          justify="center"
          align="center"
          direction="row"
          wrap="nowrap"
        >
          <Button>Edit</Button>
          <Button>Delete</Button>
          <Button>View</Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};
