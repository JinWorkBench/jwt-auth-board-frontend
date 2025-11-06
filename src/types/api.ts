// 회원가입 요청 데이터
export interface SignupRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}