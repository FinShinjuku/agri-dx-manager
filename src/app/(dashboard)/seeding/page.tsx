"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPredictedVsActual, calculateSeedingAmount } from "@/lib/data/mock-data";

export default function SeedingPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const predictedVsActual = getPredictedVsActual();
  const seedingData = calculateSeedingAmount();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleComplete = (productId: string) => {
    setCompleted((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const allCompleted = seedingData.every((item) => completed[item.productId]);

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-3xl font-bold text-gray-900">朝の仕込み指示</h1>
      </div>

      {/* 昨日の予実サマリー */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">昨日の予実サマリー</h2>
        <div className="grid grid-cols-4 gap-4">
          {predictedVsActual.map((item) => (
            <div key={item.productId} className="rounded-xl bg-white border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{item.productName}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">予測出荷</span>
                  <span className="font-medium">{item.predicted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">実績出荷</span>
                  <span className="font-medium">{item.actual}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">差異</span>
                  <span
                    className={`font-bold ${
                      item.variance > 0
                        ? "text-green-600"
                        : item.variance < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {item.variance > 0 ? "+" : ""}
                    {item.variance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 本日の仕込み量 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">本日の仕込み量</h2>
        <div className="space-y-4">
          {seedingData.map((item) => (
            <div
              key={item.productId}
              className={`rounded-xl border p-6 transition-all ${
                completed[item.productId]
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6 flex-1">
                  <button
                    onClick={() => toggleComplete(item.productId)}
                    className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      completed[item.productId]
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {completed[item.productId] && <Check className="h-6 w-6" />}
                  </button>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.productName}</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">計算内訳</p>
                        <p className="text-sm font-medium text-gray-900">{item.breakdown}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">現在在庫</p>
                        <p className="text-2xl font-bold text-blue-600">{item.currentInventory}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">目標在庫</p>
                        <p className="text-2xl font-bold text-gray-900">{item.targetInventory}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <p className="text-gray-500 text-sm mb-1">仕込み量</p>
                  <p className="text-7xl font-bold text-green-600">{item.seedingAmount}</p>
                  <p className="text-gray-500 mt-1">パック</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 完了ボタン */}
      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!allCompleted}
          className="h-14 px-12 text-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          {allCompleted ? "仕込み完了を記録" : "全ての品目を完了してください"}
        </Button>
      </div>
    </div>
  );
}
