// 토큰 정보
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// 사용자 정보
export interface User {
  username: string;
  name: string;
}
