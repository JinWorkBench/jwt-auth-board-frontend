// 게시판 카테고리
export type BoardCategory = "NOTICE" | "FREE" | "QNA" | "ETC";

// 카테고리 맵
export interface CategoryMap {
  [key: string]: string;
}

// 글 목록 조회 응답
export interface BoardItem {
  id: number;
  title: string;
  category: BoardCategory;
  createdAt: string;
}

// 글 상세 조회 응답
export interface BoardDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl?: string;
  createdAt: string;
}