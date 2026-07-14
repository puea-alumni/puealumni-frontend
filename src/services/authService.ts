import api from "../lib/api";
import { LoginResponse } from "../types/auth";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  graduation_year: number;
}

export const register = async (
  payload: RegisterPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/register", payload);

  return response.data;
};