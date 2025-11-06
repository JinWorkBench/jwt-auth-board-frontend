"use client";

import React, { useState } from "react";
import { validateEmail, validateName } from "@/utils/validate";

export default function SignupForm() {
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

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 에러 초기화
    setUsernameError("");
    setNameError("");
    setPasswordErrors([]);
    setConfirmPasswordError("");

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
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="block mb-1 font-semibold">
        이메일
      </label>
      <input
        type="email"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="example@email.com"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {usernameError && (
        <p className="text-red-500 text-sm mb-4">{usernameError}</p>
      )}

      <label htmlFor="name" className="block mb-1 font-semibold">
        이름
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="홍길동"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {nameError && <p className="text-red-500 text-sm mb-4">{nameError}</p>}

      <label htmlFor="password" className="block mb-1 font-semibold">
        비밀번호
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {passwordErrors.length > 0 && (
        <div className="mb-4">
          {passwordErrors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              • {error}
            </p>
          ))}
        </div>
      )}

      <label htmlFor="confirmPassword" className="block mb-1 font-semibold">
        비밀번호 확인
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {confirmPasswordError && (
        <p className="text-red-500 text-sm mb-6">{confirmPasswordError}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        회원가입
      </button>
    </form>
  );
}
