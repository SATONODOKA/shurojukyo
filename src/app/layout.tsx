import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from 'next/font/google'
import { BottomNav } from '@/components/BottomNav'
import { TopNav } from '@/components/TopNav'
import { SITE } from '@/lib/config'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const noto = Noto_Sans_JP({ subsets: ['latin'], weight: ['400','500','700'] })

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.tagline,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${inter.className} ${noto.className} bg-neutral-950 text-neutral-50 min-h-screen`}>
        <TopNav />
        <div className="min-h-dvh pb-20">{children}</div>
        {/* モバイルのみ下部タブ */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
