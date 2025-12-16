"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/mock-data";

// 生産計画データを生成
const generateProductionPlan = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const date = addDays(startDate, i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    days.push({
      date,
      productions: products.map((p) => ({
        productId: p.id,
        productName: p.name,
        trays: isWeekend ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 40) + 30,
        status: i < 2 ? "seeded" : i < 5 ? "growing" : "planned",
      })),
    });
  }
  return days;
};

const statusConfig = {
  planned: { label: "計画", bg: "bg-gray-100", text: "text-gray-600" },
  seeded: { label: "種付済", bg: "bg-blue-100", text: "text-blue-700" },
  growing: { label: "育成中", bg: "bg-green-100", text: "text-green-700" },
  harvested: { label: "収穫済", bg: "bg-purple-100", text: "text-purple-700" },
};

export default function ProductionPage() {
  const [startDate, setStartDate] = useState(subDays(new Date(), 2));
  const productionPlan = generateProductionPlan(startDate);

  const goToPreviousWeek = () => setStartDate((d) => subDays(d, 7));
  const goToNextWeek = () => setStartDate((d) => addDays(d, 7));
  const goToToday = () => setStartDate(subDays(new Date(), 2));

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{format(new Date(), "M月d日(E)", { locale: ja })}</p>
          <h1 className="text-3xl font-bold text-gray-900">生産計画</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            今日
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 凡例 */}
      <div className="flex items-center gap-4">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded ${config.bg}`} />
            <span className="text-sm text-gray-600">{config.label}</span>
          </div>
        ))}
      </div>

      {/* カレンダー */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-semibold text-gray-700 w-32">品目</th>
                {productionPlan.map((day, i) => {
                  const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
                  return (
                    <th
                      key={i}
                      className={`p-3 text-center font-medium min-w-[70px] ${
                        isToday
                          ? "bg-green-100 text-green-800"
                          : isWeekend
                          ? "bg-gray-100 text-gray-500"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="text-xs">{format(day.date, "M/d")}</div>
                      <div className="text-sm">{format(day.date, "E", { locale: ja })}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{product.growthDays}日栽培</span>
                  </td>
                  {productionPlan.map((day, i) => {
                    const production = day.productions.find((p) => p.productId === product.id);
                    const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                    const config = statusConfig[production?.status as keyof typeof statusConfig] || statusConfig.planned;
                    return (
                      <td
                        key={i}
                        className={`p-2 text-center ${isToday ? "bg-green-50" : ""}`}
                      >
                        <div
                          className={`rounded-lg p-2 ${config.bg} ${config.text}`}
                        >
                          <div className="text-lg font-bold">{production?.trays || 0}</div>
                          <div className="text-xs">{config.label}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="p-3 font-semibold text-gray-700">合計</td>
                {productionPlan.map((day, i) => {
                  const total = day.productions.reduce((sum, p) => sum + p.trays, 0);
                  const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                  return (
                    <td
                      key={i}
                      className={`p-3 text-center font-bold text-gray-900 ${
                        isToday ? "bg-green-100" : ""
                      }`}
                    >
                      {total}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 週間サマリー */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          const weekTotal = productionPlan
            .slice(0, 7)
            .reduce((sum, day) => {
              const p = day.productions.find((pr) => pr.productId === product.id);
              return sum + (p?.trays || 0);
            }, 0);
          return (
            <div
              key={product.id}
              className="rounded-xl bg-white border border-gray-200 p-6 text-center"
            >
              <p className="text-gray-600 mb-1">{product.name}</p>
              <p className="text-4xl font-bold text-gray-900">{weekTotal}</p>
              <p className="text-gray-400 text-sm">今週のトレイ数</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
