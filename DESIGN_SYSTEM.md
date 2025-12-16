# Jony Ive / Steve Jobs Design System

極限までシンプルで美しい、Apple製品のような質感を持つデザインシステム。

## Design Philosophy

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

このデザインシステムは、Jony IveとSteve Jobsが追求した「Less is More」の哲学に基づいています。

### Core Principles

1. **Minimalism** - 必要最小限の要素で最大の効果を
2. **Clarity** - 明確で直感的なUI
3. **Precision** - ピクセルパーフェクトな実装
4. **Elegance** - 洗練された美しさ
5. **Timelessness** - 時代を超えたデザイン

---

## Color Palette

### Agricultural Green Palette
農業をテーマにした、自然で心地よいグリーン。

```css
--agri-green-50: #f0fdf4;   /* 極めて薄い */
--agri-green-100: #dcfce7;  /* 非常に薄い */
--agri-green-200: #bbf7d0;  /* 薄い */
--agri-green-300: #86efac;  /* やや薄い */
--agri-green-400: #4ade80;  /* 明るい */
--agri-green-500: #22c55e;  /* 標準 */
--agri-green-600: #16a34a;  /* やや濃い（メインアクセント） */
--agri-green-700: #15803d;  /* 濃い */
--agri-green-800: #166534;  /* 非常に濃い */
--agri-green-900: #14532d;  /* 極めて濃い */
--agri-green-950: #052e16;  /* 最も濃い */
```

### Apple Gray Palette
Appleデバイスの洗練されたニュートラルグレー。

```css
--apple-gray-50: #fafafa;   /* 極めて薄い */
--apple-gray-100: #f5f5f5;  /* 非常に薄い */
--apple-gray-200: #e5e5e5;  /* 薄い */
--apple-gray-300: #d4d4d4;  /* やや薄い */
--apple-gray-400: #a3a3a3;  /* 明るい */
--apple-gray-500: #737373;  /* 標準 */
--apple-gray-600: #525252;  /* やや濃い */
--apple-gray-700: #404040;  /* 濃い */
--apple-gray-800: #262626;  /* 非常に濃い */
--apple-gray-900: #171717;  /* 極めて濃い */
--apple-gray-950: #0a0a0a;  /* 最も濃い */
```

### Semantic Colors

```css
/* Light Mode */
--background: #ffffff;              /* ベース背景 */
--foreground: #171717;              /* テキスト */
--surface: #fafafa;                 /* カード、パネル */
--surface-elevated: #ffffff;        /* 浮き上がった要素 */
--border: #e5e5e5;                  /* 境界線 */
--border-hover: #d4d4d4;            /* ホバー時の境界線 */
--accent: var(--agri-green-600);    /* アクセントカラー */
--accent-hover: var(--agri-green-700);
--accent-light: var(--agri-green-50);

/* Dark Mode */
--background: #0a0a0a;
--foreground: #fafafa;
--surface: #171717;
--surface-elevated: #262626;
--border: #404040;
--border-hover: #525252;
--accent: var(--agri-green-500);
--accent-hover: var(--agri-green-400);
--accent-light: var(--agri-green-950);
```

---

## Typography

### Font Stack

```css
/* Sans-serif - UI全般 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont,
             'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
             'Yu Gothic', 'YuGothic', 'Meiryo', sans-serif;

/* Display - 見出し */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Usage Example

```tsx
// Display Text - Hero, Large Headings
<h1 className="text-display text-5xl">
  Agriculture DX Manager
</h1>

// Body Text - Paragraphs, Descriptions
<p className="text-body text-base">
  シンプルで美しいUIで農業をDX化
</p>
```

### Type Scale

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `text-display text-6xl` | 3.75rem (60px) | 700 | Hero |
| `text-display text-5xl` | 3rem (48px) | 700 | Page Title |
| `text-display text-4xl` | 2.25rem (36px) | 700 | Section Title |
| `text-display text-3xl` | 1.875rem (30px) | 700 | Card Title |
| `text-body text-xl` | 1.25rem (20px) | 400 | Large Body |
| `text-body text-base` | 1rem (16px) | 400 | Body Text |
| `text-body text-sm` | 0.875rem (14px) | 400 | Caption |

---

## Spacing

Golden Ratio（黄金比）に着想を得たスペーシングシステム。

```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
--spacing-3xl: 4rem;    /* 64px */
```

### Usage

```tsx
<div className="p-xl">           {/* padding: 2rem */}
<div className="mt-lg mb-2xl">   {/* margin-top: 1.5rem, margin-bottom: 3rem */}
<div className="gap-md">         {/* gap: 1rem */}
```

---

## Border Radius

微妙なカーブで優しい印象を。

```css
--radius-sm: 0.375rem;  /* 6px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Hero sections */
```

---

## Shadows

Apple製品のような柔らかく洗練された影。

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
             0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## Animation

### Timing Functions

```css
/* ease-out-expo - Appleらしい流れるような動き */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* smooth - 標準的なスムーズな動き */
--ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### Durations

```css
--duration-fast: 150ms;     /* Quick interactions */
--duration-normal: 250ms;   /* Standard transitions */
--duration-slow: 350ms;     /* Dramatic entrances */
```

### Keyframe Animations

| Animation | Description | Usage |
|-----------|-------------|-------|
| `animate-fadeIn` | フェードイン | 要素の登場 |
| `animate-slideUp` | 下から上にスライド | モーダル、カード |
| `animate-slideDown` | 上から下にスライド | ドロップダウン |
| `animate-slideLeft` | 右から左にスライド | ページ遷移 |
| `animate-slideRight` | 左から右にスライド | ページ遷移 |
| `animate-scaleIn` | 拡大しながら登場 | ボタン、アイコン |
| `animate-float` | ふわふわ浮く | CTA、注目要素 |

### Example

```tsx
<div className="animate-slideUp">
  <h2 className="animate-fadeIn">Hello World</h2>
</div>
```

---

## Components

### Buttons

#### Primary Button

```tsx
<button className="btn-primary">
  Get Started
</button>
```

特徴:
- アクセントカラー背景
- ホバーで微妙に浮き上がる
- クリックで沈む感覚
- 滑らかなease-out-expo遷移

#### Secondary Button

```tsx
<button className="btn-secondary">
  Learn More
</button>
```

特徴:
- サーフェスカラー背景
- 境界線付き
- ホバーで明るく

---

### Cards

```tsx
<div className="card">
  <h3 className="text-display text-2xl mb-md">Card Title</h3>
  <p className="text-body text-base">
    Beautiful card with subtle shadow and hover effect
  </p>
</div>
```

特徴:
- 1px境界線
- 柔らかい影
- ホバーで浮き上がる
- 角丸（radius-xl）

---

### Glassmorphism

iOS風のガラスモーフィズム効果。

```tsx
/* Standard Glass */
<div className="glass rounded-xl p-xl">
  <h3>Glassmorphism Card</h3>
</div>

/* Small Glass */
<div className="glass-sm rounded-lg p-lg">
  Subtle glass effect
</div>

/* Large Glass */
<div className="glass-lg rounded-2xl p-2xl">
  Prominent glass effect
</div>
```

特徴:
- 半透明背景（70% opacity）
- backdrop-blur（12px）
- 彩度180%
- 柔らかい境界線

---

### Surface Hierarchy

```tsx
/* Base Surface - 最も下層 */
<div className="surface-base">
  Base background
</div>

/* Raised Surface - やや浮き上がった */
<div className="surface-raised">
  Slightly elevated
</div>

/* Elevated Surface - 明確に浮き上がった */
<div className="surface-elevated">
  Clearly elevated with shadow
</div>
```

---

### Text Gradients

```tsx
/* Green Gradient */
<h1 className="text-gradient text-5xl text-display">
  Agriculture DX
</h1>

/* Dark Gradient */
<p className="text-gradient-dark text-2xl">
  Elegant Typography
</p>
```

---

### Focus Styles

```tsx
<button className="focus-ring btn-primary">
  Accessible Button
</button>
```

特徴:
- アウトライン非表示
- カスタムbox-shadow
- アクセントカラーのリング
- WCAG準拠

---

## Layout Patterns

### Hero Section

```tsx
<section className="min-h-screen flex items-center justify-center surface-base">
  <div className="text-center animate-slideUp">
    <h1 className="text-display text-6xl mb-lg text-gradient">
      Agriculture DX Manager
    </h1>
    <p className="text-body text-xl text-apple-gray-600 mb-2xl">
      シンプルで美しいUIで農業をDX化
    </p>
    <button className="btn-primary">
      Get Started
    </button>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg p-xl">
  <div className="card animate-fadeIn">
    <h3 className="text-display text-2xl mb-md">Feature 1</h3>
    <p className="text-body">Description</p>
  </div>
  <div className="card animate-fadeIn" style={{ animationDelay: '100ms' }}>
    <h3 className="text-display text-2xl mb-md">Feature 2</h3>
    <p className="text-body">Description</p>
  </div>
  <div className="card animate-fadeIn" style={{ animationDelay: '200ms' }}>
    <h3 className="text-display text-2xl mb-md">Feature 3</h3>
    <p className="text-body">Description</p>
  </div>
</div>
```

### Glassmorphism Hero

```tsx
<section className="min-h-screen flex items-center justify-center relative">
  {/* Background Image */}
  <div className="absolute inset-0 bg-gradient-to-br from-agri-green-500 to-agri-green-700" />

  {/* Glass Card */}
  <div className="glass-lg rounded-2xl p-3xl max-w-2xl relative z-10 animate-scaleIn">
    <h1 className="text-display text-5xl mb-lg text-white">
      Welcome
    </h1>
    <p className="text-body text-lg text-white/90">
      Experience the future of agriculture
    </p>
  </div>
</section>
```

---

## Accessibility

### Focus Management

すべてのインタラクティブ要素に`.focus-ring`を適用:

```tsx
<button className="btn-primary focus-ring">
  Accessible
</button>
```

### Color Contrast

- WCAG AA準拠の色コントラスト比（4.5:1以上）
- ダークモード完全対応

### Keyboard Navigation

- Tab順序の最適化
- Focus visibleのサポート

---

## Best Practices

### 1. 一貫性を保つ
同じ機能には同じスタイルを使用。

### 2. 余白を活用する
情報を詰め込みすぎず、呼吸できるスペースを。

### 3. アニメーションは控えめに
必要な場所にのみ、ユーザーの注意を引くために使用。

### 4. レスポンシブを意識する
モバイルファーストで設計し、大画面に拡張。

### 5. パフォーマンスを最優先
美しさとパフォーマンスの両立。

---

## Dark Mode

自動的にシステム設定を検出し、適切なテーマを適用:

```css
@media (prefers-color-scheme: dark) {
  /* Automatic dark mode styles */
}
```

手動でダークモードを切り替える場合:

```tsx
<html className="dark">
  {/* Dark mode enabled */}
</html>
```

---

## Tailwind CSS Usage

このデザインシステムはTailwind CSS v4で構築されています。

### Color Classes

```tsx
/* Agricultural Green */
<div className="bg-agri-green-600 text-white">Green Background</div>
<div className="text-agri-green-500">Green Text</div>

/* Apple Gray */
<div className="bg-apple-gray-100">Light Gray Background</div>
<div className="border-apple-gray-300">Gray Border</div>

/* Semantic Colors */
<div className="bg-background text-foreground">Base</div>
<div className="bg-surface border-border">Surface</div>
<div className="bg-accent text-white">Accent</div>
```

### Shadow Classes

```tsx
<div className="shadow-sm">Small Shadow</div>
<div className="shadow-md">Medium Shadow</div>
<div className="shadow-lg">Large Shadow</div>
<div className="shadow-xl">Extra Large Shadow</div>
```

### Border Radius Classes

```tsx
<div className="rounded-sm">Small Radius</div>
<div className="rounded-md">Medium Radius</div>
<div className="rounded-lg">Large Radius</div>
<div className="rounded-xl">Extra Large Radius</div>
<div className="rounded-2xl">2X Large Radius</div>
```

---

## Inspiration

このデザインシステムは以下から着想を得ています:

- Apple Design Guidelines
- iOS Human Interface Guidelines
- macOS Design Principles
- Jony Ive's Design Philosophy
- Steve Jobs' Vision

---

## Conclusion

> "Design is not just what it looks like and feels like. Design is how it works."
> - Steve Jobs

このデザインシステムは、見た目の美しさだけでなく、使いやすさ、アクセシビリティ、パフォーマンスを重視しています。

シンプルであること。
美しいこと。
そして、機能すること。

それが、Jony IveとSteve Jobsが教えてくれたデザインの本質です。
