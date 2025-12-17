"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Check, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPredictedVsActual, calculateSeedingAmount } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export default function SeedingPage() {
  const [today, setToday] = useState<string>("");
  const predictedVsActual = getPredictedVsActual();
  const seedingData = calculateSeedingAmount();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Hydration-safe date formatting
  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  const toggleComplete = (productId: string) => {
    setCompleted((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const allCompleted = seedingData.every((item) => completed[item.productId]);
  const completedCount = seedingData.filter((item) => completed[item.productId]).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 animate-fadeIn">
      {/* Header - Minimal & Elegant */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400 tracking-wide h-5">
          {today || <span className="inline-block w-24 h-4 bg-gray-100 rounded animate-pulse" />}
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          朝の仕込み指示
        </h1>
      </header>

      {/* Yesterday's Summary - Horizontal Scroll on Mobile */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          昨日の予実サマリー
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory scrollbar-hide">
          {predictedVsActual.map((item, index) => {
            const isPositive = item.variance > 0;
            const isNegative = item.variance < 0;

            return (
              <div
                key={item.productId}
                className="flex-shrink-0 w-[160px] sm:w-auto snap-start animate-slideUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-full rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">
                    {item.productName}
                  </h3>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">予測</span>
                      <span className="text-sm font-medium text-gray-600 tabular-nums">
                        {item.predicted.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">実績</span>
                      <span className="text-sm font-medium text-gray-900 tabular-nums">
                        {item.actual.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2.5 border-t border-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">差異</span>
                        <div className="flex items-center gap-1">
                          {isPositive && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                          {isNegative && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                          {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5 text-gray-400" />}
                          <span
                            className={cn(
                              "text-sm font-bold tabular-nums",
                              isPositive && "text-emerald-600",
                              isNegative && "text-red-600",
                              !isPositive && !isNegative && "text-gray-500"
                            )}
                          >
                            {isPositive ? "+" : ""}{item.variance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Today's Seeding - The Hero Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            本日の仕込み量
          </h2>
          <span className="text-xs font-medium text-gray-400 tabular-nums">
            {completedCount}/{seedingData.length} 完了
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {seedingData.map((item, index) => {
            const isCompleted = completed[item.productId];

            return (
              <div
                key={item.productId}
                className="animate-slideUp"
                style={{ animationDelay: `${(index + 4) * 50}ms` }}
              >
                <div
                  className={cn(
                    "rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-all duration-500 ease-out",
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg shadow-emerald-500/10"
                      : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
                  )}
                >
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleComplete(item.productId)}
                        className={cn(
                          "h-11 w-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 active:scale-90",
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                        )}
                        aria-label={isCompleted ? "完了を取り消す" : "完了にする"}
                      >
                        <Check
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                          )}
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={cn(
                            "text-lg font-bold transition-colors duration-300",
                            isCompleted ? "text-emerald-800" : "text-gray-900"
                          )}>
                            {item.productName}
                          </h3>
                          <div className="text-right flex-shrink-0">
                            <p className={cn(
                              "text-4xl font-bold tabular-nums tracking-tight transition-colors duration-300",
                              isCompleted ? "text-emerald-600" : "text-green-600"
                            )}>
                              {item.seedingAmount}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">パック</p>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="bg-gray-50/80 rounded-xl p-3">
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">現在在庫</p>
                            <p className="text-xl font-bold text-blue-600 tabular-nums">{item.currentInventory}</p>
                          </div>
                          <div className="bg-gray-50/80 rounded-xl p-3">
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">目標在庫</p>
                            <p className="text-xl font-bold text-gray-900 tabular-nums">{item.targetInventory}</p>
                          </div>
                        </div>

                        {/* Breakdown */}
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{item.breakdown}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center gap-6">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(item.productId)}
                      className={cn(
                        "h-14 w-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 hover:scale-105 active:scale-95",
                        isCompleted
                          ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                      )}
                      aria-label={isCompleted ? "完了を取り消す" : "完了にする"}
                    >
                      <Check
                        className={cn(
                          "h-6 w-6 transition-all duration-300",
                          isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        )}
                      />
                    </button>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300",
                        isCompleted ? "text-emerald-800" : "text-gray-900"
                      )}>
                        {item.productName}
                      </h3>

                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">計算内訳</p>
                          <p className="text-sm text-gray-600">{item.breakdown}</p>
                        </div>
                        <div className="pl-8 border-l border-gray-100">
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">現在在庫</p>
                          <p className="text-2xl font-bold text-blue-600 tabular-nums">{item.currentInventory}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">目標在庫</p>
                          <p className="text-2xl font-bold text-gray-900 tabular-nums">{item.targetInventory}</p>
                        </div>
                      </div>
                    </div>

                    {/* Seeding Amount - Hero Number */}
                    <div className="text-right pl-6 border-l border-gray-100">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">仕込み量</p>
                      <p className={cn(
                        "text-5xl lg:text-6xl font-bold tabular-nums tracking-tight transition-colors duration-300",
                        isCompleted ? "text-emerald-600" : "text-green-600"
                      )}>
                        {item.seedingAmount}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">パック</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Complete Button - Fixed on Mobile */}
      <div className="pb-24 sm:pb-0">
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent sm:relative sm:p-0 sm:bg-transparent">
          <div className="max-w-4xl mx-auto">
            <Button
              size="lg"
              disabled={!allCompleted}
              className={cn(
                "w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-2xl transition-all duration-500",
                allCompleted
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {allCompleted ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  仕込み完了を記録
                </span>
              ) : (
                `全ての品目を完了してください (${completedCount}/${seedingData.length})`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
