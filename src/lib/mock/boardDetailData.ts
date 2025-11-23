import type { BoardDetail } from "@/types/board";

export const mockBoardDetailData: Record<number, BoardDetail> = {
  1: {
    id: 1,
    title: "첫 번째 공지사항",
    content: `안녕하세요! 첫 번째 공지사항입니다.`,
    boardCategory: "NOTICE",
    createdAt: "2024-11-12T10:00:00.000000",
    likeCount: 12,
    isLiked: true,
  },
  2: {
    id: 2,
    title: "두 번째 공지사항",
    content: "두 번째 공지사항의 상세 내용입니다.",
    boardCategory: "NOTICE",
    createdAt: "2024-11-11T15:30:00.000000",
    likeCount: 5,
    isLiked: false,
  },
  3: {
    id: 3,
    title: "자유 게시판 첫 글",
    content: "자유롭게 작성한 첫 번째 글입니다.",
    boardCategory: "FREE",
    createdAt: "2024-11-10T09:15:00.000000",
    likeCount: 2,
    isLiked: false,
  },
};

export const getMockBoardDetail = (id: number): BoardDetail | null => {
  return mockBoardDetailData[id] || null;
};
