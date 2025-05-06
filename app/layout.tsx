import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Daesung Kim',
  description: 'Homepage'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <header className="bg-white/80 dark:bg-gray-800/80 border-b shadow-sm sticky top-0 z-50">
          <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Daesung Kim</h1>
            <div className="space-x-4 text-sm flex items-center">
              <a href="/">Main</a>
              <a href="/research">Research</a>
              <a href="/teaching">Teaching</a>
              <a href="/blog">Blog</a>
            </div>
          </nav>
        </header>
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {children}
          </div>
        </main>
        <footer className="text-center p-4 border-t text-sm">
          © 2025 Daesung Kim
        </footer>
      </body>
    </html>
  )
}
