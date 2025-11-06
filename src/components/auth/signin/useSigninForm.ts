import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validate";

export const useSigninForm = () => {
  // 폼 입력 필드 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 폼 입력 필드 에러 상태
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 에러 초기화
    setUsernameError("");
    setPasswordError("");

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
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    usernameError,
    passwordError,
    handleSubmit,
  };
};
