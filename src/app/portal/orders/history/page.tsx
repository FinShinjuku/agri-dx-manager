"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { ja } from "date-fns/locale";
import { ArrowLeft, Eye, Download, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// モック注文履歴
const mockOrderHistory = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-2024-${String(100 - i).padStart(3, "0")}`,
  orderDate: subDays(new Date(), i),
  deliveryDate: subDays(new Date(), i - 1),
  status: i < 2 ? "confirmed" : "shipped",
  items: [
    { productName: "豆苗", quantity: 40 + Math.floor(Math.random() * 60), unitPrice: 98 },
    { productName: "カイワレS", quantity: 20 + Math.floor(Math.random() * 40), unitPrice: 48 },
    { productName: "ブロッコリー", quantity: 10 + Math.floor(Math.random() * 20), unitPrice: 128 },
  ],
  totalAmount: 8000 + Math.floor(Math.random() * 15000),
}));

const statusConfig = {
  pending: { label: "確認中", bg: "bg-amber-100", text: "text-amber-800" },
  confirmed: { label: "確定", bg: "bg-blue-100", text: "text-blue-800" },
  shipped: { label: "出荷済", bg: "bg-green-100", text: "text-green-800" },
};

export default function OrderHistoryPage() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrderHistory.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      format(order.orderDate, "yyyy/M/d").includes(search)
  );

  return (
    <div className="space-y-6">
      {/* 戻るボタン */}
      <Link
        href="/portal/orders"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        発注トップに戻る
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">発注履歴</h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          CSV出力
        </Button>
      </div>

      {/* 検索 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="注文番号、日付で検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-gray-500 text-sm">今月の発注</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockOrderHistory.filter(
              (o) => o.orderDate.getMonth() === new Date().getMonth()
            ).length}
          </p>
          <p className="text-gray-400 text-sm">件</p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 text-center">
          <p className="text-gray-500 text-sm">今月の金額</p>
          <p className="text-2xl font-bold text-gray-900">
            ¥{mockOrderHistory
              .filter((o) => o.orderDate.getMonth() === new Date().getMonth())
              .reduce((sum, o) => sum + o.totalAmount, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-green-600 text-sm">出荷完了</p>
          <p className="text-3xl font-bold text-green-700">
            {mockOrderHistory.filter((o) => o.status === "shipped").length}
          </p>
          <p className="text-green-500 text-sm">件</p>
        </div>
      </div>

      {/* 注文リスト */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white border border-gray-200 overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setSelectedOrder(selectedOrder === order.id ? null : order.id)
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusConfig[order.status as keyof typeof statusConfig].bg
                      } ${statusConfig[order.status as keyof typeof statusConfig].text}`}
                    >
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    発注日: {format(order.orderDate, "yyyy/M/d(E)", { locale: ja })}
                    {" / "}
                    納品日: {format(order.deliveryDate, "yyyy/M/d(E)", { locale: ja })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-gray-900">
                    ¥{order.totalAmount.toLocaleString()}
                  </p>
                  <Eye className="h-5 w-5 text-gray-400" />
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
                  <tfoot>
                    <tr className="border-t border-gray-200">
                      <td colSpan={3} className="pt-2 text-right font-medium">
                        合計
                      </td>
                      <td className="pt-2 text-right text-lg font-bold text-green-600">
                        ¥{order.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
