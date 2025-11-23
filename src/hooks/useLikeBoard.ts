"use client";

import { useCallback, useState } from "react";
import { useHandleAuthError } from "./useHandleAuthError";

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

  const withAuthError = useHandleAuthError();

  const handleLikeToggle = useCallback(() => {
    console.log("좋아요 토글:", !isLiked);
  }, [isLiked]);
  return {
    isLiked,
    likeCount,
    handleLikeToggle,
  };
};
