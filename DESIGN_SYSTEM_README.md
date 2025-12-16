# Jony Ive / Steve Jobs Design System

極限までシンプルで美しい、Apple製品のような質感を持つデザインシステムが構築されました。

## What's Included

### 1. Core Design System (`/src/app/globals.css`)

完全にカスタマイズされたデザインシステム:

- **Color Palette**
  - Agricultural Green (11 shades): 農業をテーマにした自然なグリーン
  - Apple Gray (11 shades): Apple製品のような洗練されたニュートラルグレー
  - Semantic Colors: background, foreground, surface, accent等

- **Typography**
  - Font Stack: Inter + Apple System Fonts + Japanese Fonts
  - Display Font: 見出し用の太字フォント
  - Body Font: 本文用の読みやすいフォント

- **Spacing System**
  - Golden Ratio inspired: xs, sm, md, lg, xl, 2xl, 3xl

- **Border Radius**
  - Subtle Curves: sm, md, lg, xl, 2xl

- **Shadows**
  - Soft & Refined: xs, sm, md, lg, xl, 2xl, inner

- **Glassmorphism**
  - iOS-style glass effects
  - Three variants: glass-sm, glass, glass-lg

- **Animations**
  - Keyframes: fadeIn, slideUp, slideDown, slideLeft, slideRight, scaleIn, float
  - Timing Functions: ease-out-expo (Apple-like), smooth
  - Durations: fast (150ms), normal (250ms), slow (350ms)

- **Custom Components**
  - Buttons: btn-primary, btn-secondary
  - Cards: card with hover effects
  - Surface Hierarchy: surface-base, surface-raised, surface-elevated
  - Text Gradients: text-gradient, text-gradient-dark
  - Focus Styles: focus-ring
  - Dividers: divider, divider-vertical

- **Custom Scrollbar**
  - Apple-style thin scrollbar
  - Light/Dark mode support

### 2. Documentation

#### `/DESIGN_SYSTEM.md`
完全なデザインシステムドキュメント:
- デザイン哲学
- カラーパレット詳細
- タイポグラフィガイド
- スペーシングシステム
- アニメーション仕様
- コンポーネントガイド
- レイアウトパターン
- アクセシビリティ
- ベストプラクティス

#### `/DESIGN_EXAMPLES.md`
実装例とコードサンプル:
- Hero Section (複数バリエーション)
- Feature Cards
- Glassmorphism Examples
- Button Variants
- Forms
- Navigation
- Data Display (Stats, Tables)
- Complete Page Example

## Design Philosophy

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

このデザインシステムは、Jony IveとSteve Jobsが追求した「Less is More」の哲学に基づいています。

### Core Principles

1. **Minimalism** - 必要最小限の要素で最大の効果を
2. **Clarity** - 明確で直感的なUI
3. **Precision** - ピクセルパーフェクトな実装
4. **Elegance** - 洗練された美しさ
5. **Timelessness** - 時代を超えたデザイン

## Quick Start

### 1. Use Semantic Colors

```tsx
// Background colors
<div className="bg-background text-foreground">Base</div>
<div className="bg-surface">Surface</div>
<div className="bg-surface-elevated">Elevated</div>

// Accent colors
<div className="bg-accent text-white">Accent</div>
<button className="bg-accent hover:bg-accent-hover">Button</button>
```

### 2. Use Custom Color Palettes

```tsx
// Agricultural Green
<div className="bg-agri-green-600 text-white">Primary Green</div>
<div className="text-agri-green-500">Green Text</div>

// Apple Gray
<div className="bg-apple-gray-100">Light Gray</div>
<div className="text-apple-gray-600">Gray Text</div>
```

### 3. Use Pre-built Components

```tsx
// Buttons
<button className="btn-primary focus-ring">Primary</button>
<button className="btn-secondary focus-ring">Secondary</button>

// Cards
<div className="card">
  <h3 className="text-display text-2xl mb-4">Card Title</h3>
  <p className="text-body">Card content</p>
</div>

// Glassmorphism
<div className="glass rounded-xl p-8">
  Glass Effect
</div>
```

### 4. Use Animations

```tsx
<div className="animate-slideUp">Slide Up</div>
<div className="animate-fadeIn">Fade In</div>
<div className="animate-scaleIn">Scale In</div>
<div className="animate-float">Float</div>
```

### 5. Use Text Gradients

```tsx
<h1 className="text-gradient text-display text-6xl">
  Beautiful Gradient
</h1>
```

## Color Palette Reference

### Agricultural Green
```
50:  #f0fdf4  (極めて薄い)
100: #dcfce7  (非常に薄い)
200: #bbf7d0  (薄い)
300: #86efac  (やや薄い)
400: #4ade80  (明るい)
500: #22c55e  (標準)
600: #16a34a  (やや濃い - メインアクセント)
700: #15803d  (濃い)
800: #166534  (非常に濃い)
900: #14532d  (極めて濃い)
950: #052e16  (最も濃い)
```

### Apple Gray
```
50:  #fafafa  (極めて薄い)
100: #f5f5f5  (非常に薄い)
200: #e5e5e5  (薄い)
300: #d4d4d4  (やや薄い)
400: #a3a3a3  (明るい)
500: #737373  (標準)
600: #525252  (やや濃い)
700: #404040  (濃い)
800: #262626  (非常に濃い)
900: #171717  (極めて濃い)
950: #0a0a0a  (最も濃い)
```

## Typography Scale

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `text-display text-6xl` | 60px | 700 | Hero |
| `text-display text-5xl` | 48px | 700 | Page Title |
| `text-display text-4xl` | 36px | 700 | Section Title |
| `text-display text-3xl` | 30px | 700 | Card Title |
| `text-display text-2xl` | 24px | 700 | Heading |
| `text-body text-xl` | 20px | 400 | Large Body |
| `text-body text-base` | 16px | 400 | Body Text |
| `text-body text-sm` | 14px | 400 | Caption |

## Animation Reference

| Class | Description | Duration |
|-------|-------------|----------|
| `animate-fadeIn` | フェードイン | 350ms |
| `animate-slideUp` | 下から上にスライド | 350ms |
| `animate-slideDown` | 上から下にスライド | 350ms |
| `animate-slideLeft` | 右から左にスライド | 350ms |
| `animate-slideRight` | 左から右にスライド | 350ms |
| `animate-scaleIn` | 拡大しながら登場 | 250ms |
| `animate-float` | ふわふわ浮く | 3s (infinite) |

## Component Classes

### Buttons
- `btn-primary` - Primary action button
- `btn-secondary` - Secondary action button

### Cards
- `card` - Standard card with hover effect

### Surface
- `surface-base` - Base background
- `surface-raised` - Slightly elevated
- `surface-elevated` - Clearly elevated with shadow

### Glassmorphism
- `glass-sm` - Small glass effect
- `glass` - Standard glass effect
- `glass-lg` - Large glass effect

### Text
- `text-display` - Display/heading text
- `text-body` - Body text
- `text-gradient` - Green gradient text
- `text-gradient-dark` - Dark gradient text

### Utilities
- `focus-ring` - Accessible focus ring
- `transition-smooth` - Smooth transition
- `transition-expo` - Exponential ease-out transition
- `divider` - Horizontal divider
- `divider-vertical` - Vertical divider

## Dark Mode Support

デザインシステムは自動的にシステム設定を検出:

```css
@media (prefers-color-scheme: dark) {
  /* Automatic dark mode */
}
```

手動切り替えも可能:

```tsx
<html className="dark">
  {/* Dark mode enabled */}
</html>
```

## Accessibility Features

- WCAG AA準拠のカラーコントラスト
- Focus visible サポート
- キーボードナビゲーション最適化
- カスタムフォーカスリング (`.focus-ring`)

## Integration with shadcn/ui

このデザインシステムはshadcn/uiと完全に互換性があります:

- shadcn/uiの変数 (`--primary`, `--secondary`, etc.) が定義済み
- カスタムカラーパレットも利用可能
- どちらのスタイルシステムも使用可能

## Browser Support

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## Performance

- CSS Variables による高速なテーマ切り替え
- GPU アクセラレーション対応アニメーション
- 最適化された Backdrop Filter

## Best Practices

1. **一貫性を保つ** - 同じ機能には同じスタイルを
2. **余白を活用** - 呼吸できるスペースを確保
3. **アニメーションは控えめに** - 必要な場所にのみ使用
4. **レスポンシブ対応** - モバイルファーストで設計
5. **パフォーマンス重視** - 美しさとパフォーマンスの両立

## Examples

詳細な実装例は `/DESIGN_EXAMPLES.md` を参照してください。

## Inspiration

- Apple Design Guidelines
- iOS Human Interface Guidelines
- macOS Design Principles
- Jony Ive's Design Philosophy
- Steve Jobs' Vision

## Conclusion

> "Design is not just what it looks like and feels like. Design is how it works."
> - Steve Jobs

シンプルであること。
美しいこと。
そして、機能すること。

それが、このデザインシステムの目指すところです。

---

**Built with love and attention to detail.**
