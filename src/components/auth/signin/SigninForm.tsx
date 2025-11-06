"use client";

import React from "react";
import Link from "next/link";
import { useSigninForm } from "./useSigninForm";

export default function SigninForm() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    usernameError,
    passwordError,
    isLoading,
    apiError,
    handleSubmit,
  } = useSigninForm();

  return (
    <form onSubmit={handleSubmit}>
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-red-700 text-sm">
          {apiError}
        </div>
      )}
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
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {passwordError && (
        <p className="text-red-500 text-sm mb-4">{passwordError}</p>
      )}

      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition"
          >
            회원가입
          </Link>
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded font-semibold text-white transition ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
