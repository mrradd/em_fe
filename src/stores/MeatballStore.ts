import { makeAutoObservable } from "mobx";
import type { Meatball } from "../models/Meatball";
import { MeatballAPI } from "../api/MeatballAPI";
import type { GetAllMeatballsResponseDTO } from "../dtos/meatball/GetAllMeatballsResponseDTO";
import { toMeatball, type MeatballDTO } from "../dtos/meatball/MeatballDTO";
import type { CreateMeatballRequestDTO } from "../dtos/meatball/CreateMeatballRequestDTO";

export class MeatballStore {
  meatballList = [] as Meatball[];
  selectedMeatballId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  async createMeatball(name: string) {
    const resp: MeatballDTO | undefined = await MeatballAPI.createMeatball(
      {
        name: name
      } as CreateMeatballRequestDTO
    );

    if (resp) {
      this.setMeatballList(this.meatballList.concat(toMeatball(resp)));
      this.selectedMeatballId = resp.id;
    }
  }

  /**
   * Deletes a meatball by id via the API and removes it from the store on success.
   * @param meatballId The meatball id to delete.
   * @returns True when the delete succeeds; otherwise false.
   */
  async deleteThreadById(meatballId: string): Promise<boolean> {
    const success: boolean = await MeatballAPI.deleteMeatball(meatballId);

    if (success) {
      this.meatballList = this.meatballList.filter((meatball: Meatball) => {
        return meatball.id !== meatballId;
      });
    }

    return success;
  }

  async fetchMeatballs() {
    const meatballDtos: GetAllMeatballsResponseDTO | undefined = await MeatballAPI.getAllMeatballs();

    if (meatballDtos?.meatballs) {
      const meatballs = meatballDtos.meatballs.map((dto: MeatballDTO) => {
        return toMeatball(dto)
      });

      this.setMeatballList(meatballs);
    }
  }

  insertMeatball(meatball: Meatball) {
    this.meatballList = this.meatballList.concat(meatball);
  }

  setMeatballList(meatball: Meatball[]) {
    this.meatballList = meatball;
  }

  setSelectedThreadId(meatballId: string) {
    this.selectedMeatballId = meatballId;
  }
}
