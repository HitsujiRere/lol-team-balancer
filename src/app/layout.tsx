import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "LoLチームバランサー",
  description: "League of Legendsのカスタムゲームのチーム分けを行います",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
      </body>
    </html>
  );
}
