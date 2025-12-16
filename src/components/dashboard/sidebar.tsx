"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Sprout,
  Users,
  Calendar,
} from "lucide-react";

const navigation = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "本日の種付け", href: "/seeding", icon: Sprout },
  { name: "出荷管理", href: "/shipments", icon: Truck },
  { name: "在庫管理", href: "/inventory", icon: Package },
  { name: "受注管理", href: "/orders", icon: ShoppingCart },
  { name: "納入先管理", href: "/customers", icon: Users },
  { name: "生産計画", href: "/production", icon: Calendar },
  { name: "レポート", href: "/reports", icon: BarChart3 },
  { name: "設定", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
      {/* ロゴ */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600">
          <Sprout className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">Sprout DX</h1>
          <p className="text-xs text-gray-500">生産管理システム</p>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-green-600" : "text-gray-400"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* フッター */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <span className="text-sm font-medium text-gray-600">田</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">田中 工場長</p>
            <p className="text-xs text-gray-500">管理者</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
