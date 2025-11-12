"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCreateBoard } from "@/hooks/useCreateBoard";
import { useUpdateBoard } from "@/hooks/useUpdateBoard";
import { useEditorBoard } from "@/hooks/useEditorBoard";
import type { BoardCategory } from "@/types/board";

const CATEGORIES: { value: BoardCategory; label: string }[] = [
  { value: "NOTICE", label: "공지" },
  { value: "FREE", label: "자유" },
  { value: "QNA", label: "Q&A" },
  { value: "ETC", label: "기타" },
];

export default function BoardEditor() {
  const router = useRouter();
  const {
    mode,
    postId,
    initialData,
    isLoading: isDataLoading,
    error: dataError,
  } = useEditorBoard();

  const { createBoard, isLoading: isCreating } = useCreateBoard();
  const { updateBoard, isLoading: isUpdating } = useUpdateBoard();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState<BoardCategory>(
    initialData?.boardCategory || "FREE",
  );
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.boardCategory);
    }
  }, [initialData]);
  
  const isLoading = isDataLoading || isCreating || isUpdating;

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      setFormError("내용을 입력해주세요.");
      return;
    }

    if (title.length > 200) {
      setFormError("제목은 200자 이내여야 합니다.");
      return;
    }

    if (content.length > 5000) {
      setFormError("내용은 5000자 이내여야 합니다.");
      return;
    }

    // 생성 / 수정 분기
    if (mode === "create") {
      await createBoard(title, content, category, file || undefined);
    } else {
      await updateBoard(postId!, title, content, category, file || undefined);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFormError("파일 크기는 5MB 이하여야 합니다.");
        setFile(null);
        e.target.value = "";
        return;
      }

      if (!selectedFile.type.startsWith("image/")) {
        setFormError("이미지 파일만 업로드 가능합니다.");
        setFile(null);
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      setFormError("");
    }
  };

  // 로딩 상태
  if (isDataLoading) {
    return (
      <div className="text-center py-8">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (dataError) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center py-8 text-red-500">
        <p>{dataError}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 헤더 분기 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "게시글 작성" : "게시글 수정"}
        </h1>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 에러 메시지 */}
        {formError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {formError}
          </div>
        )}

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium mb-2">제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시글 제목을 입력해주세요"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            maxLength={200}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">{title.length} / 200</p>
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium mb-2">카테고리 *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as BoardCategory)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-medium mb-2">내용 *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 입력해주세요"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={10}
            maxLength={5000}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">{content.length} / 5000</p>
        </div>

        {/* 이미지 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            {file ? `선택됨: ${file.name}` : "5MB 이하의 이미지만 가능"}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading
              ? mode === "create"
                ? "작성 중..."
                : "수정 중..."
              : mode === "create"
              ? "작성"
              : "수정"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:bg-gray-200"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
