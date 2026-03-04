import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect, useTransition } from "react";
import { NativeSelect, Text } from "@mantine/core";

/**
 * Displays a selection box allowing the user to select a model to chat with.
 */
export const ModelSelector = observer(() => {
  const { modelStore } = useStores();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await modelStore.fetchModels();
    });
  }, [modelStore]);

  return (
    <div>
      {isPending && <Text>...Loading models...</Text>}
      <NativeSelect
        value={modelStore.selectedModel}
        onChange={(event) => modelStore.setSelectedModel(event.currentTarget.value)}
        data={modelStore.models}
      />
    </div>
  );
});
