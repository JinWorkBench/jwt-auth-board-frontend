"use client";

import { useEffect, useState, use } from "react";
import { getBoardDetailAPI } from "@/lib/api/board";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";
import type { BoardDetail } from "@/types/board";

export const useEditorBoard = (searchParams: Promise<{ postId?: string }>) => {
  const params = use(searchParams);
  const postId = params.postId;

  const [initialData, setInitialData] = useState<BoardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(!!postId); // postId 있으면 로딩
  const [error, setError] = useState<string | null>(null);

  const withAuthError = useHandleAuthError();

  // 수정 모드
  useEffect(() => {
    if (!postId) return; // 생성 모드

    (async () => {
      setIsLoading(true);
      setError(null);

      const response = await withAuthError(() =>
        getBoardDetailAPI(parseInt(postId)),
      );

      if (!response || !response.success) {
        setError(response?.error || "게시글을 불러올 수 없습니다.");
        setIsLoading(false);
        return;
      }

      setInitialData(response.data || null);
      setIsLoading(false);
    })();
  }, [postId, withAuthError]);

  return {
    mode: postId ? "edit" : "create", // 모드 구분
    postId: postId ? parseInt(postId) : null,
    initialData,
    isLoading,
    error,
  };
};
