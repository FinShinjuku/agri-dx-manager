"use client";

import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, getSalesSummary } from "@/lib/data/mock-data";

// 売上データ生成
const generateSalesData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseAmount = isWeekend ? 150000 : 280000;
    data.push({
      date,
      amount: baseAmount + Math.floor(Math.random() * 50000),
      boxes: isWeekend ? 180 + Math.floor(Math.random() * 50) : 320 + Math.floor(Math.random() * 80),
    });
  }
  return data;
};

// 商品別売上
const productSales = products.map((p) => ({
  ...p,
  monthlySales: Math.floor(Math.random() * 500000) + 200000,
  monthlyQuantity: Math.floor(Math.random() * 5000) + 2000,
  growth: Math.floor(Math.random() * 30) - 10,
}));

export default function ReportsPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const salesData = generateSalesData();
  const sales = getSalesSummary();

  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const totalSales = salesData.reduce((sum, d) => sum + d.amount, 0);
  const avgDailySales = Math.round(totalSales / salesData.length);
  const totalBoxes = salesData.reduce((sum, d) => sum + d.boxes, 0);

  // 簡易グラフ用の最大値
  const maxAmount = Math.max(...salesData.map((d) => d.amount));

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{today}</p>
          <h1 className="text-3xl font-bold text-gray-900">レポート</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(["week", "month", "year"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium ${
                  period === p
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p === "week" ? "週間" : p === "month" ? "月間" : "年間"}
              </button>
            ))}
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <p className="text-gray-500 mb-1">今月売上</p>
          <p className="text-3xl font-bold text-gray-900">
            ¥{sales.thisMonth.toLocaleString()}
          </p>
          <div
            className={`flex items-center gap-1 mt-2 text-sm ${
              parseFloat(sales.change.monthly) > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {parseFloat(sales.change.monthly) > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{sales.change.monthly}% 前月比</span>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <p className="text-gray-500 mb-1">今週売上</p>
          <p className="text-3xl font-bold text-gray-900">
            ¥{sales.thisWeek.toLocaleString()}
          </p>
          <div
            className={`flex items-center gap-1 mt-2 text-sm ${
              parseFloat(sales.change.weekly) > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {parseFloat(sales.change.weekly) > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{sales.change.weekly}% 前週比</span>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <p className="text-gray-500 mb-1">日平均売上</p>
          <p className="text-3xl font-bold text-gray-900">
            ¥{avgDailySales.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <p className="text-gray-500 mb-1">総出荷数</p>
          <p className="text-3xl font-bold text-gray-900">
            {totalBoxes.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm">箱 (30日間)</p>
        </div>
      </div>

      {/* 売上グラフ */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">日別売上推移</h2>
        <div className="h-64 flex items-end gap-1">
          {salesData.slice(-30).map((d, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors"
                style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                title={`${format(d.date, "M/d")}: ¥${d.amount.toLocaleString()}`}
              />
              {i % 5 === 0 && (
                <span className="text-xs text-gray-400">
                  {format(d.date, "M/d")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 商品別売上 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">商品別売上</h2>
        <div className="space-y-4">
          {productSales
            .sort((a, b) => b.monthlySales - a.monthlySales)
            .map((product) => {
              const percentage = (product.monthlySales / totalSales) * 100;
              return (
                <div key={product.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-500">
                        {product.monthlyQuantity.toLocaleString()}パック
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm ${
                          product.growth > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                      <span className="font-bold text-gray-900">
                        ¥{product.monthlySales.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 廃棄ロス */}
      <div className="rounded-xl bg-red-50 border border-red-200 p-6">
        <h2 className="text-lg font-semibold text-red-700 mb-4">廃棄ロス (今月)</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => {
            const lossAmount = Math.floor(Math.random() * 20000) + 5000;
            const lossQuantity = Math.floor(lossAmount / product.unitPrice);
            return (
              <div key={product.id} className="text-center">
                <p className="text-red-600">{product.name}</p>
                <p className="text-2xl font-bold text-red-700">
                  ¥{lossAmount.toLocaleString()}
                </p>
                <p className="text-sm text-red-500">{lossQuantity}パック</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-red-200 text-center">
          <p className="text-red-600">総廃棄ロス</p>
          <p className="text-3xl font-bold text-red-700">
            ¥{products
              .reduce(() => Math.floor(Math.random() * 20000) + 5000, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
