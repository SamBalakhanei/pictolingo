import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PictoLingo',
  description: 'A language learning app based on pictures',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
