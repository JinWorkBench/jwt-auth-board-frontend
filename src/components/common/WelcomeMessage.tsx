"use client";

import { useMemo } from "react";

interface WelcomeMessageProps {
  user: { name: string } | null;
}

// 로그인 사용자 메세지
const LOGIN_MESSAGES = [
  "오늘 하루 어떠세요?",
  "환영합니다!",
  "좋은 하루 되세요!",
  "오늘도 화이팅!",
];

// 비로그인 사용자 메세지
const GUEST_MESSAGES = ["로그인이 필요합니다.", "회원가입하고 시작해보세요!"];

// 메세지 랜덤 선택 함수
const getRandomMessage = (messages: string[]) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function WelcomeMessage({ user }: WelcomeMessageProps) {

  // 메세지 조건부 렌더링
  const welcomeMessage = useMemo(() => {
    return user
      ? getRandomMessage(LOGIN_MESSAGES)
      : getRandomMessage(GUEST_MESSAGES);
  }, [user]);

  return <p className="text-sm text-gray-500">{welcomeMessage}</p>;
}
