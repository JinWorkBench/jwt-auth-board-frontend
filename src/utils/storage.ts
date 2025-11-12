import { User } from "@/types/auth";

const TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";

// 액세스 토큰 저장
export const saveAccessToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 리프레시 토큰 저장
export const saveRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// 액세스 토큰 조회
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 리프레시 토큰 조회
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// 사용자 정보 저장
export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// 사용자 정보 조회
export const getUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// 토큰 삭제
export const clearAuthStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
