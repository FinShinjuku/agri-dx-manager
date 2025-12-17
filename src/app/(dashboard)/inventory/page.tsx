"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AlertTriangle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInventoryWithExpiry, targetInventory } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export default function InventoryPage() {
  const [today, setToday] = useState("");
  const inventoryData = getInventoryWithExpiry();

  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  const adjustInventory = (productId: string, delta: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + delta,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">在庫管理</h1>
      </header>

      {/* 廃棄アラート */}
      {inventoryData.totalEstimatedLoss > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-red-100 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-red-800">本日廃棄予定</h2>
              <p className="text-sm sm:text-base text-red-600">
                {inventoryData.totalExpiringToday}パック / ¥{inventoryData.totalEstimatedLoss.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {inventoryData.summary
              .filter((p) => p.expiringToday > 0)
              .map((p) => (
                <div key={p.productId} className="rounded-xl bg-red-100/80 p-3 text-center">
                  <p className="text-xs sm:text-sm text-red-700">{p.productName}</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-800 tabular-nums">{p.expiringToday}</p>
                  <p className="text-xs text-red-600">¥{p.estimatedLoss.toLocaleString()}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 在庫サマリー */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {inventoryData.summary.map((product) => {
          const target = targetInventory[product.productId] || 0;
          const diff = product.totalStock - target;
          const isOver = diff > 0;

          return (
            <div
              key={product.productId}
              className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 text-center shadow-sm"
            >
              <p className="text-sm text-gray-600 mb-2">{product.productName}</p>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 tabular-nums">{product.totalStock}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">目標: {target}</p>
              <p className={cn(
                "text-base sm:text-lg font-semibold mt-1 tabular-nums",
                isOver ? 'text-emerald-600' : 'text-red-600'
              )}>
                {isOver ? '+' : ''}{diff} {isOver ? '▲' : '▼'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: テーブル表示 */}
      <div className="hidden lg:block rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left p-4 font-medium text-gray-500 text-sm">品目</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">本日</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">1日前</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">2日前</th>
                <th className="text-right p-4 font-medium text-red-500 text-sm">廃棄</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">合計</th>
                <th className="text-center p-4 font-medium text-gray-500 text-sm">調整</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.summary.map((product) => {
                const currentTotal = product.totalStock + (adjustments[product.productId] || 0);
                const target = targetInventory[product.productId] || 0;
                const diff = currentTotal - target;

                return (
                  <tr key={product.productId} className="border-b border-gray-50 last:border-0">
                    <td className="p-4 font-medium text-gray-900">{product.productName}</td>
                    {product.inventory.map((inv, idx) => (
                      <td
                        key={idx}
                        className={cn(
                          "p-4 text-right tabular-nums",
                          inv.status === "expiring" ? "text-red-600 font-bold" : "text-gray-600"
                        )}
                      >
                        {inv.quantity}
                      </td>
                    ))}
                    <td className="p-4 text-right font-bold text-gray-900 tabular-nums">{currentTotal}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => adjustInventory(product.productId, -10)}
                          className="h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-semibold tabular-nums">
                          {adjustments[product.productId] || 0}
                        </span>
                        <button
                          onClick={() => adjustInventory(product.productId, 10)}
                          className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: カード表示 */}
      <div className="lg:hidden space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">在庫詳細</h2>
        {inventoryData.summary.map((product) => {
          const currentTotal = product.totalStock + (adjustments[product.productId] || 0);
          const target = targetInventory[product.productId] || 0;
          const diff = currentTotal - target;
          const isOver = diff > 0;

          return (
            <div key={product.productId} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">{product.productName}</p>
                <p className="text-2xl font-bold text-gray-900 tabular-nums">{currentTotal}</p>
              </div>

              {/* 日別在庫 */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {product.inventory.map((inv, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-gray-400">
                      {idx === 0 ? "本日" : idx === 1 ? "1日前" : idx === 2 ? "2日前" : "廃棄"}
                    </p>
                    <p className={cn(
                      "text-sm font-semibold tabular-nums",
                      inv.status === "expiring" ? "text-red-600" : "text-gray-700"
                    )}>
                      {inv.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* 目標 & 差異 */}
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-500">目標: {target}</span>
                <span className={cn(
                  "font-semibold tabular-nums",
                  isOver ? "text-emerald-600" : "text-red-600"
                )}>
                  {isOver ? '+' : ''}{diff}
                </span>
              </div>

              {/* 調整ボタン */}
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => adjustInventory(product.productId, -10)}
                  className="h-10 w-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-16 text-center font-bold text-lg tabular-nums">
                  {adjustments[product.productId] || 0}
                </span>
                <button
                  onClick={() => adjustInventory(product.productId, 10)}
                  className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 調整保存ボタン */}
      {Object.values(adjustments).some((v) => v !== 0) && (
        <div className="flex justify-end pb-6">
          <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
            在庫調整を保存
          </Button>
        </div>
      )}
    </div>
  );
}
