"use client";

import Link from "next/link";
import { useSidebarStore } from "@/store/sidebarStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    closeSidebar();
    router.push("/");
  };

  return (
    <>
      {/* 사이드바 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 네비게이션 메뉴 */}
        <nav className="p-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/about"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
                onClick={closeSidebar}
              >
                소개
              </Link>
            </li>
            <li>
              <Link
                href="/boards"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
                onClick={closeSidebar}
              >
                게시판
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
                onClick={closeSidebar}
              >
                기능
              </Link>
            </li>
          </ul>
        </nav>

        {/* 로그인 조건부 렌더링 */}
        <div className="border-t border-gray-200 p-6">
          {user ? (
            <>
              {/* 사용자명 표시 */}
              <p className="text-sm text-gray-600 mb-4">{user.username}님</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-2"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={closeSidebar}
              className="block w-full px-4 py-2 bg-blue-600 text-center text-white rounded-lg hover:bg-blue-700 transition"
            >
              로그인
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
