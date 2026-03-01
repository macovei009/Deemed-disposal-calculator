import Link from 'next/link'
import Image from 'next/image'
import EmailSignup from './EmailSignup'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--surface-2)',
      marginTop: 60,
      padding: '40px 24px 20px'
    }}>
      <div className="container">
        {/* EMAIL SIGNUP SECTION */}
        <div style={{ marginBottom: '40px' }}>
          <EmailSignup variant="compact" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12
            }}>
              <Image 
                src="/images/logo.png" 
                alt="Deemed Disposal Calculator" 
                width={20} 
                height={20}
                style={{ borderRadius: '4px' }}
              />
              <h4 style={{ marginTop: 0, marginBottom: 0, color: 'var(--primary)' }}>Deemed Disposal</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '8px 0' }}>
              Irish ETF tax calculator and guides
            </p>
          </div>

          <div>
            <h4 style={{ marginTop: 0, marginBottom: 12 }}>Product</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/calculator" style={{ color: 'var(--link)' }}>
                Calculator
              </Link>
              <Link href="/private-calculator" style={{ color: 'var(--link)' }}>
                Full Calculator
              </Link>
              <Link href="/glossary" style={{ color: 'var(--link)' }}>
                Glossary
              </Link>
            </nav>
          </div>

          <div>
            <h4 style={{ marginTop: 0, marginBottom: 12 }}>Learning</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/what-is-an-etf" style={{ color: 'var(--link)' }}>
                What is an ETF?
              </Link>
              <Link href="/what-is-deemed-disposal" style={{ color: 'var(--link)' }}>
                What is deemed disposal?
              </Link>
              <Link href="/irish-etf-tax" style={{ color: 'var(--link)' }}>
                Irish ETF tax
              </Link>
              <Link href="/faq" style={{ color: 'var(--link)' }}>
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20,
          marginTop: 20
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'var(--muted)',
            marginBottom: 12
          }}>
            © 2024 Deemed Disposal Calculator. Built with clarity and care.
          </p>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'var(--muted)',
            lineHeight: 1.6
          }}>
            <strong>Disclaimer:</strong> This site provides general information only and is not tax advice. 
            We recommend consulting with a qualified Irish tax professional before making investment or tax decisions. 
            ETFs and deemed disposal rules are complex and subject to change.
          </p>
        </div>
      </div>
    </footer>
  )
}
