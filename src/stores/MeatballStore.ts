import { makeAutoObservable } from "mobx";
import type { Meatball } from "../models/Meatball";
import { MeatballAPI } from "../api/MeatballAPI";
import type { GetAllMeatballsResponseDTO } from "../dtos/meatball/GetAllMeatballsResponseDTO";
import { toMeatball, type MeatballDTO } from "../dtos/meatball/MeatballDTO";
import type { CreateMeatballRequestDTO } from "../dtos/meatball/CreateMeatballRequestDTO";
import type { UpdateMeatballRequestDTO } from "../dtos/meatball/UpdateMeatballRequestDTO";
import type { UpdateMeatballResponseDTO } from "../dtos/meatball/UpdateMeatballResponseDTO";

export class MeatballStore {
  meatballList = [] as Meatball[];
  selectedMeatballId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Creates a meatball via the API and appends it to the store when creation succeeds.
   * @param name The display name for the new meatball.
   * @returns A promise that resolves when the create request completes.
   */
  async createMeatball(name: string) {
    const resp: MeatballDTO | undefined = await MeatballAPI.createMeatball(
      {
        name: name
      } as CreateMeatballRequestDTO
    );

    if (resp) {
      this.setMeatballList(this.meatballList.concat(toMeatball(resp)));
    }
  }

  /**
   * Deletes a meatball by id via the API and removes it from the store on success.
   * @param meatballId The meatball id to delete.
   * @returns True when the delete succeeds; otherwise false.
   */
  async deleteMeatballById(meatballId: string): Promise<boolean> {
    const success: boolean = await MeatballAPI.deleteMeatball(meatballId);

    if (success) {
      this.meatballList = this.meatballList.filter((meatball: Meatball) => {
        return meatball.id !== meatballId;
      });
    }

    return success;
  }

  /**
   * Fetches a Meatball by its ID from the API.
   * @param id Meatball ID to get data for.
   * @returns Meatball on success or undefined otherwise.
   */
  async fetchMeatballById(id: string): Promise<Meatball | undefined> {
    const dto: MeatballDTO | undefined = await MeatballAPI.getMeatballDetails(id);

    if (dto) {
      return toMeatball(dto);
    }

    return undefined;
  }

  /**
   * Gets all Meatballs via the API and populates the meatball list with the returned data.
   */
  async fetchMeatballs() {
    const meatballDtos: GetAllMeatballsResponseDTO | undefined = await MeatballAPI.getAllMeatballs();

    if (meatballDtos?.meatballs) {
      const meatballs = meatballDtos.meatballs.map((dto: MeatballDTO) => {
        return toMeatball(dto)
      });

      this.setMeatballList(meatballs);
    }
  }

  /**
   * Updates a meatball by id with any provided field values.
   *
   * @param id The id of the meatball to update.
   * @param name The updated meatball name.
   * @param description The updated meatball description.
   * @param instructions The updated meatball instructions.
   * @returns The updated meatball response DTO, if the request succeeds.
   */
  async updateMeatball(id: string, name?: string, description?: string, instructions?: string): Promise<UpdateMeatballResponseDTO | undefined> {
    const dto: UpdateMeatballResponseDTO | undefined = await MeatballAPI.updateMeatball({ id, name, description, instructions } as UpdateMeatballRequestDTO);
    return dto;
  }

  insertMeatball(meatball: Meatball) {
    this.meatballList = this.meatballList.concat(meatball);
  }

  setMeatballList(meatball: Meatball[]) {
    this.meatballList = meatball;
  }

  setSelectedMeatballId(meatballId: string) {
    this.selectedMeatballId = meatballId;
  }
}
