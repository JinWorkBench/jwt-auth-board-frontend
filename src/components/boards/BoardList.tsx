"use client";

import { useCallback, useEffect, useState } from "react";
import { getBoardsAPI } from "@/lib/api/board";
import type { BoardsPageResponse } from "@/types/board";

export default function BoardList() {
  const [boardsData, setBoardsData] = useState<BoardsPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // API 호출
  const fetchBoards = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    const response = await getBoardsAPI(page, 10);

    if (response.success && response.data) {
      setBoardsData(response.data);
      setCurrentPage(page);
    } else {
      setError(response.error || "게시글 조회 실패");
    }

    setIsLoading(false);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    (async () => {
      await fetchBoards(0);
    })();
  }, [fetchBoards]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>에러 발생</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  // 게시판 데이터 추출과 빈 배열 확인
  const boards = boardsData?.content || [];

  return (
    <div>
      <p>게시판 리스트</p>
    </div>
  );
}
