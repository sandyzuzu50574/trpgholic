import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZUZU｜TRPG-holic",
  description: "ZUZU的TRPG主持經歷、GM風格，以及可以帶的系統與劇本。",
  icons: { icon: "favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
