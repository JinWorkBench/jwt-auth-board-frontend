import { Suspense } from 'react';
import BoardEditor from "@/components/boards/BoardEditor";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ postId?: string }>;
}) {
  return (
    <Suspense fallback={<div className="text-center py-8">로딩 중...</div>}>
      <BoardEditor searchParams={searchParams} />
    </Suspense>
  );
}
