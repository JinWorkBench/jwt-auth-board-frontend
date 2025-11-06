import type { SignupRequest, ApiResponse } from "@/types/api";

export const signupAPI = async (
  username: string,
  name: string,
  password: string,
  confirmPassword: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        password,
        confirmPassword,
      } as SignupRequest),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || "회원가입 실패",
      };
    }

    return {
      success: true,
      message: "회원가입 성공",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";

    return {
      success: false,
      error: errorMessage,
    };
  }
};
