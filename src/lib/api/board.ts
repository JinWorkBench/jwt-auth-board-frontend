"use client";

import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/types/api";
import type { BoardsPageResponse } from "@/types/board";

// 글 목록 조회 API 호출
export const getBoardsAPI = async (
  page: number,
  size: number,
): Promise<ApiResponse<BoardsPageResponse>> => {
  try {
    // Zustand에서 토큰 가져오기
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: "액세스 토큰이 없습니다. 로그인이 필요합니다.",
      };
    }

    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(`/api/boards?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "글 목록 조회 실패",
      };
    }

    const boardItems = data.content || [];

    return {
      success: true,
      message: "글 목록 조회 성공",
      data: boardItems as BoardsPageResponse,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";
    return {
      success: false,
      error: errorMessage,
    };
  }
};
