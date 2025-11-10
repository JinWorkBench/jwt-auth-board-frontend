import type { ApiResponse } from "@/types/api";
import type { BoardItem } from "@/types/board";

// 글 목록 조회 API 호출
export const getBoardsAPI = async (
  page: number,
  size: number,
): Promise<ApiResponse<BoardItem[]>> => {
  try {
    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(`/api/boards?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

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
      data: boardItems as BoardItem[],
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
