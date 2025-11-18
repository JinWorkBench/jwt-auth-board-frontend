"use client";

import Link from "next/link";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
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

      {/* 로그인/로그아웃 버튼 */}
      <div className="border-t border-gray-200 p-6">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          로그인
        </button>

        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-2">
          로그아웃
        </button>
      </div>
    </aside>
  );
}
