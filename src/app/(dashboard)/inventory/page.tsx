"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AlertTriangle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInventoryWithExpiry, products, targetInventory } from "@/lib/data/mock-data";

export default function InventoryPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const inventoryData = getInventoryWithExpiry();

  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  const adjustInventory = (productId: string, delta: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + delta,
    }));
  };

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-3xl font-bold text-gray-900">在庫管理</h1>
      </div>

      {/* 廃棄アラート */}
      {inventoryData.totalEstimatedLoss > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-red-800">本日廃棄予定</h2>
              <p className="text-red-600">
                {inventoryData.totalExpiringToday}パック / 損失見込み ¥{inventoryData.totalEstimatedLoss.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {inventoryData.summary
              .filter((p) => p.expiringToday > 0)
              .map((p) => (
                <div key={p.productId} className="rounded-lg bg-red-100 p-3 text-center">
                  <p className="text-red-700">{p.productName}</p>
                  <p className="text-2xl font-bold text-red-800">{p.expiringToday}</p>
                  <p className="text-sm text-red-600">¥{p.estimatedLoss.toLocaleString()}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 在庫サマリー */}
      <div className="grid grid-cols-4 gap-4">
        {inventoryData.summary.map((product) => {
          const target = targetInventory[product.productId] || 0;
          const diff = product.totalStock - target;
          const isOver = diff > 0;

          return (
            <div
              key={product.productId}
              className="rounded-xl bg-white border border-gray-200 p-6 text-center"
            >
              <p className="text-gray-600 mb-2">{product.productName}</p>
              <p className="text-5xl font-bold text-gray-900">{product.totalStock}</p>
              <p className="text-sm text-gray-500 mt-2">目標: {target}</p>
              <p className={`text-lg font-semibold mt-1 ${isOver ? 'text-green-600' : 'text-red-600'}`}>
                {isOver ? '+' : ''}{diff} {isOver ? '▲' : '▼'}
              </p>
            </div>
          );
        })}
      </div>

      {/* 在庫詳細テーブル */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-700">品目</th>
              <th className="text-right p-4 font-semibold text-gray-700">本日入庫</th>
              <th className="text-right p-4 font-semibold text-gray-700">1日前</th>
              <th className="text-right p-4 font-semibold text-gray-700">2日前</th>
              <th className="text-right p-4 font-semibold text-red-600">廃棄対象</th>
              <th className="text-right p-4 font-semibold text-gray-700">合計</th>
              <th className="text-right p-4 font-semibold text-gray-700">目標在庫</th>
              <th className="text-right p-4 font-semibold text-gray-700">差異</th>
              <th className="text-center p-4 font-semibold text-gray-700">調整</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.summary.map((product) => {
              const target = targetInventory[product.productId] || 0;
              const currentTotal = product.totalStock + (adjustments[product.productId] || 0);
              const diff = currentTotal - target;
              const isOver = diff > 0;

              return (
                <tr key={product.productId} className="border-b border-gray-100 last:border-0">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{product.productName}</p>
                    <p className="text-sm text-gray-500">@¥{product.unitPrice}</p>
                  </td>
                  {product.inventory.map((inv, idx) => (
                    <td
                      key={idx}
                      className={`p-4 text-right text-lg tabular-nums ${
                        inv.status === "expiring"
                          ? "text-red-600 font-bold bg-red-50"
                          : inv.status === "warning"
                          ? "text-amber-600"
                          : "text-gray-700"
                      }`}
                    >
                      {inv.quantity}
                    </td>
                  ))}
                  <td className="p-4 text-right text-xl font-bold text-gray-900 tabular-nums">
                    {currentTotal}
                  </td>
                  <td className="p-4 text-right text-lg text-gray-600 tabular-nums">
                    {target}
                  </td>
                  <td className={`p-4 text-right text-lg font-semibold tabular-nums ${isOver ? 'text-green-600' : 'text-red-600'}`}>
                    {isOver ? '+' : ''}{diff}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => adjustInventory(product.productId, -10)}
                        className="h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {adjustments[product.productId] || 0}
                      </span>
                      <button
                        onClick={() => adjustInventory(product.productId, 10)}
                        className="h-8 w-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center"
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

      {/* 調整保存ボタン */}
      {Object.values(adjustments).some((v) => v !== 0) && (
        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700">
            在庫調整を保存
          </Button>
        </div>
      )}
    </div>
  );
}
