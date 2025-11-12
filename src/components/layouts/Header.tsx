"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  console.log("Header 렌더링", { user });

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {user ? (

          // 로그인
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* 왼쪽: 사용자 정보 */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">{user.name}</span>님 환영합니다!
              </p>
              <p className="text-sm text-gray-500">
                아이디:{" "}
                <span className="font-medium text-gray-700">
                  {user.username}
                </span>
              </p>
            </div>

            {/* 오른쪽: 버튼들 */}
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/boards")}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                게시판으로
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
            
          // 비로그인
          <div className="flex justify-end gap-2">
            <button
              onClick={() => router.push("/signin")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
