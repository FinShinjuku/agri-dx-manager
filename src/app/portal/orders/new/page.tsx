"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data/mock-data";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [deliveryDate, setDeliveryDate] = useState<Date>(addDays(new Date(), 2));
  const [showCalendar, setShowCalendar] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    products.map((p) => ({
      productId: p.id,
      productName: p.name,
      quantity: 0,
      unitPrice: p.unitPrice,
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (productId: string, delta: number) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const setQuantity = (productId: string, value: number) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, value) }
          : item
      )
    );
  };

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleSubmit = async () => {
    if (totalItems === 0) {
      toast.error("商品を1つ以上選択してください");
      return;
    }

    setIsSubmitting(true);

    // 実際にはAPIを呼び出す
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("発注を受け付けました", {
      description: `配達希望日: ${format(deliveryDate, "M月d日(E)", { locale: ja })}`,
    });

    router.push("/portal/orders");
  };

  // 最低2日後から選択可能
  const disabledDays = (date: Date) => {
    const minDate = addDays(new Date(), 1);
    return date < minDate;
  };

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
        <h1 className="text-2xl font-bold text-gray-900">新規発注</h1>
      </div>

      {/* 配達希望日 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-green-600" />
            配達希望日
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-green-300 transition-colors"
            >
              <p className="text-sm text-gray-500">配達日</p>
              <p className="text-xl font-semibold text-gray-900">
                {format(deliveryDate, "yyyy年M月d日(E)", { locale: ja })}
              </p>
            </button>

            {showCalendar && (
              <div className="absolute top-full left-0 z-10 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={(date) => {
                    if (date) {
                      setDeliveryDate(date);
                      setShowCalendar(false);
                    }
                  }}
                  disabled={disabledDays}
                  locale={ja}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 商品選択 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            商品を選択
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.productId}
                className={cn(
                  "rounded-xl border p-4 transition-all",
                  item.quantity > 0
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      ¥{item.unitPrice}/パック
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, -10)}
                      disabled={item.quantity === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        setQuantity(item.productId, parseInt(e.target.value) || 0)
                      }
                      className="w-20 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-lg font-semibold focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
                    />

                    <button
                      onClick={() => updateQuantity(item.productId, 10)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {item.quantity > 0 && (
                  <div className="mt-3 flex items-center justify-between border-t border-green-200 pt-3">
                    <span className="text-sm text-gray-600">小計</span>
                    <span className="font-semibold text-green-700">
                      ¥{(item.quantity * item.unitPrice).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 注文サマリー */}
      <Card className="sticky bottom-4 border-green-200 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">合計</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{totalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{totalItems}パック</p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={totalItems === 0 || isSubmitting}
              className="h-14 px-8 bg-green-600 hover:bg-green-700 text-white text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  発注中...
                </span>
              ) : (
                "発注する"
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center">
            発注確定後、確認メールをお送りします
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
