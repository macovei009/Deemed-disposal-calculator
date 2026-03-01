import Link from 'next/link'
import Image from 'next/image'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'Calculator (Coming Soon) | Deemed Disposal Calculator',
  description: 'The calculator MVP is launching soon. Read the guides in the meantime.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/calculator'
  }
}

export default function CalculatorComingSoon() {
  return (
    <PageShell>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16
      }}>
        <Image 
          src="/images/logo.png" 
          alt="Deemed Disposal Calculator" 
          width={32} 
          height={32}
          style={{ borderRadius: '6px' }}
        />
        <h1 style={{ marginBottom: 0 }}>Calculator Coming Soon</h1>
      </div>
      
      <p className="lead">
        The MVP is being finished. For now, these pages explain how deemed disposal works in Ireland:
      </p>
      
      <Callout variant="info" icon="�" title="Learn While We Build">
        <p style={{ marginBottom: 12 }}>
          While we finish the calculator, master the fundamentals with our comprehensive guides:
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/what-is-deemed-disposal" className="btn-accent">
            📖 Deemed Disposal Guide
          </Link>
          <Link href="/irish-etf-tax" className="btn-secondary">
            🇮🇪 Irish ETF Tax
          </Link>
        </div>
      </Callout>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 16, 
        marginTop: 32,
        marginBottom: 32
      }}>
        <Link href="/what-is-deemed-disposal" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
            <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is deemed disposal? →</h3>
            <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
              Understand the 8-year rule and chargeable events
            </p>
          </div>
        </Link>
        <Link href="/irish-etf-tax" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
            <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Irish ETF tax overview →</h3>
            <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
              Tax rates, chargeable events, and compliance
            </p>
          </div>
        </Link>
        <Link href="/what-is-an-etf" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
            <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is an ETF? →</h3>
            <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
              ETF basics and how they work in Ireland
            </p>
          </div>
        </Link>
        <Link href="/faq" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
            <h3 style={{ marginTop: 0, color: 'var(--link)' }}>FAQ →</h3>
            <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
              Common questions about deemed disposal
            </p>
          </div>
        </Link>
      </div>

      {/* EMAIL SIGNUP CTA */}
      <EmailSignup 
        variant="hero"
        title="Join the Launch List for Advanced Calculator"
        description="Get early access to automated tax calculations, Revenue compliance reports, multi-year tracking, and direct broker integrations."
      />

      <p style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/">← Back to home</Link>
      </p>
    </PageShell>
  )
}
