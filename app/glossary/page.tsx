import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'Glossary (Irish ETF & Deemed Disposal) | Deemed Disposal Calculator',
  description: 'Key terms and definitions for deemed disposal, Irish ETF tax, exit tax, chargeable events, and investment terms.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/glossary'
  }
}

export default function Glossary() {
  return (
    <>
      <PageShell>
        <h1 style={{ marginBottom: 12 }}>Glossary (Irish ETF &amp; Deemed Disposal)</h1>
        <p className="lead">
          Quick reference for key terms used throughout this site. Includes investment basics, Irish tax concepts, and deemed disposal specifics.
        </p>

        {/* A SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>A</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Asset Allocation</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              The mix of investments you hold (for example, 60% equities / 40% bonds). Diversifying across asset classes can reduce reliance on any single market's performance.
            </p>
          </div>
        </section>

        {/* C SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>C</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Capital Gains Tax (CGT)</h3>
            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 12 }}>
              A tax on the chargeable gain when you dispose of an asset (sell, gift, exchange, etc.). Revenue explains CGT is charged on the gain (not the whole proceeds) and the standard CGT rate is 33% for most gains (with some special rates).
            </p>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              <strong>Important:</strong> Many ETFs and funds are not taxed under standard CGT rules—they can fall under the investment undertaking / exit tax regime instead.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Chargeable Event</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A tax-triggering event under Ireland's gross roll‑up / investment undertaking rules. Guidance commonly includes events such as distributions, redemption/repurchase, transfers/cancellations, and the 8‑year deemed disposal.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Cost Basis</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              What you paid for an investment (often including fees). Used to calculate gains and losses.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', marginTop: 12 }}>
              <strong>For funds under the investment undertaking regime:</strong> Earlier "tax checkpoints" (like deemed disposal) can affect future calculations. Revenue guidance covers offset of exit tax deducted and specific 8‑year event handling.
            </p>
          </div>
        </section>

        {/* D SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>D</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Deemed Disposal</h3>
            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 12 }}>
              Ireland's 8‑year rule for many fund and ETF holdings: a chargeable event can occur at the end of each 8‑year period, even if you don't sell.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/what-is-deemed-disposal" style={{ color: 'var(--link)' }}>
                Learn more about deemed disposal →
              </Link>
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Dividend (Distribution)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A payment made to investors by a company or fund. Under the investment undertaking model, dividends and distributions can be part of what triggers a chargeable event for certain investors.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Diversification</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              Spreading investments across different holdings, sectors, or asset types to reduce concentration risk. ETFs can provide diversification because they hold a basket of underlying assets.
            </p>
          </div>
        </section>

        {/* E SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>E</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>ETF (Exchange‑Traded Fund)</h3>
            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 12 }}>
              A fund that holds a basket of assets (shares, bonds, etc.) and trades on a stock exchange like a regular share. Revenue notes ETFs can take different legal and regulatory forms, which matters for tax treatment.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/what-is-an-etf" style={{ color: 'var(--link)' }}>
                Learn more about ETFs →
              </Link>
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Exit Tax (Investment Undertakings / Gross Roll‑Up)</h3>
            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 12 }}>
              A tax regime that commonly applies to Irish regulated funds (and some equivalent offshore funds), where tax is charged on chargeable events rather than annually. Chargeable events include the 8‑year deemed disposal.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              <strong>Rate note:</strong> Exit tax rate is 38% from 1 January 2026 (previously 41%) for relevant funds and products.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Exchange Rate (FX Rate)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              The price of one currency in another (e.g., EUR/USD). Currency movements can affect the EUR value of foreign‑currency investments. Revenue notes non‑euro currencies are assets for CGT purposes, meaning realised FX gains/losses can be relevant.
            </p>
          </div>
        </section>

        {/* F SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>F</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>FIFO (First In, First Out)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A share identification method where the oldest shares are treated as sold first when you dispose of part of a holding. Revenue explains FIFO for shares acquired on different dates.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>4‑Week Rule (Wash Sale Rule)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A special share identification and loss restriction rule: where shares of the same class are acquired and disposed of within 4 weeks, normal FIFO can be overridden and loss use can be restricted. Revenue's manuals describe this rule and its purpose.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Foreign Currency</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              Any currency other than EUR. Many ETFs trade in USD, GBP, etc., so you typically end up translating values into EUR for reporting, and FX movements may matter.
            </p>
          </div>
        </section>

        {/* G SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>G</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Gain (or Loss)</h3>
            <p style={{ margin: 0, color: 'var(--muted)', marginBottom: 12 }}>
              The difference between what you received and what you paid (plus allowable costs), depending on the regime and asset type. Revenue describes the chargeable gain concept for CGT.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              <strong>Important:</strong> Loss treatment differs by regime—investors should not assume ETF and fund losses can always be offset the same way as standard CGT losses. Loss relief under the exit tax regime is more limited.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Gross Roll‑Up</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A way of describing the investment undertaking regime where profits "roll up" and tax is triggered at chargeable events rather than annually. The policy intent and 8‑year rule are discussed in official Revenue guidance and professional summaries.
            </p>
          </div>
        </section>

        {/* I SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>I</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>ISIN (International Securities Identification Number)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A unique 12‑character code identifying a security worldwide (often used to identify ETFs accurately). Example: IE00B3XXRP09 is the ISIN for VUSA.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Investment Undertaking</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A category of fund structures under Irish tax rules that can fall under the gross roll‑up and exit tax regime. Revenue's manual is specifically titled "Investment Undertakings" and explains the regime and chargeable events.
            </p>
          </div>
        </section>

        {/* L SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>L</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Lot</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A batch of shares/units bought at the same time and price. Lots matter when you calculate gains/losses and apply identification rules (e.g., FIFO for shares).
            </p>
          </div>
        </section>

        {/* M SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>M</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Market Price (Market Value)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              The current trading price/value of an asset. For deemed disposal calculations, valuation at the 8‑year point is central because the 8‑year point is a defined chargeable event in Revenue guidance.
            </p>
          </div>
        </section>

        {/* R SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>R</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Realised Gain (or Loss)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A gain/loss that becomes "real" when a taxable event happens (like an actual disposal). Under the fund regime, a deemed disposal can also act as a tax event, effectively forcing a "realisation point" for tax purposes.
            </p>
          </div>
        </section>

        {/* S SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>S</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Settlement Date</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              The date a trade is finalised and ownership/funds are exchanged. Many securities markets use a T+2 settlement cycle (trade date + 2 business days).
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Sector</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A category of the economy (e.g., technology, healthcare, energy). Some ETFs focus on one sector, while others are broad market.
            </p>
          </div>
        </section>

        {/* T SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>T</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Ticker (Symbol)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A short code used to identify a traded instrument (e.g., "VUSA"). Revenue notes that "ETF" can refer to a wide range of investments and legal forms, so tickers alone may not be enough to determine tax treatment without more detail (like ISIN and domicile).
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Tax Year (Ireland)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              In Ireland, the tax year runs 1 January to 31 December. Deemed disposal events are reported for the tax year in which they occur.
            </p>
          </div>
        </section>

        {/* U SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>U</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Unrealised Gain (or Loss)</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              A "paper" gain or loss because you haven't sold. Under deemed disposal, an 8‑year chargeable event can tax gains even without a sale.
            </p>
          </div>
        </section>

        {/* Y SECTION */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: 12, marginBottom: 24 }}>Y</h2>

          <div style={{ marginBottom: 30 }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Yield</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              The annual income from an investment (dividends or interest) expressed as a percentage.
            </p>
          </div>
        </section>

        {/* RELATED RESOURCES */}
        <section style={{ marginTop: 60, marginBottom: 40 }}>
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
            <Link href="/faq" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>FAQ →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Common questions answered
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* EMAIL SIGNUP CTA */}
        <EmailSignup 
          title="Help Improve the Calculator"
          description="Submit your broker CSV files to help us support more brokers, or report a bug — your feedback makes the calculator better for everyone."
        />

        <Callout variant="info" icon="⚖️" title="Glossary Disclaimer">
          <p style={{ marginBottom: 0 }}>
            This glossary provides general information only and is not tax advice. Revenue manuals explicitly state they are guidance only and not comprehensive professional advice. For definitions specific to your situation, consult a qualified Irish tax professional.
          </p>
        </Callout>
      </PageShell>
    </>
  )
}
