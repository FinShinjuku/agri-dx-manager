"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Save, User, Building, Bell, Database, Shield, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SettingsPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });

  const [companySettings, setCompanySettings] = useState({
    name: "スプラウト農園",
    phone: "025-XXX-XXXX",
    email: "info@sprout-farm.example.com",
    address: "新潟県新潟市〇〇区〇〇町1-1-1",
  });

  const [userSettings, setUserSettings] = useState({
    name: "田中 工場長",
    email: "tanaka@sprout-farm.example.com",
    role: "FACTORY_MANAGER",
  });

  const [notifications, setNotifications] = useState({
    orderReceived: true,
    lowInventory: true,
    expiryWarning: true,
    dailyReport: false,
  });

  const [productionSettings, setProductionSettings] = useState([
    { id: 1, name: "豆苗", targetInventory: 150, growthDays: 7, unitPrice: 98 },
    { id: 2, name: "カイワレS", targetInventory: 200, growthDays: 5, unitPrice: 48 },
    { id: 3, name: "カイワレW", targetInventory: 120, growthDays: 5, unitPrice: 68 },
    { id: 4, name: "ブロッコリー", targetInventory: 100, growthDays: 6, unitPrice: 128 },
  ]);

  const handleSave = () => {
    toast.success("設定を保存しました");
  };

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-3xl font-bold text-gray-900">設定</h1>
      </div>

      {/* 会社情報 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Building className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">会社情報</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              会社名
            </label>
            <Input
              value={companySettings.name}
              onChange={(e) =>
                setCompanySettings({ ...companySettings, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <Input
              value={companySettings.phone}
              onChange={(e) =>
                setCompanySettings({ ...companySettings, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <Input
              type="email"
              value={companySettings.email}
              onChange={(e) =>
                setCompanySettings({ ...companySettings, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              住所
            </label>
            <Input
              value={companySettings.address}
              onChange={(e) =>
                setCompanySettings({ ...companySettings, address: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* 生産設定 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Sprout className="h-5 w-5 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">生産設定</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">品目</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">目標在庫</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">栽培日数</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">単価</th>
              </tr>
            </thead>
            <tbody>
              {productionSettings.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4 text-gray-900">{product.name}</td>
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      value={product.targetInventory}
                      onChange={(e) => {
                        const newSettings = productionSettings.map((p) =>
                          p.id === product.id
                            ? { ...p, targetInventory: parseInt(e.target.value) || 0 }
                            : p
                        );
                        setProductionSettings(newSettings);
                      }}
                      className="w-24"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.growthDays}日</td>
                  <td className="py-3 px-4 text-gray-600">¥{product.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ユーザー情報 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">ユーザー情報</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <Input
              value={userSettings.name}
              onChange={(e) =>
                setUserSettings({ ...userSettings, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <Input
              type="email"
              value={userSettings.email}
              onChange={(e) =>
                setUserSettings({ ...userSettings, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              役割
            </label>
            <Input value="工場長" disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <Button variant="outline" className="w-full">
              パスワードを変更
            </Button>
          </div>
        </div>
      </div>

      {/* 通知設定 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">通知設定</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "orderReceived", label: "新規受注通知", desc: "新しい注文が入った時に通知" },
            { key: "lowInventory", label: "在庫不足アラート", desc: "在庫が閾値を下回った時に通知" },
            { key: "expiryWarning", label: "廃棄予定アラート", desc: "3日経過の在庫がある時に通知" },
            { key: "dailyReport", label: "日次レポート", desc: "毎日の売上・在庫サマリーを送信" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [item.key]: !notifications[item.key as keyof typeof notifications],
                  })
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications]
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    notifications[item.key as keyof typeof notifications]
                      ? "translate-x-6"
                      : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* システム設定 */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Database className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">システム設定</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">在庫有効期限</p>
              <p className="text-sm text-gray-500">この日数を過ぎると廃棄対象</p>
            </div>
            <div className="flex items-center gap-2">
              <Input type="number" defaultValue={3} className="w-20 text-center" />
              <span className="text-gray-500">日</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">最小発注リードタイム</p>
              <p className="text-sm text-gray-500">発注から納品までの最小日数</p>
            </div>
            <div className="flex items-center gap-2">
              <Input type="number" defaultValue={2} className="w-20 text-center" />
              <span className="text-gray-500">日</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">データバックアップ</p>
              <p className="text-sm text-gray-500">最終バックアップ: 2024/12/16 03:00</p>
            </div>
            <Button variant="outline">今すぐバックアップ</Button>
          </div>
        </div>
      </div>

      {/* セキュリティ */}
      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">セキュリティ</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">二要素認証</p>
              <p className="text-sm text-gray-500">より安全なログインのために推奨</p>
            </div>
            <Button variant="outline">設定する</Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">ログイン履歴</p>
              <p className="text-sm text-gray-500">最近のログイン活動を確認</p>
            </div>
            <Button variant="outline">履歴を見る</Button>
          </div>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  );
}
