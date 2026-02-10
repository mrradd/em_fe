import { observer } from "mobx-react-lite";
import { Flex, Image, Title } from "@mantine/core";

export const Home = observer(() => {
  return (
    <Flex justify={"center"} align={"center"} direction={"column"}>
      <Title>Welcome to here!</Title>
      <Image w={600} src={"/electricMeatball.png"} />
    </Flex >
  );
});

