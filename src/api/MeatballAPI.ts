import axios from "axios";
import { API_URL } from "../utils/RadConsts";
import type { CreateMeatballRequestDTO } from "../dtos/meatball/CreateMeatballRequestDTO";
import type { UpdateMeatballRequestDTO } from "../dtos/meatball/UpdateMeatballRequestDTO";
import type { UpdateMeatballResponseDTO } from "../dtos/meatball/UpdateMeatballResponseDTO";
import type { MeatballDTO } from "../dtos/meatball/MeatballDTO";
import type { GetAllMeatballsResponseDTO } from "../dtos/meatball/GetAllMeatballsResponseDTO";

export class MeatballAPI {
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
      console.error(err.message)
      return undefined;
    }
  }

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
      console.error(err.message)
      return false;
    }
  }

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
      console.error(err.message)
      return undefined;
    }
  }

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

  static async updateMeatball({id, name, description, instructions}: UpdateMeatballRequestDTO): Promise<UpdateMeatballResponseDTO | undefined> {
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