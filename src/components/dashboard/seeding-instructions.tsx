"use client";

import { Sprout, Calendar } from "lucide-react";
import { getSeedingInstructions } from "@/lib/data/mock-data";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const productColors: Record<string, string> = {
  豆苗: "bg-green-500",
  カイワレS: "bg-emerald-400",
  カイワレW: "bg-teal-400",
  ブロッコリー: "bg-lime-500",
};

export function SeedingInstructions() {
  const data = getSeedingInstructions();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-100 p-3">
            <Sprout className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">今朝の種付け指示</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(data.date), "M月d日(E)", { locale: ja })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>収穫予定: {format(new Date(data.harvestDate), "M/d")}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <p className="text-sm text-green-600 font-medium">総トレイ数</p>
          <p className="text-3xl font-bold text-green-700">{data.totalTrays}</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-600 font-medium">予想収穫量</p>
          <p className="text-3xl font-bold text-blue-700">{data.totalEstimatedYield}</p>
          <p className="text-xs text-blue-500">パック</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.instructions.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${productColors[item.productName] || "bg-gray-400"}`}
              />
              <div>
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="text-xs text-gray-500">
                  {item.growthDays}日後収穫 / 予想{item.estimatedYield}パック
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{item.trays}</p>
              <p className="text-xs text-gray-500">トレイ</p>
            </div>
            {item.notes && (
              <div className="ml-4 rounded-lg bg-amber-100 px-2 py-1 text-xs text-amber-700">
                {item.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
