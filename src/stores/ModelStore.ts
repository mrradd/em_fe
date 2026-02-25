import { makeAutoObservable } from "mobx";
import { ChatAPI } from "../api/ChatAPI";
import type { GetModelsResponseDTO } from "../dtos/GetModelsResponseDTO";

export class ModelStore {
  models: string[] = [];
  selectedModel: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchModels() {
    const resp: GetModelsResponseDTO | undefined = await ChatAPI.getAvailableModels();

    if (resp != undefined) {
      this.setModels(resp.models);
    }
  }

  setModels(models: string[]) {
    this.models = models;
  }

  setSelectedModel(model: string) {
    this.selectedModel = model;
  }
}