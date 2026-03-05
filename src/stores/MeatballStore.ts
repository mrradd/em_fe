import { makeAutoObservable } from "mobx";
import type { Meatball } from "../models/Meatball";

export class MeatballStore {
  meatballList = [] as Meatball[];
  selectedMeatballId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  insertMeatball(meatball: Meatball) {
    this.meatballList = this.meatballList.concat(meatball);
  }

  setThreadList(meatball: Meatball[]) {
    this.meatballList = meatball;
  }

  setSelectedThreadId(meatballId: string) {
    this.selectedMeatballId = meatballId;
  }
}
