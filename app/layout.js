import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Deemed Disposal Calculator (Ireland)',
  description: 'Guides to Irish ETF deemed disposal and an upcoming calculator for the 8-year rule.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
