"use client";

import { useState, useEffect } from "react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, getSalesSummary } from "@/lib/data/mock-data";

// 売上データ生成 (固定値でHydrationエラー回避)
const salesAmounts = [
  295000, 310000, 285000, 175000, 165000, 305000, 298000, 288000, 315000, 302000,
  290000, 170000, 160000, 295000, 308000, 278000, 320000, 295000, 285000, 180000,
  168000, 298000, 312000, 295000, 305000, 288000, 292000, 175000, 162000, 308000, 295000
];
const salesBoxes = [
  345, 360, 332, 195, 185, 355, 348, 338, 365, 352,
  340, 190, 180, 345, 358, 328, 370, 345, 335, 200,
  188, 348, 362, 345, 355, 338, 342, 195, 182, 358, 345
];

const generateSalesData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const idx = 30 - i;
    data.push({
      date,
      amount: salesAmounts[idx],
      boxes: salesBoxes[idx],
    });
  }
  return data;
};

// 商品別売上 (固定値)
const productSales = products.map((p, i) => ({
  ...p,
  monthlySales: [450000, 380000, 320000, 280000][i] || 350000,
  monthlyQuantity: [4500, 3800, 3200, 2800][i] || 3500,
  growth: [8, -3, 12, 5][i] || 0,
}));

export default function ReportsPage() {
  const [today, setToday] = useState("");
  const [salesData] = useState(() => generateSalesData());
  const sales = getSalesSummary();

  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const totalSales = salesData.reduce((sum, d) => sum + d.amount, 0);
  const avgDailySales = Math.round(totalSales / salesData.length);
  const totalBoxes = salesData.reduce((sum, d) => sum + d.boxes, 0);

  // 簡易グラフ用の最大値
  const maxAmount = Math.max(...salesData.map((d) => d.amount));

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{today}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">レポート</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(["week", "month", "year"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium ${
                    period === p
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p === "week" ? "週間" : p === "month" ? "月間" : "年間"}
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              エクスポート
            </Button>
          </div>
        </div>
      </header>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">今月売上</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            ¥{sales.thisMonth.toLocaleString()}
          </p>
          <div
            className={`flex items-center gap-1 mt-2 text-xs sm:text-sm ${
              parseFloat(sales.change.monthly) > 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {parseFloat(sales.change.monthly) > 0 ? (
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <span>{sales.change.monthly}%</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">今週売上</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            ¥{sales.thisWeek.toLocaleString()}
          </p>
          <div
            className={`flex items-center gap-1 mt-2 text-xs sm:text-sm ${
              parseFloat(sales.change.weekly) > 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {parseFloat(sales.change.weekly) > 0 ? (
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <span>{sales.change.weekly}%</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">日平均売上</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            ¥{avgDailySales.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">総出荷数</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            {totalBoxes.toLocaleString()}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">箱 (30日間)</p>
        </div>
      </div>

      {/* 売上グラフ */}
      <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">日別売上推移</h2>
        <div className="h-48 sm:h-64 flex items-end gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
          {salesData.slice(-30).map((d, i) => (
            <div
              key={i}
              className="flex-1 min-w-[8px] flex flex-col items-center gap-1"
            >
              <div
                className="w-full bg-emerald-500 rounded-t hover:bg-emerald-600 transition-colors"
                style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                title={`${format(d.date, "M/d")}: ¥${d.amount.toLocaleString()}`}
              />
              {i % 7 === 0 && (
                <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                  {format(d.date, "M/d")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 商品別売上 */}
      <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">商品別売上</h2>
        <div className="space-y-4">
          {productSales
            .sort((a, b) => b.monthlySales - a.monthlySales)
            .map((product) => {
              const percentage = (product.monthlySales / totalSales) * 100;
              return (
                <div key={product.id}>
                  {/* Mobile Layout */}
                  <div className="sm:hidden mb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="font-bold text-gray-900 tabular-nums">
                        ¥{product.monthlySales.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{product.monthlyQuantity.toLocaleString()}パック</span>
                      <span
                        className={product.growth > 0 ? "text-emerald-600" : "text-red-600"}
                      >
                        {product.growth > 0 ? "+" : ""}{product.growth}%
                      </span>
                    </div>
                  </div>
                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-500">
                        {product.monthlyQuantity.toLocaleString()}パック
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm ${
                          product.growth > 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                      <span className="font-bold text-gray-900 tabular-nums">
                        ¥{product.monthlySales.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 廃棄ロス */}
      <div className="rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-red-700 mb-4">廃棄ロス (今月)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product, i) => {
            const lossAmounts = [15000, 12000, 18000, 8000];
            const lossAmount = lossAmounts[i] || 10000;
            const lossQuantity = Math.floor(lossAmount / product.unitPrice);
            return (
              <div key={product.id} className="text-center bg-red-100/50 rounded-xl p-3">
                <p className="text-xs sm:text-sm text-red-600">{product.name}</p>
                <p className="text-lg sm:text-2xl font-bold text-red-700 tabular-nums">
                  ¥{lossAmount.toLocaleString()}
                </p>
                <p className="text-xs text-red-500">{lossQuantity}パック</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-red-200 text-center">
          <p className="text-sm text-red-600">総廃棄ロス</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-700 tabular-nums">
            ¥{(15000 + 12000 + 18000 + 8000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
