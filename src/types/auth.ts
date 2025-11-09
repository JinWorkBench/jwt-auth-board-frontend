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

// Zustand 스토어 전체 타입
export interface AuthStore {
  // 상태
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // 함수들
  setTokens: (accessToken: string, refreshToken: string, user?: User) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}
