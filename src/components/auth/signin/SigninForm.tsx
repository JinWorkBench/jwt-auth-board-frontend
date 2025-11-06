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
    handleSubmit,
  } = useSigninForm();

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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        로그인
      </button>
    </form>
  );
}
