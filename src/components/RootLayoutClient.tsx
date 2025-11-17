"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import ModeSwitch from "@/components/common/ModeSwitch";
import Sidebar from "@/components/layouts/Sidebar";

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

  return (
    <>
      <Sidebar />
      {children}
      <div className="relative max-w-7xl mx-auto">
        <div className="absolute bottom-4 right-4 z-50">
          <ModeSwitch />
        </div>
      </div>
    </>
  );
}
