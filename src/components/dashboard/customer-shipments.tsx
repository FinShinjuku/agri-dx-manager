"use client";

import { Truck, CheckCircle, Clock, Package } from "lucide-react";
import { getShipmentsByCustomer } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  shipped: {
    label: "出荷完了",
    icon: CheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
    iconColor: "text-green-600",
  },
  preparing: {
    label: "準備中",
    icon: Package,
    bg: "bg-blue-100",
    text: "text-blue-700",
    iconColor: "text-blue-600",
  },
  pending: {
    label: "待機中",
    icon: Clock,
    bg: "bg-gray-100",
    text: "text-gray-700",
    iconColor: "text-gray-400",
  },
};

export function CustomerShipments() {
  const shipments = getShipmentsByCustomer();

  const shippedCount = shipments.filter((s) => s.status === "shipped").length;
  const preparingCount = shipments.filter((s) => s.status === "preparing").length;
  const pendingCount = shipments.filter((s) => s.status === "pending").length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">納入先別出荷状況</h3>
            <p className="text-sm text-gray-500">全{shipments.length}件</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-gray-600">完了 {shippedCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-gray-600">準備中 {preparingCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="text-gray-600">待機 {pendingCount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {shipments.map((shipment) => {
          const config = statusConfig[shipment.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div
              key={shipment.customerId}
              className={cn(
                "flex items-center justify-between rounded-xl p-3 transition-colors",
                shipment.status === "shipped" ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <StatusIcon className={cn("h-5 w-5", config.iconColor)} />
                <div>
                  <p className="font-medium text-gray-900">{shipment.customerName}</p>
                  <p className="text-xs text-gray-500">出荷予定: {shipment.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">
                  {shipment.boxes}箱
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    config.bg,
                    config.text
                  )}
                >
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
