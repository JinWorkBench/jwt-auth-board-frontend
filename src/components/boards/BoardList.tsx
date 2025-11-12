"use client";

import BoardCard from "./BoardCard";
import { useRouter } from "next/navigation";
import { useBoardList } from "@/hooks/useBoardList";

export default function BoardList() {
  const router = useRouter();
  const { boardsData, isLoading, error, currentPage, handlePageChange } =
    useBoardList();

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
      {/* 생성 버튼 */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => router.push('/boards/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + 새 게시글
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {/* 이전 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          이전
        </button>

        {/* 페이지 정보 */}
        <div className="text-sm text-gray-600">
          페이지 {currentPage + 1} / {boardsData?.totalPages || 0}
          <span className="ml-2 text-gray-400">
            (총 {boardsData?.totalElements || 0}개)
          </span>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= (boardsData?.totalPages || 1) - 1}
          className={`px-4 py-2 rounded ${
            currentPage >= (boardsData?.totalPages || 1) - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
