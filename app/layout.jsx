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
      <body className={`bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
