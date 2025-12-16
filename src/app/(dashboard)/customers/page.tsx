"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Plus, Search, Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customers } from "@/lib/data/mock-data";

// 拡張した顧客データ
const customersData = customers.map((c, i) => ({
  ...c,
  contactName: ["佐藤", "田中", "山田", "鈴木", "高橋", "伊藤", "渡辺", "中村", "小林", "加藤"][i] + "様",
  phone: `025-XXX-${String(i + 1).padStart(4, "0")}`,
  email: `contact${i + 1}@example.com`,
  address: `新潟市中央区〇〇町${i + 1}-${i + 1}`,
  lastOrder: new Date(2024, 11, 15 - i),
  monthlyAvg: 50000 + Math.floor(Math.random() * 100000),
  isActive: true,
}));

export default function CustomersPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const filteredCustomers = customersData.filter(
    (c) =>
      c.name.includes(search) ||
      c.contactName.includes(search) ||
      c.code.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{today}</p>
          <h1 className="text-3xl font-bold text-gray-900">納入先管理</h1>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          新規登録
        </Button>
      </div>

      {/* 検索 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="納入先名、担当者名、コードで検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* サマリー */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-6 text-center">
          <p className="text-gray-500 mb-1">登録納入先</p>
          <p className="text-5xl font-bold text-gray-900">{customersData.length}</p>
          <p className="text-gray-400">件</p>
        </div>
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
          <p className="text-green-600 mb-1">取引中</p>
          <p className="text-5xl font-bold text-green-700">
            {customersData.filter((c) => c.isActive).length}
          </p>
          <p className="text-green-500">件</p>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-6 text-center">
          <p className="text-gray-500 mb-1">月間平均売上</p>
          <p className="text-3xl font-bold text-gray-900">
            ¥{Math.round(
              customersData.reduce((sum, c) => sum + c.monthlyAvg, 0) / customersData.length
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* 顧客リスト */}
      <div className="space-y-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-xl bg-white border border-gray-200 overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setSelectedCustomer(
                  selectedCustomer === customer.id ? null : customer.id
                )
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{customer.code}</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {customer.name}
                    </h3>
                    {customer.isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                        取引中
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{customer.contactName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">月間平均</p>
                  <p className="text-xl font-bold text-gray-900">
                    ¥{customer.monthlyAvg.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* 詳細 */}
            {selectedCustomer === customer.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{customer.address}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      最終注文: {format(customer.lastOrder, "yyyy/M/d", { locale: ja })}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    編集
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    削除
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
