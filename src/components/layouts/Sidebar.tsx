"use client";

import { useSidebarStore } from "@/store/sidebarStore";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <aside
      className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      사이드 바
    </aside>
  );
}
