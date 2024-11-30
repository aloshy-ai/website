import * as React from "react";
import { metadata } from "@/app/metadata";
import "@/app/globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen antialiased">
        <h1>HEADER</h1>
        <main className="relative flex min-h-screen flex-col">{children}</main>
        <h1>FOOTER</h1>
      </body>
    </html>
  );
}
