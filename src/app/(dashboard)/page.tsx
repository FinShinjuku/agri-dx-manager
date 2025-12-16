import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { AlertTriangle } from "lucide-react";
import {
  getTodayShipments,
  getInventoryWithExpiry,
  getSeedingInstructions,
  getShipmentsByCustomer,
  getPredictedVsActual,
  calculateSeedingAmount,
} from "@/lib/data/mock-data";

export default function DashboardPage() {
  const today = format(new Date(), "M月d日(E)", { locale: ja });
  const shipments = getTodayShipments();
  const inventory = getInventoryWithExpiry();
  const seeding = getSeedingInstructions();
  const customerShipments = getShipmentsByCustomer();
  const predictedVsActual = getPredictedVsActual();
  const seedingAmounts = calculateSeedingAmount();

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
      </div>

      {/* 損失アラート */}
      {inventory.totalEstimatedLoss > 0 && (
        <div className="flex items-center gap-4 rounded-xl bg-red-50 border border-red-200 p-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <p className="font-medium text-red-800">本日廃棄予定</p>
            <p className="text-2xl font-bold text-red-600">
              {inventory.totalExpiringToday}パック / ¥{inventory.totalEstimatedLoss.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* 昨日の予実 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">昨日の予実</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {predictedVsActual.map((item) => (
            <div
              key={item.productId}
              className="rounded-xl bg-white border border-gray-200 p-6"
            >
              <p className="text-gray-600 mb-3">{item.productName}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">予測</span>
                  <span className="font-medium text-gray-900">{item.predicted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">実績</span>
                  <span className="font-medium text-gray-900">{item.actual}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-500">差異</span>
                  <span className={`font-bold ${item.variance > 0 ? 'text-green-600' : item.variance < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.variance > 0 ? '+' : ''}{item.variance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 本日の仕込み */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">本日の仕込み</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {seedingAmounts.map((item) => (
            <div
              key={item.productId}
              className="rounded-xl bg-white border border-gray-200 p-6"
            >
              <p className="text-gray-600 mb-2">{item.productName}</p>
              <p className="text-5xl font-bold text-gray-900">{item.seedingAmount}</p>
              <p className="text-gray-400 mt-1">トレイ</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>目標在庫</span>
                  <span>{item.targetStock}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>現在在庫</span>
                  <span>{item.currentStock}</span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-gray-500">差異</span>
                  <span className={`font-bold ${item.stockDifference > 0 ? 'text-green-600' : item.stockDifference < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.stockDifference > 0 ? '+' : ''}{item.stockDifference}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 本日の出荷 */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">本日の出荷</h2>
          <p className="text-gray-500">
            計 <span className="text-2xl font-bold text-gray-900">{shipments.totalBoxes}</span> 箱
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {shipments.items.map((item) => (
            <div
              key={item.productId}
              className="rounded-xl bg-white border border-gray-200 p-6"
            >
              <p className="text-gray-600 mb-2">{item.productName}</p>
              <p className="text-4xl font-bold text-gray-900">{item.boxes}<span className="text-lg text-gray-400 ml-1">箱</span></p>
              <p className="text-sm text-gray-400 mt-1">{item.packs}パック</p>
            </div>
          ))}
        </div>
      </section>

      {/* 在庫状況 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">在庫状況</h2>
        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-600">品目</th>
                <th className="text-right p-4 font-medium text-gray-600">本日</th>
                <th className="text-right p-4 font-medium text-gray-600">1日前</th>
                <th className="text-right p-4 font-medium text-gray-600">2日前</th>
                <th className="text-right p-4 font-medium text-red-600">廃棄</th>
                <th className="text-right p-4 font-medium text-gray-600">合計</th>
              </tr>
            </thead>
            <tbody>
              {inventory.summary.map((product) => (
                <tr key={product.productId} className="border-b border-gray-50 last:border-0">
                  <td className="p-4 font-medium text-gray-900">{product.productName}</td>
                  {product.inventory.map((inv, idx) => (
                    <td
                      key={idx}
                      className={`p-4 text-right tabular-nums ${
                        inv.status === "expiring" ? "text-red-600 font-bold" : "text-gray-700"
                      }`}
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
      </section>

      {/* 出荷状況 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">出荷状況</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {customerShipments.map((s) => (
            <div
              key={s.customerId}
              className={`flex items-center justify-between rounded-xl p-4 ${
                s.status === "shipped"
                  ? "bg-green-50 border border-green-200"
                  : s.status === "preparing"
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    s.status === "shipped"
                      ? "bg-green-500"
                      : s.status === "preparing"
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                />
                <span className="font-medium text-gray-900">{s.customerName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{s.time}</span>
                <span className="font-bold text-gray-900">{s.boxes}箱</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
