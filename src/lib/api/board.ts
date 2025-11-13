"use client";

import { useAuthStore } from "@/store/authStore";
import { getMockBoardsData } from "@/lib/mock/boardData";
import { getMockBoardDetail } from "../mock/boardDetailData";
import type { ApiResponse } from "@/types/api";
import type { BoardsPageResponse, BoardDetail } from "@/types/board";

// 글 목록 조회 API 호출
export const getBoardsAPI = async (
  page: number,
  size: number,
): Promise<ApiResponse<BoardsPageResponse>> => {
  try {
    // Zustand에서 읽기
    const useMockData = useAuthStore.getState().useMockData;

    // Mock 모드
    if (useMockData) {
      console.log(`Mock 데이터 사용 중 (page: ${page}, size: ${size})...`);

      // 페이지와 사이즈를 함수에 전달
      const mockData = getMockBoardsData(page, size);

      return {
        success: true,
        message: "게시글 목록 조회 성공 (Mock)",
        data: mockData,
      };
    }

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
        status: response.status,
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

// 상세 페이지 조회 API 호출
export const getBoardDetailAPI = async (
  id: number,
): Promise<ApiResponse<BoardDetail>> => {
  try {
    const useMockData = useAuthStore.getState().useMockData;

    if (useMockData) {
      console.log(`Mock 게시글 상세 데이터 (id: ${id})...`);
      const mockDetail = getMockBoardDetail(id);

      if (!mockDetail) {
        return {
          success: false,
          error: "게시글을 찾을 수 없습니다.",
          status: 404,
        };
      }

      return {
        success: true,
        message: "게시글 상세 조회 성공 (Mock)",
        data: mockDetail,
      };
    }

    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: "액세스 토큰이 없습니다.",
      };
    }

    const response = await fetch(`/api/boards/${id}`, {
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
        error: data.error || "게시글 조회 실패",
        status: response.status,
      };
    }

    return {
      success: true,
      message: "게시글 상세 조회 성공",
      data: data as BoardDetail,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// 게시글 생성 API 호출
export const createBoardAPI = async (
  title: string,
  content: string,
  category: string,
  file?: File,
): Promise<ApiResponse<BoardDetail>> => {
  try {
    const useMockData = useAuthStore.getState().useMockData;

    if (useMockData) {
      return {
        success: false,
        error: "Mock 모드에서는 게시글을 작성할 수 없습니다.",
      };
    }

    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: "액세스 토큰이 없습니다.",
      };
    }

    // multipart/form-data 생성
    const formData = new FormData();

    const requestPayload = {
      title,
      content,
      category,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestPayload)], { type: "application/json" }),
    );

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch("/api/boards", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "게시글 생성 실패",
        status: response.status,
      };
    }

    return {
      success: true,
      message: "게시글 생성 성공",
      data: data as BoardDetail,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// 게시글 수정 API 호출
export const updateBoardAPI = async (
  id: number,
  title: string,
  content: string,
  category: string,
  file?: File,
): Promise<ApiResponse<void>> => {
  try {
    const useMockData = useAuthStore.getState().useMockData;

    if (useMockData) {
      return {
        success: false,
        error: "Mock 모드에서는 게시글을 수정할 수 없습니다.",
      };
    }

    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: "액세스 토큰이 없습니다.",
      };
    }

    const formData = new FormData();
    formData.append("request", JSON.stringify({ title, content, category }));

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(`/api/boards/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "게시글 수정 실패",
        status: response.status,
      };
    }

    return {
      success: true,
      message: "게시글 수정 성공",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// 게시글 삭제 API 호출
export const deleteBoardAPI = async (
  id: number,
): Promise<ApiResponse<void>> => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: "액세스 토큰이 없습니다.",
      };
    }

    const response = await fetch(`/api/boards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "게시글 삭제 실패",
        status: response.status,
      };
    }

    return {
      success: true,
      message: "게시글 삭제 성공",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      success: false,
      error: errorMessage,
    };
  }
};
