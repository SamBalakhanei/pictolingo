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
      <meta property='og:image' content='public/thumbnail.JPG' />
      <body className={`bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
