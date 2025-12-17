"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Check, Truck, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShipmentsByCustomer, getTodayShipments } from "@/lib/data/mock-data";

type ShipmentStatus = "pending" | "preparing" | "shipped";

export default function ShipmentsPage() {
  const [today, setToday] = useState("");
  const todayShipments = getTodayShipments();
  const initialShipments = getShipmentsByCustomer();

  const [shipments, setShipments] = useState(initialShipments);

  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  const updateStatus = (customerId: string, newStatus: ShipmentStatus) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.customerId === customerId ? { ...s, status: newStatus } : s
      )
    );
  };

  const statusCounts = {
    shipped: shipments.filter((s) => s.status === "shipped").length,
    preparing: shipments.filter((s) => s.status === "preparing").length,
    pending: shipments.filter((s) => s.status === "pending").length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">出荷管理</h1>
      </header>

      {/* サマリー */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">総出荷</p>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums">{todayShipments.totalBoxes}</p>
          <p className="text-xs sm:text-sm text-gray-400">箱</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-emerald-600 mb-1">出荷完了</p>
          <p className="text-3xl sm:text-4xl font-bold text-emerald-700 tabular-nums">{statusCounts.shipped}</p>
          <p className="text-xs sm:text-sm text-emerald-500">件</p>
        </div>
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-blue-600 mb-1">準備中</p>
          <p className="text-3xl sm:text-4xl font-bold text-blue-700 tabular-nums">{statusCounts.preparing}</p>
          <p className="text-xs sm:text-sm text-blue-500">件</p>
        </div>
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">待機中</p>
          <p className="text-3xl sm:text-4xl font-bold text-gray-700 tabular-nums">{statusCounts.pending}</p>
          <p className="text-xs sm:text-sm text-gray-400">件</p>
        </div>
      </div>

      {/* 品目別出荷数 */}
      <div className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">品目別出荷数</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {todayShipments.items.map((item) => (
            <div key={item.productId} className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">{item.productName}</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{item.boxes}</p>
              <p className="text-xs text-gray-400">{item.packs}パック</p>
            </div>
          ))}
        </div>
      </div>

      {/* 出荷リスト */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">納入先別出荷</h2>
        {shipments.map((s) => (
          <div
            key={s.customerId}
            className={`rounded-2xl border p-4 transition-all ${
              s.status === "shipped"
                ? "bg-emerald-50 border-emerald-200"
                : s.status === "preparing"
                ? "bg-blue-50 border-blue-200"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            {/* Mobile Layout */}
            <div className="sm:hidden">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      s.status === "shipped"
                        ? "bg-emerald-500 text-white"
                        : s.status === "preparing"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s.status === "shipped" ? (
                      <Check className="h-5 w-5" />
                    ) : s.status === "preparing" ? (
                      <Package className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{s.customerName}</p>
                    <p className="text-xs text-gray-500">{s.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.boxes}</p>
                  <p className="text-xs text-gray-400">箱</p>
                </div>
              </div>
              <div className="flex justify-end">
                {s.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(s.customerId, "preparing")}
                    className="bg-blue-500 hover:bg-blue-600 w-full"
                  >
                    準備開始
                  </Button>
                )}
                {s.status === "preparing" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(s.customerId, "shipped")}
                    className="bg-emerald-500 hover:bg-emerald-600 w-full"
                  >
                    <Truck className="h-4 w-4 mr-1" />
                    出荷完了
                  </Button>
                )}
                {s.status === "shipped" && (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-200 text-emerald-800 text-sm font-medium">
                    出荷済み
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    s.status === "shipped"
                      ? "bg-emerald-500 text-white"
                      : s.status === "preparing"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s.status === "shipped" ? (
                    <Check className="h-5 w-5" />
                  ) : s.status === "preparing" ? (
                    <Package className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{s.customerName}</p>
                  <p className="text-sm text-gray-500">出荷予定: {s.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.boxes}</p>
                  <p className="text-sm text-gray-500">箱</p>
                </div>

                <div className="flex gap-2">
                  {s.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(s.customerId, "preparing")}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      準備開始
                    </Button>
                  )}
                  {s.status === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(s.customerId, "shipped")}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Truck className="h-4 w-4 mr-1" />
                      出荷完了
                    </Button>
                  )}
                  {s.status === "shipped" && (
                    <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 text-sm font-medium">
                      出荷済み
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
