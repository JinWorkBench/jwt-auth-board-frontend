"use client";

import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

// 토큰이 준비될 때까지 대기
export const useWaitForToken = () => {
  return useCallback(async (maxWaitTime: number = 1000): Promise<boolean> => {
    const startTime = Date.now();

    // 토큰 준비 여부 확인
    let accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      console.log("토큰이 이미 준비됨");
      return true;
    }

    console.log("⏳ 토큰 준비 중...");

    // 반복 확인 (최대 시간까지)
    while (Date.now() - startTime < maxWaitTime) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        console.log("토큰 준비 완료");
        return true;
      }
    }

    // 타임 아웃
    console.log("토큰 준비 실패");
    return false;
  }, []);
};
