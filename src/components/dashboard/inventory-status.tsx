"use client";

import { AlertTriangle, Package } from "lucide-react";
import { getInventoryWithExpiry } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

const statusStyles = {
  fresh: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  expiring: "bg-red-100 text-red-700",
};

const statusLabels = {
  fresh: "良好",
  warning: "注意",
  expiring: "要廃棄",
};

export function InventoryStatus() {
  const data = getInventoryWithExpiry();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-3">
            <Package className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">在庫状況</h3>
            <p className="text-sm text-gray-500">3日経過で廃棄</p>
          </div>
        </div>
      </div>

      {/* 損失見込みアラート */}
      {data.totalEstimatedLoss > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 p-4">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">
              本日廃棄予定: {data.totalExpiringToday}パック
            </p>
            <p className="text-lg font-bold text-red-600">
              損失見込み: ¥{data.totalEstimatedLoss.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.summary.map((product) => (
          <div key={product.productId} className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">{product.productName}</span>
              <span className="text-sm text-gray-500">
                総在庫: {product.totalStock}パック
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.inventory.map((inv) => (
                <div
                  key={inv.date}
                  className={cn(
                    "rounded-lg p-2 text-center",
                    statusStyles[inv.status as keyof typeof statusStyles]
                  )}
                >
                  <p className="text-xs font-medium">
                    {inv.daysOld === 0 ? "本日" : `${inv.daysOld}日前`}
                  </p>
                  <p className="text-lg font-bold">{inv.quantity}</p>
                  <p className="text-xs">{statusLabels[inv.status as keyof typeof statusLabels]}</p>
                </div>
              ))}
            </div>

            {product.expiringToday > 0 && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-red-600 font-medium">
                  廃棄: {product.expiringToday}パック
                </span>
                <span className="text-red-600 font-bold">
                  -¥{product.estimatedLoss.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
