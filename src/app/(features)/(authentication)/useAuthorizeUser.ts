import {  useState } from "react";
import { User, userService } from "@/services/user";


export interface LoginPayload {
 email: string;
 password: string;
}

export const useAuthorizedUser = () => {
  const [user, setUser] = useState<User  | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

   async function login(loginPayload : LoginPayload) {
    try {
      const authorizedUserResult = await userService.getAuthorizedUser(loginPayload);
      console.log('variable = ',authorizedUserResult);
      setUser(authorizedUserResult);
    } catch (error : any) {
      setLoading(false);
      setError(error);
    }
  }

  return { user, error, loading, login };
};