import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager - Stay Organized",
  description: "Manage your tasks efficiently and stay organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navigation Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  Task Manager
                </span>
              </Link>
              <nav className="flex gap-4">
                <Link
                  href="/tasks"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  All Tasks
                </Link>
                <Link
                  href="/tasks/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  + New Task
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Task Manager. Built with Next.js & NestJS.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
