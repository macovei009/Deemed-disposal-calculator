import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Deemed Disposal Calculator (Ireland)',
  description: 'Clear guides and calculator for Irish ETF deemed disposal and the 8-year rule.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
