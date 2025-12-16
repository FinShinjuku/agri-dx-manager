import { Sprout } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                スプラウト発注ポータル
              </h1>
              <p className="text-xs text-gray-500">Sprout Order Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {children}
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 bg-white/50">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <p className="text-center text-sm text-gray-500">
            お問い合わせ: 025-XXX-XXXX / info@sprout-farm.example.com
          </p>
        </div>
      </footer>
    </div>
  );
}
