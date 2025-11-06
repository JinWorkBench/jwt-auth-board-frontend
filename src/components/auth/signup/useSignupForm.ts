"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateName,
  validatePasswordAll,
  validateConfirmPassword,
} from "@/utils/validate";
import { signupAPI } from "@/lib/api/auth";

export const useSignupForm = () => {
  const router = useRouter();

  // 폼 입력 필드 상태 관리
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 폼 입력 필드 에러 메시지 상태 관리
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // 여러 에러 동시 표시
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // API 호출 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 에러 초기화
    setUsernameError("");
    setNameError("");
    setPasswordErrors([]);
    setConfirmPasswordError("");
    setApiError("");

    // 이메일 검증
    const emailError = validateEmail(username);
    if (emailError) {
      setUsernameError(emailError);
    }

    // 이름 검증
    const nameValidationError = validateName(name);
    if (nameValidationError) {
      setNameError(nameValidationError);
    }

    // 비밀번호 종합 검증
    const pwErrors = validatePasswordAll(password);
    if (pwErrors.length > 0) {
      setPasswordErrors(pwErrors);
    }

    // 비밀번호 확인 검증 (비밀번호 유효 시에만 검증)
    if (pwErrors.length === 0) {
      const confirmPwError = validateConfirmPassword(password, confirmPassword);
      if (confirmPwError) {
        setConfirmPasswordError(confirmPwError);
      }
    }

    // API 호출
    setIsLoading(true);
    const response = await signupAPI(username, name, password, confirmPassword);
    setIsLoading(false);

    if (response.success) {
      // 성공 시 로그인 페이지 이동
      router.replace("/signin");
    } else {
      // 실패 시 에러 메시지 표시
      setApiError(response.error || "회원가입에 실패했습니다.");
      console.log("회원가입 실패:", response.error);
    }
  };

  return {
    username,
    name,
    password,
    confirmPassword,
    setUsername,
    setName,
    setPassword,
    setConfirmPassword,
    usernameError,
    nameError,
    passwordErrors,
    confirmPasswordError,
    isLoading,
    apiError,
    handleSubmit,
  };
};
