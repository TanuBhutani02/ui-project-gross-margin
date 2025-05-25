import { ENDPOINTS } from '@/constant/apiConstant';
import { BaseService } from './BaseServiceImpl';

export interface User {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

class UserService extends BaseService<User> {
    constructor() {
        super(ENDPOINTS.USERS);
    }
    async getAuthorizedUser(payload : LoginPayload): Promise<User | null> {
       return await this.post(payload,'/login');
    }

    async getRoleMenus(roleId: Number): Promise<any> {
        return await this.get(`/role/${roleId}`);
     
     }
}

export const userService = new UserService();
