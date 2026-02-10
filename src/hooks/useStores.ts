import { ChatThreadStore } from "../stores/ChatThreadStore";
import { UiStore } from "../stores/TheUiStore";

const stores = {
  chatThreadStore: new ChatThreadStore(),
  uiStore: new UiStore(),
};

export const useStores = () => stores;
