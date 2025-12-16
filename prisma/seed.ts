import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 商品マスタ
  const products = await Promise.all([
    prisma.product.upsert({
      where: { code: "TM001" },
      update: {},
      create: {
        code: "TM001",
        name: "豆苗",
        description: "栄養豊富な豆苗。サラダや炒め物に最適。",
        unit: "パック",
        unitPrice: 98,
        growthDays: 7,
      },
    }),
    prisma.product.upsert({
      where: { code: "KS001" },
      update: {},
      create: {
        code: "KS001",
        name: "カイワレS",
        description: "シングルパックのカイワレ大根。",
        unit: "パック",
        unitPrice: 48,
        growthDays: 5,
      },
    }),
    prisma.product.upsert({
      where: { code: "KW001" },
      update: {},
      create: {
        code: "KW001",
        name: "カイワレW",
        description: "ダブルパックのカイワレ大根。",
        unit: "パック",
        unitPrice: 68,
        growthDays: 5,
      },
    }),
    prisma.product.upsert({
      where: { code: "BR001" },
      update: {},
      create: {
        code: "BR001",
        name: "ブロッコリー",
        description: "栄養価の高いブロッコリースプラウト。",
        unit: "パック",
        unitPrice: 128,
        growthDays: 6,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // 納入先マスタ
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { code: "C001" },
      update: {},
      create: {
        code: "C001",
        name: "新潟中央青果",
        contactName: "佐藤太郎",
        phone: "025-XXX-0001",
        email: "sato@niigata-seika.example.com",
        postalCode: "950-0001",
        address: "新潟市中央区〇〇町1-1-1",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C002" },
      update: {},
      create: {
        code: "C002",
        name: "R&Cなかの青果",
        contactName: "中野次郎",
        phone: "025-XXX-0002",
        email: "nakano@rc-seika.example.com",
        postalCode: "950-0002",
        address: "新潟市中央区〇〇町2-2-2",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C003" },
      update: {},
      create: {
        code: "C003",
        name: "ウオロク",
        contactName: "山田三郎",
        phone: "025-XXX-0003",
        email: "yamada@uoroku.example.com",
        postalCode: "950-0003",
        address: "新潟市中央区〇〇町3-3-3",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C004" },
      update: {},
      create: {
        code: "C004",
        name: "原信ナルス",
        contactName: "田中四郎",
        phone: "025-XXX-0004",
        email: "tanaka@harashin.example.com",
        postalCode: "950-0004",
        address: "新潟市中央区〇〇町4-4-4",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C005" },
      update: {},
      create: {
        code: "C005",
        name: "キューピット",
        contactName: "鈴木五郎",
        phone: "025-XXX-0005",
        email: "suzuki@qpid.example.com",
        postalCode: "950-0005",
        address: "新潟市中央区〇〇町5-5-5",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C006" },
      update: {},
      create: {
        code: "C006",
        name: "清水フードセンター",
        contactName: "伊藤六郎",
        phone: "025-XXX-0006",
        email: "ito@shimizu-food.example.com",
        postalCode: "950-0006",
        address: "新潟市中央区〇〇町6-6-6",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C007" },
      update: {},
      create: {
        code: "C007",
        name: "ピアレマート",
        contactName: "渡辺七郎",
        phone: "025-XXX-0007",
        email: "watanabe@piare.example.com",
        postalCode: "950-0007",
        address: "新潟市中央区〇〇町7-7-7",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C008" },
      update: {},
      create: {
        code: "C008",
        name: "マルイ",
        contactName: "加藤八郎",
        phone: "025-XXX-0008",
        email: "kato@marui.example.com",
        postalCode: "950-0008",
        address: "新潟市中央区〇〇町8-8-8",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C009" },
      update: {},
      create: {
        code: "C009",
        name: "コメリ",
        contactName: "高橋九郎",
        phone: "025-XXX-0009",
        email: "takahashi@komeri.example.com",
        postalCode: "950-0009",
        address: "新潟市中央区〇〇町9-9-9",
      },
    }),
    prisma.customer.upsert({
      where: { code: "C010" },
      update: {},
      create: {
        code: "C010",
        name: "ドジャース",
        contactName: "小林十郎",
        phone: "025-XXX-0010",
        email: "kobayashi@dodgers.example.com",
        postalCode: "950-0010",
        address: "新潟市中央区〇〇町10-10-10",
      },
    }),
  ]);

  console.log(`✅ Created ${customers.length} customers`);

  // 管理者ユーザー
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@sprout-farm.example.com" },
    update: {},
    create: {
      email: "admin@sprout-farm.example.com",
      name: "田中 工場長",
      role: "FACTORY_MANAGER",
      password: "hashed_password_placeholder", // 実際にはハッシュ化されたパスワード
    },
  });

  console.log(`✅ Created admin user: ${adminUser.name}`);

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
