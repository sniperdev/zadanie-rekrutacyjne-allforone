import Providers from "./providers";
import "./globals.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <div className="flex justify-center items-center min-h-screen p-6">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
