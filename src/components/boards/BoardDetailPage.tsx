"use client";

import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBoardDetailAPI } from "@/lib/api/board";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";
import { useDeleteBoard } from "@/hooks/useDeleteBoard";
import type { BoardDetail } from "@/types/board";

interface BoardDetailPageProps {
  boardId: number;
}

export default function BoardDetailPage({ boardId }: BoardDetailPageProps) {
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const withAuthError = useHandleAuthError();
  const {
    deleteBoard,
    isLoading: isDeleting,
    showConfirm,
    setShowConfirm,
  } = useDeleteBoard();

  useEffect(() => {
    (async () => {
      const response = await withAuthError(() => getBoardDetailAPI(boardId));

      if (!response || !response.success) {
        setError(response?.error || "게시글 조회 실패");
        setIsLoading(false);
        return;
      }

      setBoard(response.data || null);
      setIsLoading(false);
    })();
  }, [boardId, withAuthError]);

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  if (!board) {
    return <div className="text-center py-8">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">{board.title}</h1>
          <div className="flex gap-2 mt-2 text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-200 rounded">
              {board.boardCategory}
            </span>
            <span>{new Date(board.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/boards/editor?postId=${boardId}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            수정
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="whitespace-pre-wrap text-gray-700">{board.content}</div>
      </div>

      {/* 이미지 */}
      {board.imageUrl && (
        <div className="mb-6">
          <Image
            src={board.imageUrl}
            alt={board.title}
            width={600}
            height={400}
            className="max-w-full rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </div>
      )}

      {/* 버튼 */}
      <button
        onClick={() => router.back()}
        className="w-full px-4 py-2 border rounded hover:bg-gray-50"
      >
        목록으로
      </button>

      {/* 삭제 확인 모달 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">게시글 삭제</h2>
            <p className="text-gray-600 mb-6">
              정말로 이 게시글을 삭제하시겠습니까?
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => deleteBoard(boardId)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-50 disabled:bg-gray-200"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
