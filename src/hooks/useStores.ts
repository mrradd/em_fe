import { ChatThreadStore } from "../stores/ChatThreadStore";
import { MeatballStore } from "../stores/MeatballStore";
import { ModelStore } from "../stores/ModelStore";
import { UiStore } from "../stores/TheUiStore";

const stores = {
  chatThreadStore: new ChatThreadStore(),
  meatballStore: new MeatballStore(),
  modelStore: new ModelStore(),
  uiStore: new UiStore(),
};

export const useStores = () => stores;
