# Home and Job Japan（外国人就労・住居支援サービス）

外国人労働者向けの就労・住居支援プラットフォーム

## 🌟 概要

外国人労働者が日本で働き・住むための包括的な支援サービスです。
仕事と住居のペアセットを提供し、渡航直後の不安を解消します。

## ✨ 主要機能

### 🏠 仕事×住居セットのおすすめ
- 24件の仕事×住居組み合わせを固定データで提供
- Embla Carouselによるスムーズなカルーセル表示
- 3秒ごとに自動スクロール（ユーザー操作で停止）

### 🎯 5つの主要画面
1. **ホーム** - おすすめセットのカルーセル表示
2. **検索** - Spotify風のジャンルカード検索
3. **フォロー** - 新着情報タイムライン
4. **DM** - LINE風チャットUI（雇用主とのやり取り）
5. **マイページ** - プロフィールと信用スコア

### 🎨 UI/UX特徴
- **ダークテーマ** - モダンで目に優しいデザイン
- **エメラルドアクセント** - 信頼性と安心感を表現
- **モバイルファースト** - スマートフォン最適化
- **直感的な操作** - ハートボタンで保存機能

## 🛠️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Carousel**: Embla Carousel + Autoplay
- **Icons**: Lucide React
- **Package Manager**: npm/pnpm
- **Deployment**: Netlify対応

## 🚀 ローカル開発

```bash
# 依存関係のインストール
npm install
# または
pnpm install

# 開発サーバーの起動
npm run dev
# または
pnpm dev

# ビルド
npm run build

# プロダクション実行
npm start
```

🌐 http://localhost:3000 でアクセス可能

## 🚢 Netlifyへのデプロイ

### 自動デプロイ設定

1. GitHubリポジトリをNetlifyに接続
2. 以下の設定が `netlify.toml` で自動適用されます：
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

### 環境変数（必要に応じて）

Netlify Dashboard > Site Settings > Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.netlify.app
```

### ビルド最適化

- 画像は Unsplash の静的URL使用（APIキー不要）
- フォールバック画像でエラー時も安定表示
- キャッシュヘッダー設定済み

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 共通レイアウト
│   ├── page.tsx          # ホーム画面
│   ├── search/           # 検索画面
│   ├── follow/           # フォロー画面
│   ├── dm/              # DM画面
│   └── me/              # マイページ
├── components/           # 再利用コンポーネント
│   ├── ui/              # shadcn/uiコンポーネント
│   └── cards/           # カードコンポーネント
└── lib/                 # ユーティリティとデータ
    ├── store.ts         # Zustandストア
    ├── fixed-data.ts    # 固定モックデータ
    └── types.ts         # TypeScript型定義
```

## 🎯 ターゲットユーザー

- **外国人労働者** - 日本での就労・住居探しを支援
- **雇用主** - 外国人労働者の採用・住居提供
- **不動産会社** - 外国人向け住居の提供

## 🔄 今後の拡張予定

- **実際のAPI連携** - Recruit ID認証
- **翻訳機能** - 多言語対応
- **Push通知** - 新着情報通知
- **地図機能** - 物件位置情報表示

## 📄 ライセンス

MIT License

## 🤝 貢献

IssueやPull Requestをお待ちしています！

---

**外国人就労・住居支援サービス** - 未来の労働力を日本で活躍させるためのプラットフォーム
