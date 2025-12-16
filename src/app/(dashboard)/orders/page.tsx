"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { ja } from "date-fns/locale";
import { Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customers, products } from "@/lib/data/mock-data";

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
  shipped: { label: "出荷済", bg: "bg-green-100", text: "text-green-800" },
  cancelled: { label: "キャンセル", bg: "bg-gray-100", text: "text-gray-800" },
};

export default function OrdersPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

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
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-3xl font-bold text-gray-900">受注管理</h1>
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
          <p className="text-amber-600 mb-1">未確認</p>
          <p className="text-5xl font-bold text-amber-700">{pendingCount}</p>
          <p className="text-amber-500">件</p>
        </div>
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 text-center">
          <p className="text-blue-600 mb-1">確定済</p>
          <p className="text-5xl font-bold text-blue-700">{confirmedCount}</p>
          <p className="text-blue-500">件</p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-6 text-center">
          <p className="text-gray-500 mb-1">本日売上</p>
          <p className="text-4xl font-bold text-gray-900">
            ¥{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* 受注リスト */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white border border-gray-200 overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusConfig[order.status].bg
                      } ${statusConfig[order.status].text}`}
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
                  <p className="text-2xl font-bold text-gray-900">
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
                    onClick={() =>
                      setSelectedOrder(selectedOrder === order.id ? null : order.id)
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => confirmOrder(order.id)}
                        className="bg-green-500 hover:bg-green-600"
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

            {/* 詳細 */}
            {selectedOrder === order.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="text-left pb-2">商品</th>
                      <th className="text-right pb-2">数量</th>
                      <th className="text-right pb-2">単価</th>
                      <th className="text-right pb-2">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-1 font-medium">{item.productName}</td>
                        <td className="py-1 text-right">{item.quantity}</td>
                        <td className="py-1 text-right">¥{item.unitPrice}</td>
                        <td className="py-1 text-right font-semibold">
                          ¥{(item.quantity * item.unitPrice).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
