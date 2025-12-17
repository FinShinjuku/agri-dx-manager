"use client";

import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { ja } from "date-fns/locale";
import { Check, X, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "confirmed" | "shipped" | "cancelled";

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  orderDate: Date;
  deliveryDate: Date;
  status: OrderStatus;
  items: { productName: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

// モック受注データ
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "1",
    customerName: "新潟中央青果",
    orderDate: new Date(),
    deliveryDate: addDays(new Date(), 1),
    status: "pending",
    items: [
      { productName: "豆苗", quantity: 80, unitPrice: 98 },
      { productName: "カイワレS", quantity: 40, unitPrice: 48 },
    ],
    totalAmount: 9760,
  },
  {
    id: "ORD-002",
    customerId: "2",
    customerName: "R&Cなかの青果",
    orderDate: new Date(),
    deliveryDate: addDays(new Date(), 1),
    status: "confirmed",
    items: [
      { productName: "豆苗", quantity: 60, unitPrice: 98 },
      { productName: "ブロッコリー", quantity: 30, unitPrice: 128 },
    ],
    totalAmount: 9720,
  },
  {
    id: "ORD-003",
    customerId: "3",
    customerName: "ウオロク",
    orderDate: addDays(new Date(), -1),
    deliveryDate: new Date(),
    status: "shipped",
    items: [
      { productName: "豆苗", quantity: 100, unitPrice: 98 },
      { productName: "カイワレW", quantity: 50, unitPrice: 68 },
    ],
    totalAmount: 13200,
  },
];

const statusConfig = {
  pending: { label: "未確認", bg: "bg-amber-100", text: "text-amber-800" },
  confirmed: { label: "確定", bg: "bg-blue-100", text: "text-blue-800" },
  shipped: { label: "出荷済", bg: "bg-emerald-100", text: "text-emerald-800" },
  cancelled: { label: "キャンセル", bg: "bg-gray-100", text: "text-gray-800" },
};

export default function OrdersPage() {
  const [today, setToday] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    setToday(format(new Date(), "M月d日(E)", { locale: ja }));
  }, []);

  const confirmOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o): Order => (o.id === orderId ? { ...o, status: "confirmed" } : o))
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o): Order => (o.id === orderId ? { ...o, status: "cancelled" } : o))
    );
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <header className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">受注管理</h1>
      </header>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-amber-600 mb-1">未確認</p>
          <p className="text-3xl sm:text-5xl font-bold text-amber-700 tabular-nums">{pendingCount}</p>
          <p className="text-xs sm:text-sm text-amber-500">件</p>
        </div>
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-3 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-blue-600 mb-1">確定済</p>
          <p className="text-3xl sm:text-5xl font-bold text-blue-700 tabular-nums">{confirmedCount}</p>
          <p className="text-xs sm:text-sm text-blue-500">件</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-3 sm:p-6 text-center shadow-sm">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">本日売上</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900 tabular-nums">
            ¥{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* 受注リスト */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">受注一覧</h2>
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        statusConfig[order.status].bg,
                        statusConfig[order.status].text
                      )}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {order.id} / 納品: {format(order.deliveryDate, "M/d(E)", { locale: ja })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">
                    ¥{order.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}パック
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="flex-1"
                >
                  {selectedOrder === order.id ? (
                    <ChevronUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-1" />
                  )}
                  詳細
                </Button>
                {order.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => confirmOrder(order.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 flex-1"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      確定
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelOrder(order.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          statusConfig[order.status].bg,
                          statusConfig[order.status].text
                        )}
                      >
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.id} / 納品: {format(order.deliveryDate, "M/d(E)", { locale: ja })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 tabular-nums">
                      ¥{order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)}パック
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {order.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => confirmOrder(order.id)}
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          確定
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => cancelOrder(order.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細 */}
            {selectedOrder === order.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-700">{item.productName}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{item.quantity}個 × ¥{item.unitPrice}</span>
                        <span className="font-semibold text-gray-900 tabular-nums">
                          ¥{(item.quantity * item.unitPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
