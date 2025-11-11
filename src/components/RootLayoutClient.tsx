"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // 페이지 초기화 시 토큰 복원 시도
    const { initializeFromStorage } = useAuthStore.getState();
    initializeFromStorage();
  }, []);

  return <>{children}</>;
}
