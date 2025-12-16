import Link from "next/link";
import { Plus, ClipboardList, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// モック: 最近の注文履歴
const recentOrders = [
  { id: "ORD-2024-001", date: "2024-12-16", status: "確定", total: 12500 },
  { id: "ORD-2024-002", date: "2024-12-15", status: "出荷済", total: 18200 },
  { id: "ORD-2024-003", date: "2024-12-14", status: "出荷済", total: 9800 },
];

export default function OrdersPortalPage() {
  return (
    <div className="space-y-8">
      {/* 顧客情報 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">ようこそ</p>
            <h2 className="text-xl font-semibold text-gray-900">新潟中央青果 様</h2>
          </div>
          <Link href="/portal/orders/new">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              新規発注
            </Button>
          </Link>
        </div>
      </div>

      {/* メニューカード */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/portal/orders/new">
          <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-green-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">新規発注</CardTitle>
                  <CardDescription>商品を選択して発注する</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/portal/orders/history">
          <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-blue-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">発注履歴</CardTitle>
                  <CardDescription>過去の発注を確認する</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* 最近の注文 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            最近の発注
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ¥{order.total.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === "出荷済"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
