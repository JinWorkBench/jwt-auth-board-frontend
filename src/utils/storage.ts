const TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

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

// 토큰 삭제
export const clearAuthStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};