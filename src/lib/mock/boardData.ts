import type { BoardListItem, BoardsPageResponse } from '@/types/board';

// Mock 데이터
const allMockBoards: BoardListItem[] = [
  {
    id: 1,
    title: '첫 번째 공지사항',
    category: 'NOTICE',
    createdAt: '2024-11-12T10:00:00.000000',
  },
  {
    id: 2,
    title: '두 번째 공지사항',
    category: 'NOTICE',
    createdAt: '2024-11-11T15:30:00.000000',
  },
  {
    id: 3,
    title: '자유 게시판 첫 글',
    category: 'FREE',
    createdAt: '2024-11-10T09:15:00.000000',
  },
  {
    id: 4,
    title: 'Q&A: 어떻게 하나요?',
    category: 'QNA',
    createdAt: '2024-11-09T14:45:00.000000',
  },
  {
    id: 5,
    title: '기타 공지 사항',
    category: 'ETC',
    createdAt: '2024-11-08T11:20:00.000000',
  },
  {
    id: 6,
    title: '세 번째 공지사항',
    category: 'NOTICE',
    createdAt: '2024-11-07T08:50:00.000000',
  },
  {
    id: 7,
    title: '자유 게시판 두 번째 글',
    category: 'FREE',
    createdAt: '2024-11-06T16:30:00.000000',
  },
  {
    id: 8,
    title: 'Q&A: 어떻게 해결하나요?',
    category: 'QNA',
    createdAt: '2024-11-05T12:00:00.000000',
  },
  {
    id: 9,
    title: '자유 게시판 세 번째 글',
    category: 'FREE',
    createdAt: '2024-11-04T12:00:00.000000',
  },
  {
    id: 10,
    title: '네 번째 공지사항',
    category: 'NOTICE',
    createdAt: '2024-11-03T12:00:00.000000',
  },
  {
    id: 11,
    title: '질문이 있습니다!',
    category: 'QNA',
    createdAt: '2024-11-02T12:00:00.000000',
  },
  {
    id: 12,
    title: '자유 게시판 네 번째 글',
    category: 'FREE',
    createdAt: '2024-11-01T12:00:00.000000',
  },
];

// 게시판 목록 페이지네이션 설정
export const getMockBoardsData = (
  page: number = 0,
  size: number = 10
): BoardsPageResponse => {

  // 시작 인덱스와 끝 인덱스 계산
  const startIndex = page * size;
  const endIndex = startIndex + size;

  // 해당 페이지의 데이터 추출
  const content = allMockBoards.slice(startIndex, endIndex);

  // 페이지네이션 메타데이터 계산
  const totalElements = allMockBoards.length;
  const totalPages = Math.ceil(totalElements / size);

  return {
    content,
    totalPages,
    totalElements,
    number: page,
    size,
  };
};
