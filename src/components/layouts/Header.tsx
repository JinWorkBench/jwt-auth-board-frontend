"use client";

import Link from "next/link";
import WelcomeMessage from "@/components/common/WelcomeMessage";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { toggleSidebar } = useSidebarStore();

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-header items-center gap-4">
          {/* 로고/홈 링크 */}
          <div className="justify-self-start">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
            >
              Brilyent72
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex">
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/#about"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link
                  href="/boards"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  게시판
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  기능
                </Link>
              </li>
            </ul>
          </nav>

          {/* 우측: 사용자 정보 + 토글 + 로그아웃 */}
          <div className="justify-self-end">
            <div className="hidden md:flex items-center gap-6">
              {/* 사용자 정보 또는 로그인 버튼 */}
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex text-sm text-gray-700">
                    <span className="font-semibold">{user.name}</span>님&nbsp;
                    <WelcomeMessage user={user} />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                >
                  로그인
                </Link>
              )}
            </div>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
