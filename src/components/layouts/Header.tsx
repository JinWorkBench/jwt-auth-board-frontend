"use client";

import Link from "next/link";
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

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* 로고/홈 링크 */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
            >
              BIGS Portfolio
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex gap-6">
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
              <li>
                <Link
                  href="/#about"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  소개
                </Link>
              </li>
            </ul>
          </nav>

          {/* 우측: 사용자 정보 + 토글 + 로그아웃 */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-6">
              {/* 사용자 정보 또는 로그인 버튼 */}
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">{user.name}</span>님
                    환영합니다!
                    <span className="text-gray-500 ml-1">
                      ({user.username})
                    </span>
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
          </div>
        </div>
      </div>
    </header>
  );
}
