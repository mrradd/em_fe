import { ChatThreadStore } from "../stores/ChatThreadStore";
import { ModelStore } from "../stores/ModelStore";
import { UiStore } from "../stores/TheUiStore";

const stores = {
  chatThreadStore: new ChatThreadStore(),
  modelStore: new ModelStore(),
  uiStore: new UiStore(),
};

export const useStores = () => stores;
