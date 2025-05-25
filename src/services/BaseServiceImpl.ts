import { axiosInstance } from "@/app/_utils/ApiUtils";
import { IBaseService } from "./BaseService";

export abstract class BaseService<T> implements IBaseService<T> {
  constructor(private baseUrl: string) {}
  async post(data: T, path?: string): Promise<T> {
    try {
      return (await axiosInstance.post(this.getPath(path), data)).data.result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async get(path?: string): Promise<T[] | T> {
    try {
    return  (await axiosInstance.get(this.getPath(path))).data.result;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id: string, path?: string): Promise<T> {
    try {
   const response = (await axiosInstance.get(this.getPath(path, id))).data;
   console.log("Response", response);   
   return response;
    } catch (error) {
        return this.handleError(error);
    }
  }

  async create(data: T, path?: string): Promise<T> {
    try {
      const response = (await axiosInstance.post(this.getPath(path), data)).data;
      return response;
    } catch (error) {
        return this.handleError(error);
    }
  }

  async update(data: Partial<T>,id?: string, path?: string): Promise<T> {
    try {
      const response = (await axiosInstance.put(this.getPath(path, id), data)).data;
      return response;
    } catch (error) {
        return this.handleError(error);
    }
  }

  async delete(id: string, path?: string): Promise<void> {
    try {
      (await axiosInstance.delete(this.getPath(path, id))).data;
    } catch (error) {
        return this.handleError(error);
    }
  }

  async search(
    queryParams: Record<string, any>,
    path?: string,
    method: "GET" | "POST" = "GET"
  ): Promise<T[]> {
    try {
      let response;
      if (method === "GET") {
        response = (await axiosInstance.get(this.getPath(path), { params: queryParams })).data;
      } else {
        response = (await axiosInstance.post(this.getPath(path), queryParams)).data;
      }
      return response.result;
    } catch (error) {
      return this.handleError(error);
    }
  }
  

  private getPath(path?: string, id?: string): string {
    let url = this.baseUrl;
    if (path) {
      url += `/${path}`;
    }
    if (id) {
      url += `/${id}`;
    }
    return url;
  }

  protected handleError(error: any): Promise<never> {
      return Promise.reject(error);
  }
}