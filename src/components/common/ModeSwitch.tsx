"use client";

import { useAuthStore } from "@/store/authStore";

export default function ModeSwitch() {
  const useMockData = useAuthStore((state) => state.useMockData);
  const toggleMockMode = useAuthStore((state) => state.toggleMockMode);

  return (
    <div className="flex items-center gap-3">
      {/* 라벨 */}
      <span className="text-sm font-medium text-gray-600">
        {useMockData ? "Mock 모드" : "API 모드"}
      </span>

      {/* 전원 스위치 버튼 */}
      <button
        onClick={toggleMockMode}
        className={`
          relative w-14 h-8 rounded-full transition-all duration-300
          ${useMockData ? "bg-green-500" : "bg-gray-300"}
          hover:scale-105 active:scale-95
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${useMockData ? "focus:ring-green-500" : "focus:ring-gray-400"}
        `}
        aria-label={`${useMockData ? "Mock 데이터" : "실제 API"} 사용 중`}
        title={`클릭하여 ${
          useMockData ? "실제 API로 변경" : "Mock 데이터로 변경"
        }`}
      >
        {/* 토글 버튼 */}
        <div
          className={`
            absolute top-1 w-6 h-6 bg-white rounded-full
            transition-all duration-300 shadow-md
            flex items-center justify-center font-bold text-xs
            ${useMockData ? "right-1 text-green-500" : "left-1 text-gray-500"}
          `}
        >
          {useMockData ? "●" : "○"}
        </div>
      </button>

      {/* 상태 텍스트 */}
      <span className="text-xs text-gray-500 w-12">
        {useMockData ? "ON" : "OFF"}
      </span>
    </div>
  );
}
