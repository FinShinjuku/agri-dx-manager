"use client";

import { Package } from "lucide-react";
import { getTodayShipments } from "@/lib/data/mock-data";

const productColors: Record<string, string> = {
  豆苗: "bg-green-500",
  カイワレS: "bg-emerald-400",
  カイワレW: "bg-teal-400",
  ブロッコリー: "bg-lime-500",
};

export function ShipmentByProduct() {
  const data = getTodayShipments();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">本日の出荷</h3>
            <p className="text-sm text-gray-500">品目別箱数</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{data.totalBoxes}</p>
          <p className="text-sm text-gray-500">総箱数</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4">
            <div
              className={`h-3 w-3 rounded-full ${productColors[item.productName] || "bg-gray-400"}`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.productName}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.boxes}箱
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${productColors[item.productName] || "bg-gray-400"}`}
                  style={{ width: `${(item.boxes / data.totalBoxes) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">
                  {item.packs}パック
                </span>
                <span className="text-xs text-gray-400">
                  ¥{(item.packs * item.unitPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">本日売上見込</span>
          <span className="text-xl font-bold text-green-600">
            ¥{data.totalSales.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
