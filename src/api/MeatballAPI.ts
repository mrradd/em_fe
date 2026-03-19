import axios from "axios";
import { API_URL } from "../utils/RadConsts";
import type { CreateMeatballRequestDTO } from "../dtos/meatball/CreateMeatballRequestDTO";
import type { UpdateMeatballRequestDTO } from "../dtos/meatball/UpdateMeatballRequestDTO";
import type { UpdateMeatballResponseDTO } from "../dtos/meatball/UpdateMeatballResponseDTO";
import type { MeatballDTO } from "../dtos/meatball/MeatballDTO";
import type { GetAllMeatballsResponseDTO } from "../dtos/meatball/GetAllMeatballsResponseDTO";

export class MeatballAPI {
  /**
   * Creates a meatball by posting the provided request fields to the API.
   *
   * @param The create request payload.
   * @param name The meatball name sent in the request body.
   * @param description The meatball description sent in the request body.
   * @param instructions The preparation instructions sent in the request body.
   * @returns A promise that resolves to the created `MeatballDTO` when the request
   * succeeds, or `undefined` when the request fails or returns a non-200 status.
   */
  static async createMeatball({ name, description, instructions }: CreateMeatballRequestDTO): Promise<MeatballDTO | undefined> {
    try {
      const resp = await axios.post(
        `${API_URL}/meatball/create`, {
        name: name,
        description: description,
        instructions: instructions,
      });

      if (resp.status !== 200) {
        console.warn(`createMeatball: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message);
      return undefined;
    }
  }

  /**
   * Deletes a meatball by its id.
   *
   * @param id  The id of the meatball to be deleted.
   * @returns A promise that resolves to `true` when the API confirms deletion, or
   * `false` if the request fails or returns a non-200 status.
   */
  static async deleteMeatball(id: string): Promise<boolean> {
    try {
      const resp = await axios.delete(
        `${API_URL}/meatball/${id}`, {
      });

      if (resp.status !== 200) {
        console.warn(`deleteMeatball: code ${resp.status}`);
        return false;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message);
      return false;
    }
  }

  /**
   * Fetches the full list of meatballs from the API.
   *
   * @returns A promise that resolves to `GetAllMeatballsResponseDTO` containing
   * the API response data when the request succeeds, or `undefined` when the
   * request fails or returns a non-200 status.
   */
  static async getAllMeatballs(): Promise<GetAllMeatballsResponseDTO | undefined> {
    try {
      const resp = await axios.get(
        `${API_URL}/meatball/list/all`, {
      });

      if (resp.status !== 200) {
        console.warn(`getAllMeatballs: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message);
      return undefined;
    }
  }

  /**
   * Fetches a single meatball by its id.
   *
   * @param id  id of the meatball to get details for.
   * @returns A promise that resolves to a `MeatballDTO` when the request
   * succeeds, or `undefined` when the request fails or returns a non-200 status.
   */
  static async getMeatballDetails(id: string): Promise<MeatballDTO | undefined> {
    try {
      const resp = await axios.get(
        `${API_URL}/meatball/${id}`, {
      });

      if (resp.status !== 200) {
        console.warn(`getMeatballDetails: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  }

  /**
   * Updates an existing meatball with the provided request fields.
   *
   * @param id The id of the meatball to update.
   * @param name The updated meatball name, when provided.
   * @param description The updated meatball description, when provided.
   * @param instructions The updated preparation instructions, when provided.
   * @returns A promise that resolves to `UpdateMeatballResponseDTO` containing the
   * updated meatball data when the request succeeds, or `undefined` when the
   * request fails or returns a non-200 status.
   */
  static async updateMeatball({ id, name, description, instructions }: UpdateMeatballRequestDTO): Promise<UpdateMeatballResponseDTO | undefined> {
    try {
      const resp = await axios.patch(
        `${API_URL}/meatball/update`, {
        id: id,
        name: name,
        description: description,
        instructions: instructions,
      });

      if (resp.status !== 200) {
        console.warn(`updateMeatball: code ${resp.status}`);
        return undefined;
      }

      return resp.data.data;
    }
    catch (err: any) {
      console.error(err.message)
      return undefined;
    }
  }
}
