"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  getTodayShipments,
  getInventoryWithExpiry,
  getShipmentsByCustomer,
  getPredictedVsActual,
  calculateSeedingAmount,
} from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [today, setToday] = useState<string>("");
  const shipments = getTodayShipments();
  const inventory = getInventoryWithExpiry();
  const customerShipments = getShipmentsByCustomer();
  const predictedVsActual = getPredictedVsActual();
  const seedingAmounts = calculateSeedingAmount();

  // Hydration-safe date
  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400 tracking-wide h-5">
          {today || <span className="inline-block w-24 h-4 bg-gray-100 rounded animate-pulse" />}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          ダッシュボード
        </h1>
      </header>

      {/* Loss Alert */}
      {inventory.totalEstimatedLoss > 0 && (
        <div className="flex items-center gap-3 sm:gap-4 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-4 sm:p-5 animate-slideUp">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-red-100 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-800">本日廃棄予定</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              {inventory.totalExpiringToday}パック / ¥{inventory.totalEstimatedLoss.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Yesterday's Predicted vs Actual */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          昨日の予実
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {predictedVsActual.map((item, index) => {
            const isPositive = item.variance > 0;
            const isNegative = item.variance < 0;
            return (
              <div
                key={item.productId}
                className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all animate-slideUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-sm font-medium text-gray-600 mb-3">{item.productName}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">予測</span>
                    <span className="font-medium text-gray-600 tabular-nums">{item.predicted.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">実績</span>
                    <span className="font-medium text-gray-900 tabular-nums">{item.actual.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                    <span className="text-gray-400">差異</span>
                    <div className="flex items-center gap-1">
                      {isPositive && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                      {isNegative && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                      {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5 text-gray-400" />}
                      <span className={cn(
                        "font-bold tabular-nums",
                        isPositive && "text-emerald-600",
                        isNegative && "text-red-600",
                        !isPositive && !isNegative && "text-gray-500"
                      )}>
                        {isPositive ? "+" : ""}{item.variance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Today's Seeding */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          本日の仕込み
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {seedingAmounts.map((item, index) => (
            <div
              key={item.productId}
              className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all animate-slideUp"
              style={{ animationDelay: `${(index + 4) * 50}ms` }}
            >
              <p className="text-sm font-medium text-gray-600 mb-2">{item.productName}</p>
              <p className="text-4xl sm:text-5xl font-bold text-green-600 tabular-nums">{item.seedingAmount}</p>
              <p className="text-xs text-gray-400 mt-1">トレイ</p>
              <div className="mt-3 pt-3 border-t border-gray-50 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">目標</span>
                  <span className="tabular-nums text-gray-600">{item.targetStock}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">現在</span>
                  <span className="tabular-nums text-gray-600">{item.currentStock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Shipments */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            本日の出荷
          </h2>
          <p className="text-gray-500 text-sm">
            計 <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">{shipments.totalBoxes}</span> 箱
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {shipments.items.map((item, index) => (
            <div
              key={item.productId}
              className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all animate-slideUp"
              style={{ animationDelay: `${(index + 8) * 50}ms` }}
            >
              <p className="text-sm font-medium text-gray-600 mb-2">{item.productName}</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums">
                {item.boxes}
                <span className="text-base sm:text-lg text-gray-400 ml-1">箱</span>
              </p>
              <p className="text-xs text-gray-400 mt-1 tabular-nums">{item.packs}パック</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory Status - Mobile Friendly Cards */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          在庫状況
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left p-4 font-medium text-gray-500 text-sm">品目</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">本日</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">1日前</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">2日前</th>
                <th className="text-right p-4 font-medium text-red-500 text-sm">廃棄</th>
                <th className="text-right p-4 font-medium text-gray-500 text-sm">合計</th>
              </tr>
            </thead>
            <tbody>
              {inventory.summary.map((product) => (
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
                  <td className="p-4 text-right font-bold text-gray-900 tabular-nums">
                    {product.totalStock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {inventory.summary.map((product, index) => (
            <div
              key={product.productId}
              className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm animate-slideUp"
              style={{ animationDelay: `${(index + 12) * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">{product.productName}</p>
                <p className="text-lg font-bold text-gray-900 tabular-nums">{product.totalStock}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {product.inventory.map((inv, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 mb-0.5">
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
            </div>
          ))}
        </div>
      </section>

      {/* Shipment Status */}
      <section className="space-y-3 sm:space-y-4 pb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          出荷状況
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {customerShipments.map((s, index) => (
            <div
              key={s.customerId}
              className={cn(
                "flex items-center justify-between rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all animate-slideUp",
                s.status === "shipped"
                  ? "bg-emerald-50 border border-emerald-200"
                  : s.status === "preparing"
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-white border border-gray-100"
              )}
              style={{ animationDelay: `${(index + 16) * 30}ms` }}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full flex-shrink-0",
                    s.status === "shipped" ? "bg-emerald-500" :
                    s.status === "preparing" ? "bg-blue-500" : "bg-gray-300"
                  )}
                />
                <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{s.customerName}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <span className="text-xs sm:text-sm text-gray-500">{s.time}</span>
                <span className="font-bold text-gray-900 tabular-nums">{s.boxes}箱</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
