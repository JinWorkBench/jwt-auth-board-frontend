"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteBoardAPI } from "@/lib/api/board";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";

export const useDeleteBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const withAuthError = useHandleAuthError();

  const deleteBoard = async (postId: number) => {
    setIsLoading(true);
    setError(null);

    const response = await withAuthError(() => deleteBoardAPI(postId));

    if (!response || !response.success) {
      setError(response?.error || "게시글 삭제 실패");
      setIsLoading(false);
      return;
    }

    console.log("게시글 삭제 성공");
    setIsLoading(false);
    setShowConfirm(false);

    // 글 목록으로 이동
    router.push("/boards");
  };

  return { deleteBoard, isLoading, error, showConfirm, setShowConfirm };
};
