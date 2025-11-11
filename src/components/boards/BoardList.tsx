"use client";

import { useCallback, useEffect, useState } from "react";
import { getBoardsAPI } from "@/lib/api/board";
import { useWaitForToken } from "@/hooks/useWaitForToken";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";
import type { BoardsPageResponse } from "@/types/board";

export default function BoardList() {
  const [boardsData, setBoardsData] = useState<BoardsPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const waitForToken = useWaitForToken();
  const withAuthError = useHandleAuthError();

  // API 호출
  const fetchBoards = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError(null);

      const response = await withAuthError(() => getBoardsAPI(page, 10));

      if (!response || !response.success) {
        setError(response?.error || "게시글 조회 실패");
        setIsLoading(false);
        return;
      }

      if (response.data) {
        setBoardsData(response.data);
      }

      setIsLoading(false);
    },
    [withAuthError],
  );

  // 초기 데이터 로드
  useEffect(() => {
    (async () => {
      // 토큰 준비 대기
      const isTokenReady = await waitForToken();

      if (!isTokenReady) {
        setError("토큰 준비 실패. 다시 로그인해주세요.");
        setIsLoading(false);
        return;
      }

      await fetchBoards(0);
    })();
  }, [waitForToken, fetchBoards]);

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

  if (boards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>
    );
  }

  return (
    <div>
      {/* 게시글 목록 */}
      <div className="space-y-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
          >
            {/* 제목 */}
            <h2 className="text-lg font-semibold">{board.title}</h2>

            {/* 카테고리, 작성일 */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-200 rounded">
                {board.category}
              </span>
              <span>{new Date(board.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 text-center text-sm text-gray-600">
        페이지 {boardsData?.number || 0} / 총 {boardsData?.totalPages || 0}
        (총 {boardsData?.totalElements || 0}개)
      </div>
    </div>
  );
}
