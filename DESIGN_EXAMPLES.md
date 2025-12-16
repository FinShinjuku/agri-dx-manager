# Design System - Usage Examples

このファイルには、Jony Ive / Steve Jobs風デザインシステムの実装例を掲載しています。

## Table of Contents

1. [Hero Section](#hero-section)
2. [Feature Cards](#feature-cards)
3. [Glassmorphism](#glassmorphism)
4. [Buttons](#buttons)
5. [Forms](#forms)
6. [Navigation](#navigation)
7. [Data Display](#data-display)

---

## Hero Section

### Minimal Hero

```tsx
export default function MinimalHero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-display text-6xl md:text-7xl mb-6 animate-slideUp">
          Agriculture DX
        </h1>
        <p
          className="text-body text-xl md:text-2xl text-apple-gray-600 mb-12 animate-slideUp"
          style={{ animationDelay: '100ms' }}
        >
          シンプルで美しいUIで農業をDX化
        </p>
        <div
          className="flex gap-4 justify-center animate-slideUp"
          style={{ animationDelay: '200ms' }}
        >
          <button className="btn-primary focus-ring">
            Get Started
          </button>
          <button className="btn-secondary focus-ring">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
```

### Gradient Hero with Text Gradient

```tsx
export default function GradientHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-green-50 to-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-gradient text-display text-6xl md:text-8xl mb-6 animate-scaleIn">
          Next Generation
          <br />
          Agriculture
        </h1>
        <p className="text-body text-xl text-apple-gray-700 mb-12 max-w-2xl mx-auto animate-fadeIn">
          テクノロジーと自然の調和。<br />
          データドリブンな農業経営を実現します。
        </p>
        <button className="btn-primary focus-ring text-lg px-8 py-4 animate-float">
          無料で始める
        </button>
      </div>
    </section>
  );
}
```

---

## Feature Cards

### Three-Column Grid

```tsx
export default function FeatureGrid() {
  const features = [
    {
      title: "データ分析",
      description: "農作業のデータを収集・分析し、最適な栽培計画を立案",
      icon: "📊",
    },
    {
      title: "リアルタイム監視",
      description: "圃場の状態をリアルタイムで監視し、異常を即座に検知",
      icon: "👁️",
    },
    {
      title: "収益最適化",
      description: "市場データと連携し、収益を最大化する出荷計画を提案",
      icon: "💰",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-display text-5xl text-center mb-16 animate-slideUp">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-display text-2xl mb-4">{feature.title}</h3>
              <p className="text-body text-apple-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Horizontal Feature List

```tsx
export default function FeatureList() {
  return (
    <section className="py-24 px-4 bg-apple-gray-50">
      <div className="max-w-5xl mx-auto space-y-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideRight">
            <h3 className="text-display text-4xl mb-6">
              直感的なダッシュボード
            </h3>
            <p className="text-body text-lg text-apple-gray-700 mb-6">
              複雑なデータも一目で把握。
              Apple製品のような美しく使いやすいインターフェース。
            </p>
            <button className="btn-primary focus-ring">
              詳しく見る
            </button>
          </div>
          <div className="bg-apple-gray-200 rounded-2xl h-80 animate-slideLeft" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-apple-gray-200 rounded-2xl h-80 order-2 md:order-1 animate-slideRight" />
          <div className="order-1 md:order-2 animate-slideLeft">
            <h3 className="text-display text-4xl mb-6">
              モバイル対応
            </h3>
            <p className="text-body text-lg text-apple-gray-700 mb-6">
              スマートフォンからでも快適に操作。
              圃場からでもリアルタイムでデータを確認・入力。
            </p>
            <button className="btn-primary focus-ring">
              詳しく見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Glassmorphism

### Glass Card with Background

```tsx
export default function GlassExample() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-agri-green-400 via-agri-green-500 to-agri-green-600" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      {/* Glass Card */}
      <div className="glass-lg rounded-2xl p-12 max-w-2xl relative z-10 animate-scaleIn">
        <h2 className="text-display text-4xl text-white mb-6">
          Glassmorphism Design
        </h2>
        <p className="text-body text-lg text-white/90 mb-8">
          iOS風のガラスモーフィズムエフェクト。
          背景が透けて見える美しいデザイン。
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-agri-green-600 px-6 py-3 rounded-lg font-medium transition-smooth hover:bg-white/90 focus-ring">
            Get Started
          </button>
          <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-smooth hover:bg-white/30 backdrop-blur-sm focus-ring">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
```

### Glass Navigation

```tsx
export default function GlassNav() {
  return (
    <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 rounded-full px-8 py-4 z-50 animate-slideDown">
      <ul className="flex gap-8 items-center">
        <li>
          <a href="#" className="text-body text-sm font-medium text-apple-gray-900 hover:text-agri-green-600 transition-smooth">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-body text-sm font-medium text-apple-gray-900 hover:text-agri-green-600 transition-smooth">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="text-body text-sm font-medium text-apple-gray-900 hover:text-agri-green-600 transition-smooth">
            Pricing
          </a>
        </li>
        <li>
          <button className="btn-primary text-sm">
            Get Started
          </button>
        </li>
      </ul>
    </nav>
  );
}
```

---

## Buttons

### Button Variants

```tsx
export default function ButtonExamples() {
  return (
    <div className="p-12 space-y-8">
      {/* Primary */}
      <div className="space-y-4">
        <h3 className="text-display text-2xl">Primary Buttons</h3>
        <div className="flex gap-4">
          <button className="btn-primary focus-ring">Default</button>
          <button className="btn-primary focus-ring text-sm px-4 py-2">Small</button>
          <button className="btn-primary focus-ring text-lg px-8 py-4">Large</button>
        </div>
      </div>

      {/* Secondary */}
      <div className="space-y-4">
        <h3 className="text-display text-2xl">Secondary Buttons</h3>
        <div className="flex gap-4">
          <button className="btn-secondary focus-ring">Default</button>
          <button className="btn-secondary focus-ring text-sm px-4 py-2">Small</button>
          <button className="btn-secondary focus-ring text-lg px-8 py-4">Large</button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="space-y-4">
        <h3 className="text-display text-2xl">Icon Buttons</h3>
        <div className="flex gap-4">
          <button className="btn-primary focus-ring flex items-center gap-2">
            <span>→</span>
            Next
          </button>
          <button className="btn-secondary focus-ring flex items-center gap-2">
            Download
            <span>↓</span>
          </button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="space-y-4">
        <h3 className="text-display text-2xl">Ghost Buttons</h3>
        <div className="flex gap-4">
          <button className="text-agri-green-600 font-medium px-6 py-3 rounded-lg hover:bg-agri-green-50 transition-smooth focus-ring">
            Learn More
          </button>
          <button className="text-apple-gray-600 font-medium px-6 py-3 rounded-lg hover:bg-apple-gray-100 transition-smooth focus-ring">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Forms

### Minimal Contact Form

```tsx
export default function ContactForm() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="text-display text-5xl text-center mb-12 animate-slideUp">
          Contact Us
        </h2>
        <form className="space-y-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
          <div>
            <label htmlFor="name" className="text-body text-sm font-medium text-apple-gray-700 block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg border border-apple-gray-300 focus:border-agri-green-500 focus:ring-2 focus:ring-agri-green-100 transition-smooth outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-body text-sm font-medium text-apple-gray-700 block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-apple-gray-300 focus:border-agri-green-500 focus:ring-2 focus:ring-agri-green-100 transition-smooth outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-body text-sm font-medium text-apple-gray-700 block mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-apple-gray-300 focus:border-agri-green-500 focus:ring-2 focus:ring-agri-green-100 transition-smooth outline-none resize-none"
              placeholder="Your message"
            />
          </div>

          <button type="submit" className="btn-primary w-full focus-ring">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
```

---

## Navigation

### Minimal Top Navigation

```tsx
export default function TopNav() {
  return (
    <nav className="border-b border-apple-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-display text-2xl">
          <span className="text-gradient">AgriDX</span>
        </div>

        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <a href="#" className="text-body text-sm font-medium text-apple-gray-700 hover:text-agri-green-600 transition-smooth">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="text-body text-sm font-medium text-apple-gray-700 hover:text-agri-green-600 transition-smooth">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="text-body text-sm font-medium text-apple-gray-700 hover:text-agri-green-600 transition-smooth">
              About
            </a>
          </li>
          <li>
            <button className="btn-primary text-sm">
              Get Started
            </button>
          </li>
        </ul>

        <button className="md:hidden text-apple-gray-700">
          ☰
        </button>
      </div>
    </nav>
  );
}
```

---

## Data Display

### Stats Cards

```tsx
export default function StatsCards() {
  const stats = [
    { label: "総収穫量", value: "12.5t", change: "+8.3%", positive: true },
    { label: "圃場面積", value: "2.4ha", change: "±0%", positive: null },
    { label: "収益", value: "¥850K", change: "+12.1%", positive: true },
    { label: "作業時間", value: "142h", change: "-5.2%", positive: true },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="surface-elevated rounded-xl p-6 animate-slideUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-body text-sm text-apple-gray-600 mb-2">
                {stat.label}
              </div>
              <div className="text-display text-4xl mb-2">
                {stat.value}
              </div>
              <div className={`text-body text-sm font-medium ${
                stat.positive === true ? 'text-agri-green-600' :
                stat.positive === false ? 'text-red-600' :
                'text-apple-gray-500'
              }`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Data Table

```tsx
export default function DataTable() {
  const data = [
    { id: 1, crop: "トマト", area: "0.5ha", yield: "3.2t", status: "収穫中" },
    { id: 2, crop: "きゅうり", area: "0.8ha", yield: "4.1t", status: "栽培中" },
    { id: 3, crop: "なす", area: "0.6ha", yield: "2.8t", status: "収穫中" },
    { id: 4, crop: "ピーマン", area: "0.5ha", yield: "2.4t", status: "栽培中" },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-display text-4xl mb-12">作物一覧</h2>
        <div className="surface-elevated rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-apple-gray-100 border-b border-apple-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-body text-sm font-medium text-apple-gray-700">
                  作物
                </th>
                <th className="text-left px-6 py-4 text-body text-sm font-medium text-apple-gray-700">
                  面積
                </th>
                <th className="text-left px-6 py-4 text-body text-sm font-medium text-apple-gray-700">
                  収穫量
                </th>
                <th className="text-left px-6 py-4 text-body text-sm font-medium text-apple-gray-700">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-apple-gray-50 transition-smooth">
                  <td className="px-6 py-4 text-body font-medium">{row.crop}</td>
                  <td className="px-6 py-4 text-body text-apple-gray-600">{row.area}</td>
                  <td className="px-6 py-4 text-body text-apple-gray-600">{row.yield}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "収穫中"
                        ? "bg-agri-green-100 text-agri-green-700"
                        : "bg-apple-gray-100 text-apple-gray-700"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

---

## Complete Page Example

```tsx
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-agri-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gradient text-display text-7xl md:text-8xl mb-6 animate-scaleIn">
            Agriculture DX
          </h1>
          <p className="text-body text-xl md:text-2xl text-apple-gray-700 mb-12 animate-fadeIn max-w-2xl mx-auto">
            シンプルで美しいUIで農業をDX化。
            データドリブンな農業経営を実現します。
          </p>
          <button className="btn-primary text-lg px-8 py-4 focus-ring animate-float">
            無料で始める
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display text-5xl text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "データ分析", description: "農作業のデータを収集・分析", icon: "📊" },
              { title: "リアルタイム監視", description: "圃場の状態をリアルタイムで監視", icon: "👁️" },
              { title: "収益最適化", description: "収益を最大化する出荷計画", icon: "💰" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="card animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-display text-2xl mb-4">{feature.title}</h3>
                <p className="text-body text-apple-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-agri-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display text-5xl text-white mb-6">
            今すぐ始めましょう
          </h2>
          <p className="text-body text-xl text-white/90 mb-12">
            14日間の無料トライアル。クレジットカード不要。
          </p>
          <button className="bg-white text-agri-green-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-apple-gray-50 transition-smooth focus-ring">
            無料で始める
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-apple-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-display text-2xl mb-4 text-gradient">
            AgriDX
          </div>
          <p className="text-body text-apple-gray-400">
            © 2025 Agriculture DX Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## Tips for Implementation

### 1. Animation Delays

複数の要素を順番にアニメーションさせる:

```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-slideUp"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {item.content}
  </div>
))}
```

### 2. Responsive Design

```tsx
<div className="text-4xl md:text-6xl lg:text-8xl">
  Responsive Typography
</div>
```

### 3. Dark Mode Support

```tsx
<div className="bg-white dark:bg-apple-gray-900 text-apple-gray-900 dark:text-white">
  Auto Dark Mode
</div>
```

### 4. Custom Hover Effects

```tsx
<div className="card group">
  <h3 className="group-hover:text-agri-green-600 transition-smooth">
    Hover Me
  </h3>
</div>
```

---

これらの例を参考に、美しく機能的なUIを構築してください。
