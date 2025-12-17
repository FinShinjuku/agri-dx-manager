"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  Menu,
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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/20">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/25">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Sprout DX</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">生産管理システム</p>
            </div>
          </Link>

          {/* Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all active:scale-95"
                aria-label="メニューを開く"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-0 bg-white/95 backdrop-blur-xl">
              <SheetHeader className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/25">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-semibold text-gray-900 tracking-tight">
                      Sprout DX
                    </SheetTitle>
                    <p className="text-xs text-gray-500">生産管理システム</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation */}
              <nav className="flex flex-col gap-1 p-4">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all active:scale-[0.98]",
                        isActive
                          ? "bg-green-50 text-green-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                      style={{
                        animationDelay: `${index * 30}ms`,
                      }}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-green-600" : "text-gray-400"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* User Profile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-inner">
                    <span className="text-sm font-semibold text-gray-600">田</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">田中 工場長</p>
                    <p className="text-xs text-gray-500">管理者</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
