import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect, useTransition } from "react";
import { MeatballList } from "../components/MeatballList";
import { Box, Container, Flex, Title } from "@mantine/core";


export const MeatballsPage = observer(() => {
  const { meatballStore } = useStores();
  const [isLoadPending, startLoadTransition] = useTransition();

  return (
    <>
      <Title>Meatballs</Title>
      <Flex mih={80}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap">
        <MeatballList />


        <div>
          herp derp
        </div>
      </Flex>
    </>
  );
});
