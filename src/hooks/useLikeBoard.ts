"use client";

import { useCallback, useState, useEffect } from "react";
import { addLikeAPI, removeLikeAPI } from "@/lib/api/board";
import { useAuthStore } from "@/store/authStore";

interface UseLikeBoardParams {
  boardId: number;
  initialIsLiked: boolean; // 초기 좋아요 상태
  initialLikeCount: number; // 초기 좋아요 개수
}

interface UseLikeBoardReturn {
  isLiked: boolean; // 현재 좋아요 상태
  likeCount: number; // 현재 좋아요 개수
  handleLikeToggle: () => void; // 좋아요 토글 함수
}

export const useLikeBoard = ({
  boardId,
  initialIsLiked,
  initialLikeCount,
}: UseLikeBoardParams): UseLikeBoardReturn => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // Mock 모드 확인
  const useMockData = useAuthStore((state) => state.useMockData);

  // 좋아요 여부, 개수 초기화
  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  // 좋아요 토글 함수
  const handleLikeToggle = useCallback(async () => {
    // 이전 상태 저장 (롤백용)
    const prevIsLiked = isLiked;
    const prevLikeCount = likeCount;

    // 즉시 UI 변경 (낙관적 업데이트)
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    // Mock 모드면 API 호출하지 않음
    if (useMockData) {
      console.log("Mock 모드 API 비호출");
      return;
    }

    // API 호출
    try {
      const apiFunction = isLiked ? removeLikeAPI : addLikeAPI;
      const response = await apiFunction(boardId);

      if (!response || !response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("좋아요 API 호출 실패:", error);
      setIsLiked(prevIsLiked);
      setLikeCount(prevLikeCount);
    }
  }, [isLiked, likeCount, boardId, useMockData]);

  return {
    isLiked,
    likeCount,
    handleLikeToggle,
  };
};
