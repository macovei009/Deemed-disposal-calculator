import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'Deemed Disposal & Irish ETF Tax FAQ | Deemed Disposal Calculator',
  description: 'Clear answers on deemed disposal, Irish ETF exit tax, 8‑year rule timing, rates (38% from 2026), records, FX, and calculator privacy.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/faq'
  }
}

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is deemed disposal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deemed disposal is Ireland's 8‑year rule for certain funds/ETFs. At the end of each 8‑year period, a chargeable event can occur even if you don't sell."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay tax even if I don't sell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Often yes. Under the investment undertaking regime, the end of an 8‑year period is a chargeable event that can create a tax liability without an actual sale."
        }
      },
      {
        "@type": "Question",
        "name": "When does the 8‑year timer start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 8‑year period is counted from the date you acquire the units, and repeats at each subsequent 8‑year interval."
        }
      },
      {
        "@type": "Question",
        "name": "How much is the tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For many ETFs/funds under the exit tax regime, the rate is 38% from 1 January 2026 (previously 41%). The exact outcome depends on the ETF's classification and your circumstances."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageShell>
        <h1 style={{ marginBottom: 12 }}>Deemed Disposal & Irish ETF Tax FAQ</h1>
        <p className="lead">
          Clear answers to your questions about deemed disposal, Irish ETF taxation, the 8‑year rule, exit tax rates, record-keeping, and our calculator.
        </p>

        <Callout variant="info" icon="ℹ️" title="General Information">
          <p style={{ marginBottom: 0 }}>
            This FAQ is general information—not tax advice. ETF taxation depends on the ETF's legal form and domicile, and your personal circumstances. Revenue manuals also note their guidance is not comprehensive professional advice. Always consult a qualified tax professional for your specific situation.
          </p>
        </Callout>

        {/* MAIN FAQ SECTION */}
        <section style={{ marginTop: 40, marginBottom: 40 }}>
          <h2 style={{ marginBottom: 30 }}>Questions &amp; Answers</h2>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              What is deemed disposal?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Deemed disposal is Ireland's 8‑year rule for certain fund and ETF holdings. At the end of each 8‑year period, a <strong>"chargeable event"</strong> can occur—meaning you may be treated as if you disposed of the investment even if you didn't sell.
              </p>
              <p>
                <Link href="/what-is-deemed-disposal" style={{ color: 'var(--link)' }}>
                  Read the full explanation →
                </Link>
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Do I pay tax even if I don't sell?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Often, yes. Under the investment undertaking / gross roll‑up regime, the end of an 8‑year period is a chargeable event that can create a tax liability even without an actual sale. This is one of the key features of the deemed disposal rule.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              How much is the tax?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                For many ETFs and funds that fall under the exit tax / chargeable event regime, the rate historically was <strong>41%</strong>, with a legislated reduction to <strong>38%</strong> applying from <strong>1 January 2026</strong> for relevant products and chargeable events (per Finance Bill 2025 measures).
              </p>
              <p>
                The exact outcome depends on the ETF's classification and your circumstances, so treat this as a guide and consult a professional if unsure.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              When does the 8‑year timer start?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                The 8‑year period is counted from the date you acquire the units, and repeats at each subsequent 8‑year interval.
              </p>
              <p>
                So if you bought on <strong>1 January 2016</strong>, the first 8‑year point is <strong>1 January 2024</strong> (then again in 2032, 2040, etc., depending on the applicable regime).
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              What if I sell before 8 years?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Selling before 8 years means you have an actual disposal rather than the 8‑year deemed disposal event at that particular anniversary. Whether the tax is still under the fund/ETF regime or standard CGT rules depends on the ETF's classification and Revenue guidance. In some cases, selling early can be more tax-efficient than waiting for the 8‑year event.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              What happens after deemed disposal?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                After a deemed disposal chargeable event, future tax calculations need to reflect that tax may already have been paid at the 8‑year point. Revenue's investment undertaking guidance covers how previously paid exit tax is accounted for in later calculations.
              </p>
              <p>
                <strong>Practical takeaway:</strong> Keep the valuation and tax details from each 8‑year event, because they affect later calculations. The cost basis for your next 8‑year period will be based on the market value at the previous deemed disposal event.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Does deemed disposal apply to my pension?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                No. Pension arrangements are treated differently from taxable personal holdings. Revenue's investment undertaking guidance includes specific exemptions and handling for certain entity types (including pension-related categories).
              </p>
              <p>
                If you're investing via a pension wrapper (e.g., PRSA, occupational pension), the deemed disposal discussion that applies to taxable personal holdings may not apply in the same way. Confirm with your pension provider or advisor.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              What brokers are supported by the calculator?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                <strong>Current status:</strong> The calculator is in early MVP and supports basic CSV imports.
              </p>
              <p>
                <strong>Planned:</strong> Trading 212, DEGIRO, Interactive Brokers, and other major brokers. If your broker is not listed, please check back soon or contact us.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Will you store my CSV file or data?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                <strong>Goal:</strong> Process everything locally in your browser; don't store or transmit your CSV to a server.
              </p>
              <p>
                <strong>Current status:</strong> MVP version. Please refer to your Privacy Policy for the exact current behaviour and data handling.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Do I need to keep records?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Yes. Because the tax rules depend on acquisition dates, chargeable events, and valuations, you should keep:
              </p>
              <ul>
                <li>Buy dates and prices (amounts)</li>
                <li>Quantities of shares/units</li>
                <li>Values at each 8‑year anniversary</li>
                <li>Sale dates and values (if sold)</li>
                <li>Tax paid at any chargeable events</li>
                <li>FX rates used (if applicable)</li>
              </ul>
              <p>
                The Irish tax authorities may ask for these records to verify your tax returns.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Is this tax advice?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                <strong>No.</strong> This site provides general information only. Revenue guidance also states it's a guide and not comprehensive professional advice. Always consult a qualified Irish tax professional for your specific situation.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              Do I need to think about currencies (EUR vs USD/GBP)?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Yes. Your tax reporting is ultimately in EUR, and foreign currency movements can matter. Revenue notes that non‑euro currencies are assets for CGT purposes, meaning realised FX gains/losses are usually within CGT scope.
              </p>
              <p>
                <strong>What the calculator does:</strong> Convert relevant values into EUR using a consistent approach and show the FX rate used for transparency.
              </p>
            </div>
          </details>

          <details style={{
            padding: 20,
            border: '1px solid var(--border)',
            borderRadius: 8,
            marginBottom: 16,
            cursor: 'pointer'
          }}>
            <summary style={{
              fontWeight: 600,
              color: 'var(--text)',
              outline: 'none',
              fontSize: '1.05rem'
            }}>
              What if I have losses?
            </summary>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
              <p>
                Loss treatment can differ depending on whether your holding is taxed under the investment undertaking/exit tax regime or standard CGT rules. Some Irish tax commentary notes that loss relief under the exit tax regime is more limited than standard CGT.
              </p>
              <p>
                <strong>Best practice:</strong> Don't guess—confirm the regime for the specific ETF and talk to a tax professional if you're relying on losses.
              </p>
            </div>
          </details>
        </section>

        {/* RELATED RESOURCES */}
        <section style={{ marginBottom: 40 }}>
          <h2>Related Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <Link href="/what-is-an-etf" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is an ETF? →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Learn ETF basics and types
                </p>
              </div>
            </Link>
            <Link href="/what-is-deemed-disposal" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Deemed Disposal →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Deep dive into the 8‑year rule
                </p>
              </div>
            </Link>
            <Link href="/irish-etf-tax" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Irish ETF Tax →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Tax rates, chargeable events, records
                </p>
              </div>
            </Link>
            <Link href="/calculator" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Calculator →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Calculate your tax liability
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* EMAIL SIGNUP CTA */}
        <EmailSignup 
          title="Get Calculator Updates"
          description="Be first to try new features: automated tax reports, multi-year tracking, loss calculations, and integration with Irish brokers."
        />

        <Callout variant="info" icon="⚖️" title="Tax Disclaimer">
          <p style={{ marginBottom: 0 }}>
            This site provides general information only and is not tax advice. Tax rules can change and individual circumstances vary. We recommend consulting with a qualified Irish tax professional before making investment or tax decisions.
          </p>
        </Callout>
      </PageShell>
    </>
  )
}
