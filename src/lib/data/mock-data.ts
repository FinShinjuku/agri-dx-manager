// 開発用モックデータ
import { format, subDays, addDays } from "date-fns";

// 商品マスタ
export const products = [
  { id: "1", code: "TM001", name: "豆苗", unit: "パック", unitPrice: 98, growthDays: 7 },
  { id: "2", code: "KS001", name: "カイワレS", unit: "パック", unitPrice: 48, growthDays: 5 },
  { id: "3", code: "KW001", name: "カイワレW", unit: "パック", unitPrice: 68, growthDays: 5 },
  { id: "4", code: "BR001", name: "ブロッコリー", unit: "パック", unitPrice: 128, growthDays: 6 },
] as const;

// 納入先マスタ
export const customers = [
  { id: "1", code: "C001", name: "新潟中央青果" },
  { id: "2", code: "C002", name: "R&Cなかの青果" },
  { id: "3", code: "C003", name: "ウオロク" },
  { id: "4", code: "C004", name: "原信ナルス" },
  { id: "5", code: "C005", name: "キューピット" },
  { id: "6", code: "C006", name: "清水フードセンター" },
  { id: "7", code: "C007", name: "ピアレマート" },
  { id: "8", code: "C008", name: "マルイ" },
  { id: "9", code: "C009", name: "コメリ" },
  { id: "10", code: "C010", name: "ドジャース" },
] as const;

// 品目ごとの目標在庫数
export const targetInventory: Record<string, number> = {
  "1": 150,  // 豆苗
  "2": 200,  // カイワレS
  "3": 120,  // カイワレW
  "4": 100,  // ブロッコリー
};

// 本日の出荷データ（品目別箱数）
export function getTodayShipments() {
  const today = format(new Date(), "yyyy-MM-dd");
  return {
    date: today,
    items: [
      { productId: "1", productName: "豆苗", boxes: 145, packs: 1160, unitPrice: 98 },
      { productId: "2", productName: "カイワレS", boxes: 82, packs: 984, unitPrice: 48 },
      { productId: "3", productName: "カイワレW", boxes: 56, packs: 672, unitPrice: 68 },
      { productId: "4", productName: "ブロッコリー", boxes: 38, packs: 456, unitPrice: 128 },
    ],
    totalBoxes: 321,
    totalSales: 236432,
  };
}

// 納入先別出荷ステータス
export function getShipmentsByCustomer() {
  return [
    { customerId: "1", customerName: "新潟中央青果", status: "shipped", boxes: 45, time: "06:30" },
    { customerId: "2", customerName: "R&Cなかの青果", status: "shipped", boxes: 32, time: "07:00" },
    { customerId: "3", customerName: "ウオロク", status: "preparing", boxes: 58, time: "08:00" },
    { customerId: "4", customerName: "原信ナルス", status: "preparing", boxes: 42, time: "08:30" },
    { customerId: "5", customerName: "キューピット", status: "pending", boxes: 28, time: "09:00" },
    { customerId: "6", customerName: "清水フードセンター", status: "pending", boxes: 35, time: "09:30" },
    { customerId: "7", customerName: "ピアレマート", status: "pending", boxes: 22, time: "10:00" },
    { customerId: "8", customerName: "マルイ", status: "pending", boxes: 31, time: "10:30" },
    { customerId: "9", customerName: "コメリ", status: "pending", boxes: 18, time: "11:00" },
    { customerId: "10", customerName: "ドジャース", status: "pending", boxes: 10, time: "11:30" },
  ];
}

// 在庫データ（3日経過で廃棄）
export function getInventoryWithExpiry() {
  const today = new Date();

  return {
    summary: [
      {
        productId: "1",
        productName: "豆苗",
        unitPrice: 98,
        targetInventory: targetInventory["1"],
        inventory: [
          { date: format(today, "yyyy-MM-dd"), daysOld: 0, quantity: 50, status: "fresh" },
          { date: format(subDays(today, 1), "yyyy-MM-dd"), daysOld: 1, quantity: 65, status: "fresh" },
          { date: format(subDays(today, 2), "yyyy-MM-dd"), daysOld: 2, quantity: 35, status: "warning" },
          { date: format(subDays(today, 3), "yyyy-MM-dd"), daysOld: 3, quantity: 10, status: "expiring" },
        ],
        totalStock: 160,
        expiringToday: 10,
        estimatedLoss: 980, // 10 * 98
      },
      {
        productId: "2",
        productName: "カイワレS",
        unitPrice: 48,
        targetInventory: targetInventory["2"],
        inventory: [
          { date: format(today, "yyyy-MM-dd"), daysOld: 0, quantity: 70, status: "fresh" },
          { date: format(subDays(today, 1), "yyyy-MM-dd"), daysOld: 1, quantity: 80, status: "fresh" },
          { date: format(subDays(today, 2), "yyyy-MM-dd"), daysOld: 2, quantity: 45, status: "warning" },
          { date: format(subDays(today, 3), "yyyy-MM-dd"), daysOld: 3, quantity: 15, status: "expiring" },
        ],
        totalStock: 210,
        expiringToday: 15,
        estimatedLoss: 720, // 15 * 48
      },
      {
        productId: "3",
        productName: "カイワレW",
        unitPrice: 68,
        targetInventory: targetInventory["3"],
        inventory: [
          { date: format(today, "yyyy-MM-dd"), daysOld: 0, quantity: 35, status: "fresh" },
          { date: format(subDays(today, 1), "yyyy-MM-dd"), daysOld: 1, quantity: 45, status: "fresh" },
          { date: format(subDays(today, 2), "yyyy-MM-dd"), daysOld: 2, quantity: 28, status: "warning" },
          { date: format(subDays(today, 3), "yyyy-MM-dd"), daysOld: 3, quantity: 7, status: "expiring" },
        ],
        totalStock: 115,
        expiringToday: 7,
        estimatedLoss: 476, // 7 * 68
      },
      {
        productId: "4",
        productName: "ブロッコリー",
        unitPrice: 128,
        targetInventory: targetInventory["4"],
        inventory: [
          { date: format(today, "yyyy-MM-dd"), daysOld: 0, quantity: 30, status: "fresh" },
          { date: format(subDays(today, 1), "yyyy-MM-dd"), daysOld: 1, quantity: 35, status: "fresh" },
          { date: format(subDays(today, 2), "yyyy-MM-dd"), daysOld: 2, quantity: 25, status: "warning" },
          { date: format(subDays(today, 3), "yyyy-MM-dd"), daysOld: 3, quantity: 5, status: "expiring" },
        ],
        totalStock: 95,
        expiringToday: 5,
        estimatedLoss: 640, // 5 * 128
      },
    ],
    totalExpiringToday: 37,
    totalEstimatedLoss: 2816,
  };
}


// 今朝の種付け指示
export function getSeedingInstructions() {
  const harvestDate = addDays(new Date(), 7); // 収穫予定日

  return {
    date: format(new Date(), "yyyy-MM-dd"),
    harvestDate: format(harvestDate, "yyyy-MM-dd"),
    instructions: [
      {
        productId: "1",
        productName: "豆苗",
        trays: 48,
        estimatedYield: 384, // 1トレイ8パック
        growthDays: 7,
        notes: "温度管理注意"
      },
      {
        productId: "2",
        productName: "カイワレS",
        trays: 36,
        estimatedYield: 432, // 1トレイ12パック
        growthDays: 5,
        notes: ""
      },
      {
        productId: "3",
        productName: "カイワレW",
        trays: 24,
        estimatedYield: 288,
        growthDays: 5,
        notes: ""
      },
      {
        productId: "4",
        productName: "ブロッコリー",
        trays: 18,
        estimatedYield: 216,
        growthDays: 6,
        notes: "水分多め"
      },
    ],
    totalTrays: 126,
    totalEstimatedYield: 1320,
  };
}

// 週間受注サマリー
export function getWeeklyOrderSummary() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseOrders = isWeekend ? 180 : 320;

    return {
      date: format(date, "yyyy-MM-dd"),
      dayOfWeek: format(date, "E"),
      totalOrders: baseOrders + Math.floor(Math.random() * 50),
      豆苗: Math.floor(baseOrders * 0.4) + Math.floor(Math.random() * 20),
      カイワレS: Math.floor(baseOrders * 0.25) + Math.floor(Math.random() * 15),
      カイワレW: Math.floor(baseOrders * 0.2) + Math.floor(Math.random() * 10),
      ブロッコリー: Math.floor(baseOrders * 0.15) + Math.floor(Math.random() * 10),
    };
  });
}

// 売上サマリー
export function getSalesSummary() {
  return {
    today: 236432,
    yesterday: 218650,
    thisWeek: 1524800,
    lastWeek: 1489200,
    thisMonth: 6245000,
    lastMonth: 5980000,
    change: {
      daily: ((236432 - 218650) / 218650 * 100).toFixed(1),
      weekly: ((1524800 - 1489200) / 1489200 * 100).toFixed(1),
      monthly: ((6245000 - 5980000) / 5980000 * 100).toFixed(1),
    }
  };
}

// 昨日の予実データ
export function getPredictedVsActual() {
  return [
    {
      productId: "1",
      productName: "豆苗",
      predicted: 1200,
      actual: 1160,
      variance: -40,
    },
    {
      productId: "2",
      productName: "カイワレS",
      predicted: 960,
      actual: 984,
      variance: 24,
    },
    {
      productId: "3",
      productName: "カイワレW",
      predicted: 700,
      actual: 672,
      variance: -28,
    },
    {
      productId: "4",
      productName: "ブロッコリー",
      predicted: 450,
      actual: 456,
      variance: 6,
    },
  ];
}

// 本日の仕込み量計算
export function calculateSeedingAmount() {
  const inventory = getInventoryWithExpiry();
  const predictedVsActual = getPredictedVsActual();

  return inventory.summary.map((product) => {
    const target = targetInventory[product.productId] || 0;
    const currentStock = product.totalStock;
    const predicted = predictedVsActual.find(p => p.productId === product.productId)?.predicted || 0;
    // 仕込み量 = 予測出荷数 + (目標在庫 - 現在在庫)
    const seedingAmount = Math.max(0, predicted + (target - currentStock));

    return {
      productId: product.productId,
      productName: product.productName,
      seedingAmount,
      targetStock: target,
      currentStock,
      stockDifference: target - currentStock,
      // 仕込み画面用の追加プロパティ
      targetInventory: target,
      currentInventory: currentStock,
      breakdown: `予測${predicted} + (目標${target} - 現在${currentStock}) = ${seedingAmount}`,
    };
  });
}
