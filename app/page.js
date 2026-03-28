import Link from 'next/link'
import Image from 'next/image'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import FeatureCard from '@/components/FeatureCard'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'Deemed Disposal Calculator (Ireland)',
  description: 'Clear, beginner-friendly guides to Irish ETF deemed disposal. Calculate your tax liability with ease.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/'
  }
}

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-bg" style={{ 
        paddingTop: 60, 
        paddingBottom: 60,
        background: `
          radial-gradient(135% 120% at 15% 50%, rgba(11, 31, 59, 0.12) 0%, transparent 60%),
          radial-gradient(150% 100% at 85% 80%, rgba(22, 163, 74, 0.10) 0%, transparent 70%),
          linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)
        `,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <PageShell>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              borderRadius: '12px',
              padding: '8px',
              animation: 'pulse 2s infinite'
            }}>
              <Image 
                src="/images/logo.png" 
                alt="Deemed Disposal Calculator" 
                width={48} 
                height={48}
                style={{ borderRadius: '8px', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <h1 style={{
              marginBottom: 0,
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              maxWidth: 600,
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800
            }}>
              Understand Irish ETF Tax with Clarity
            </h1>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: 24
          }}>
            <p className="lead" style={{ 
              maxWidth: 500, 
              marginBottom: 20,
              fontSize: '1.2rem'
            }}>
              Deemed disposal rules confuse many investors. We break them down simply and help you calculate your tax liability.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
              <Link href="/what-is-deemed-disposal" className="btn-primary" style={{
                fontSize: '1.1rem',
                padding: '14px 28px',
                boxShadow: '0 4px 16px rgba(22, 163, 74, 0.3)',
                animation: 'glow 2s ease-in-out infinite alternate'
              }}>
                📚 Learn Deemed Disposal
              </Link>
              <Link href="/irish-etf-tax" className="btn-secondary" style={{
                fontSize: '1.1rem',
                padding: '14px 28px'
              }}>
                🇮🇪 Irish ETF Tax Guide
              </Link>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>🚀</span>
                <strong style={{ color: 'var(--primary)' }}>Calculator Coming Soon</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
                We're putting the finishing touches on our comprehensive calculator. Meanwhile, explore our guides to understand deemed disposal rules.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              fontSize: '0.9rem',
              color: 'var(--muted)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: 'var(--accent)', 
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite'
                }}></div>
                Free
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: 'var(--accent)', 
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite 0.2s'
                }}></div>
                Clear explanations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: 'var(--accent)', 
                  borderRadius: '50%',
                  animation: 'pulse 1.5s infinite 0.4s'
                }}></div>
                No sign-up required
              </div>
            </div>
          </div>

          {/* FLOATING BADGE */}
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            🇮🇪 Irish Tax 2026
          </div>
        </PageShell>
      </div>

      <PageShell>
        {/* EMAIL SIGNUP HERO */}
        <EmailSignup 
          variant="hero"
          title="Get Early Access to Advanced Features"
          description="Join 500+ investors waiting for Deemed Disposal Calculator."
        />

        {/* HOW IT WORKS SECTION */}
        <section style={{ marginTop: 60, marginBottom: 50 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 40 }}>How it Works</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24
          }}>
            <FeatureCard icon="📊" title="Upload CSV">
              <p>Import your broker transaction history (DEGIRO, Trading 212, etc.).</p>
            </FeatureCard>

            <FeatureCard icon="🔢" title="We Calculate">
              <p>Automatic classification of positions. Tax liability computed by 8-year periods.</p>
            </FeatureCard>

            <FeatureCard icon="✅" title="Get Results">
              <p>Clear breakdown of your deemed disposal events and estimated tax to pay.</p>
            </FeatureCard>
          </div>
        </section>

        {/* EXAMPLE SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ marginBottom: 24 }}>Example: The 8-Year Rule</h2>
          <Callout variant="info" icon="ℹ️" title="Why the 8-year timeline matters">
            <p style={{ marginBottom: 12 }}>
              If you bought €10,000 of VWCE on <strong>1 January 2018</strong>, and it's now worth €15,000 on <strong>31 December 2025</strong>—even if you haven't sold—you may owe tax on the €5,000 gain.
            </p>
            <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
              <li><strong>Year 1-7:</strong> No tax owed (gains accumulate)</li>
              <li><strong>Year 8 (31 Dec 2025):</strong> Deemed disposal event triggered</li>
              <li><strong>31 Dec 2025:</strong> Tax owed on €5,000 gain at 38% rate = €1,900</li>
            </ul>
          </Callout>
        </section>

        {/* STATISTICS SECTION */}
        <section style={{ marginBottom: 50 }}>
          <div style={{
            background: 'var(--surface-2)',
            borderRadius: '12px',
            padding: '32px 24px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: 32 }}>Irish ETF Tax by the Numbers</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 32
            }}>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  color: 'var(--accent)', 
                  marginBottom: 8 
                }}>
                  38%
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Exit tax rate from 2026<br/>(reduced from 41%)
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  color: 'var(--primary)', 
                  marginBottom: 8 
                }}>
                  8
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Year deemed disposal<br/>cycle for ETFs
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  color: 'var(--info)', 
                  marginBottom: 8 
                }}>
                  €0
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Minimum investment<br/>threshold (all amounts)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUIDES SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ marginBottom: 24 }}>Complete Guide to Irish ETF Tax</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 16 
          }}>
            <Link href="/what-is-an-etf" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>📈</div>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is an ETF? →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Learn ETF basics, types, and Irish tax context
                </p>
              </div>
            </Link>

            <Link href="/what-is-deemed-disposal" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>⏰</div>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Deemed Disposal →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Deep dive into the 8-year rule and examples
                </p>
              </div>
            </Link>

            <Link href="/irish-etf-tax" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>🇮🇪</div>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Irish ETF Tax →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Exit tax rates, chargeable events, FX handling
                </p>
              </div>
            </Link>

            <Link href="/glossary" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>📚</div>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Glossary →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Key terms and definitions explained
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Support / Buy Me a Coffee ── */}
        <div style={{
          textAlign: 'center',
          padding: '28px 20px',
          marginBottom: 50,
          background: 'var(--surface)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)' }}>
            ☕ Enjoying ad-free tax tools?
          </p>
          <p className="muted" style={{ margin: '0 0 14px', fontSize: '0.9rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            I prefer not to run ads. If this site helps you, a small contribution keeps it running — covering hosting, the domain, and future updates.
          </p>
          <a
            href="https://buymeacoffee.com/deemeddisposalcalculator"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.95rem',
              fontWeight: 700,
              background: '#FFDD00',
              color: '#0B0B0B',
              padding: '10px 22px',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'var(--transition)',
            }}
          >
            ☕ Buy Me a Coffee
          </a>
        </div>

        {/* FAQ PREVIEW SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ marginBottom: 24 }}>Quick Answers</h2>
          
          <details style={{
            padding: 16,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none'
            }}>
              Do I have to pay tax even if I don't sell my ETFs?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Yes, under Ireland's deemed disposal rules. Every 8 years, you may owe exit tax on gains even if you haven't sold. This is the "8-year rule" that applies to many ETFs.
            </p>
          </details>

          <details style={{
            padding: 16,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none'
            }}>
              What's the current Irish ETF tax rate?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              The exit tax rate is 38% from 1 January 2026 (reduced from 41%). This applies to gains from ETFs under the investment undertaking/gross roll-up regime.
            </p>
          </details>

          <details style={{
            padding: 16,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none'
            }}>
              When does the 8-year timer start?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Generally from when you first acquired the ETF units. So if you bought VWCE on 15 March 2018, the 8-year period would typically end on 15 March 2026.
            </p>
          </details>

          <details style={{
            padding: 16,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 24,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none'
            }}>
              Does this apply to my pension investments?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              No, pension investments (PRSA, occupational schemes) have different tax treatment. Deemed disposal typically applies to direct taxable investments, not pension structures.
            </p>
          </details>

          <div style={{ textAlign: 'center' }}>
            <Link href="/faq" className="btn-secondary">
              View All 14 Questions →
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  )
}

