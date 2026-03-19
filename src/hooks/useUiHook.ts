import { useStores } from "./useStores";

export const useUiHook = () => {
  const { chatThreadStore, meatballStore } = useStores();

  const resetAllSelectedIds = () => {
    chatThreadStore.setSelectedThreadId("");
    meatballStore.setSelectedMeatballId("");
  }

  return { resetAllSelectedIds };
};
