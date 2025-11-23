"use client";

import { useCallback, useState } from "react";
import { addLikeAPI, removeLikeAPI } from "@/lib/api/board";

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

  // 좋아요 토글 함수
  const handleLikeToggle = useCallback(async () => {
    
    // 이전 상태 저장 (롤백용)
    const prevIsLiked = isLiked;
    const prevLikeCount = likeCount;

    // 즉시 UI 변경 (낙관적 업데이트)
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

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
  }, [isLiked, likeCount, boardId]);

  return {
    isLiked,
    likeCount,
    handleLikeToggle,
  };
};
