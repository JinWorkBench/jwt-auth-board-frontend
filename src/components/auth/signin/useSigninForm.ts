import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validate";
import { signinAPI } from "@/lib/api/auth";

export const useSigninForm = () => {
  const router = useRouter();

  // 폼 입력 필드 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 폼 입력 필드 에러 상태
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // API 호출 상태
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 에러 초기화
    setUsernameError("");
    setPasswordError("");
    setApiError("");

    // 이메일 검증
    const emailError = validateEmail(username);
    if (emailError) {
      setUsernameError(emailError);
    }

    // 비밀번호 검증
    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
    }

    // 검증 실패 시 API 호출하지 않음
    if (emailError || pwError) {
      return;
    }

    // API 호출
    setIsLoading(true);
    const response = await signinAPI(username, password);
    setIsLoading(false);

    if (response.success && response.data) {
      console.log("로그인 성공:", response.data);
      router.replace("/");
    } else {
      // 실패 시 에러 메시지 표시
      setApiError(response.error || "로그인에 실패했습니다.");
      console.error("로그인 실패:", response.error);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    usernameError,
    passwordError,
    isLoading,
    apiError,
    handleSubmit,
  };
};
