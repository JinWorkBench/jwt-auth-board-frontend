"use client";

import Link from "next/link";
import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
    <aside
      className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 ${
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
    </aside>
  );
}
