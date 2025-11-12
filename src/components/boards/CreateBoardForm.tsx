"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateBoard } from "@/hooks/useCreateBoard";
import type { BoardCategory } from "@/types/board";

// 카테고리 옵션
const CATEGORIES: { value: BoardCategory; label: string }[] = [
  { value: "NOTICE", label: "공지" },
  { value: "FREE", label: "자유" },
  { value: "QNA", label: "Q&A" },
  { value: "ETC", label: "기타" },
];

export default function CreateBoardForm() {
  const router = useRouter();
  const { createBoard, isLoading, error } = useCreateBoard();

  // 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<BoardCategory>("FREE");
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // 검증
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

    // 생성 함수 호출
    await createBoard(title, content, category, file || undefined);
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // 파일 크기 확인 (5MB 이하)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFormError("파일 크기는 5MB 이하여야 합니다.");
        setFile(null);
        e.target.value = "";
        return;
      }

      // 이미지 파일 확인
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">게시글 작성</h1>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 에러 메시지 */}
        {(formError || error) && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {formError || error}
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
            {isLoading ? "저장 중..." : "저장"}
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
