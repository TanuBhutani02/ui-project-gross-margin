
export interface IBaseService<T> {

    get(path?: string): Promise<T[] | T>;
  
    getById(id: string, path?: string): Promise<T>;
  
    create(data: T, path?: string): Promise<T>;
  
    update(data: Partial<T>,id?: string, path?: string): Promise<T>;
  
    delete(id: string, path?: string): Promise<void>;
    
    post(data: any, path?: string) : Promise<T>;

    search(data: any, path?: string, method?: "POST" | "GET"): Promise<T[]>;
  }
  