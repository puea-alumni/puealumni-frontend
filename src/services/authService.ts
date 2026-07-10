import api from "../lib/api";
import { LoginResponse } from "../types/auth";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};