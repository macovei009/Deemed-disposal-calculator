import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'What Is Deemed Disposal? (Ireland 8‑Year Rule) | Deemed Disposal Calculator',
  description: 'Deemed disposal is Ireland\'s 8‑year tax rule for many ETFs/funds. Learn how it works, who it applies to, and how the gain is calculated.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/what-is-deemed-disposal'
  }
}

export default function WhatIsDeemedDisposal() {
  return (
    <>
      <PageShell>
        <h1 style={{ marginBottom: 12 }}>What Is Deemed Disposal? (Ireland's 8‑Year Rule)</h1>
        <p className="lead">
          Deemed disposal is an Irish tax rule that can apply to certain funds and ETFs. After 8 years, you may owe tax on gains even if you haven't sold. Learn how it works and what it means for your investments.
        </p>

        {/* DEFINITION SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>What Is Deemed Disposal?</h2>
          <p>
            <strong>Deemed disposal</strong> is an Irish tax rule that can apply to certain funds and ETFs. It means that after 8 years, the tax authorities may treat you as if you sold your holding even if you didn't actually sell. This 8‑year point is described by Revenue as a <strong>"chargeable event"</strong> at the end of each 8‑year period.
          </p>
          <p>
            <strong>In plain English:</strong> If deemed disposal applies, you may owe tax on the gain at the 8‑year mark, while still owning the investment. No sale required - just a tax bill.
          </p>

          <Callout variant="warning" icon="⚠️" title="Key Point">
            <p>
              Deemed disposal is <strong>not the same as selling your investment</strong>. The tax authority treats it as if you sold it for tax purposes, but you still own it unless you choose to sell.
            </p>
          </Callout>
        </section>

        {/* THE 8-YEAR RULE SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>The 8‑Year Rule (How It Works)</h2>
          <p>
            Revenue's investment undertaking guidance lists a chargeable event as happening:
          </p>
          <blockquote style={{
            borderLeft: '4px solid var(--primary)',
            paddingLeft: 16,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 16,
            marginBottom: 16,
            fontStyle: 'italic',
            color: 'var(--muted)'
          }}>
            "on the ending of an 8‑year period beginning with the acquisition of a unit… and each subsequent 8‑year period"
          </blockquote>
          <p>
            This is commonly referred to as <strong>deemed disposal</strong>.
          </p>

          <h3>The Timeline</h3>
          <ol>
            <li>You buy an ETF or fund</li>
            <li>You hold it for 8 years</li>
            <li>At the 8‑year anniversary, you calculate the gain (or loss) up to that date</li>
            <li>Tax can be due as a chargeable event (even with no sale)</li>
            <li>You still own the investment unless you choose to sell</li>
          </ol>
        </section>

        {/* EXAMPLE TIMELINE */}
        <section style={{ marginBottom: 40 }}>
          <h2>Example Timeline (Simple)</h2>

          <p style={{ marginBottom: 20 }}>
            <strong>Scenario:</strong> You buy €5,000 of an ETF on 1 January 2016. On 1 January 2024 it's worth €7,500.
          </p>

          <div style={{
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 20,
            marginBottom: 24
          }}>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>1 January 2016:</strong> Invest €5,000
            </p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>1 January 2024:</strong> 8 years have passed → deemed disposal chargeable event may apply
            </p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>Gain:</strong> €7,500 − €5,000 = €2,500
            </p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>Tax due:</strong> If the investment undertaking regime applies, tax is typically exit tax (not normal CGT) on that gain.
            </p>
            <p style={{ marginTop: 0 }}>
              <strong>After payment:</strong> You still own the holding unless you choose to sell it.
            </p>
          </div>

          <Callout variant="info" icon="ℹ️" title="Cost Basis Reset">
            <p style={{ marginBottom: 0 }}>
              After a deemed disposal event, the investment's cost basis (purchase price for tax calculations) is adjusted to reflect the market value at the 8‑year point. Your next 8‑year period starts fresh from that new cost basis.
            </p>
          </Callout>
        </section>

        {/* TAX RATES */}
        <section style={{ marginBottom: 40 }}>
          <h2>What Tax Rate Applies?</h2>
          <p>
            Revenue's guidance explains that <strong>exit tax</strong> (the tax on deemed disposal) is applied to gains. For Irish individuals:
          </p>
          <ul>
            <li><strong>41%</strong> exit tax (historically the standard rate)</li>
            <li><strong>38%</strong> exit tax for chargeable events on or after 1 January 2026 (per Finance Bill changes)</li>
          </ul>

          <Callout variant="warning" icon="⚠️" title="Important">
            <p>
              The exact regime and tax rate can depend on the ETF/fund type, structure, and your circumstances. This is general information, not tax advice. Consult a tax professional for your specific situation.
            </p>
          </Callout>
        </section>

        {/* WHO DOES IT APPLY TO */}
        <section style={{ marginBottom: 40 }}>
          <h2>Who Does Deemed Disposal Apply To?</h2>
          <p>
            Deemed disposal is most commonly associated with funds and ETFs taxed as <strong>"investment undertakings"</strong> under the gross roll‑up regime (Revenue's Chapter 1A Part 27 guidance).
          </p>

          <h3>Commonly Affected</h3>
          <ul>
            <li><strong>Many UCITS ETFs</strong> and collective investment funds that fall under the investment undertaking regime (the regime explicitly includes UCITS structures)</li>
            <li><strong>Equivalent offshore funds</strong> can also fall under comparable rules depending on classification (Revenue provides ETF‑specific guidance)</li>
          </ul>

          <h3>Commonly NOT Affected</h3>
          <ul>
            <li><strong>Direct shares/stocks:</strong> Ordinary shares held directly are generally not subject to the investment undertaking 8‑year chargeable event regime in the same way</li>
            <li><strong>Pensions:</strong> Pensions (e.g., PRSA, occupational schemes) can have different tax treatment; deemed disposal is typically discussed for taxable investors in funds</li>
            <li><strong>Your home:</strong> Principal private residence is exempt</li>
          </ul>

          <Callout variant="info" icon="ℹ️" title="ETF vs Share Type Matters">
            <p style={{ marginBottom: 0 }}>
              The 8‑year deemed disposal rule is tied to <strong>units in investment undertakings/funds</strong>, not ordinary shares held directly. This distinction is important for understanding which of your holdings are affected.
            </p>
          </Callout>
        </section>

        {/* WHY DOES THIS RULE EXIST */}
        <section style={{ marginBottom: 40 }}>
          <h2>Why Does This Rule Exist?</h2>
          <p>
            Ireland's gross roll‑up approach taxes fund gains on chargeable events (like deemed disposal), rather than every year. The 8‑year deemed disposal rule acts like a periodic <strong>"checkpoint"</strong> so tax isn't deferred indefinitely.
          </p>
          <p>
            Without this rule, investors could hold growth investments forever and never pay tax until they actually sell. Revenue's framework ensures the tax authority gets a "check-in" every 8 years to collect tax on accumulated gains.
          </p>
        </section>

        {/* WHAT HAPPENS AFTER DEEMED DISPOSAL */}
        <section style={{ marginBottom: 40 }}>
          <h2>What Happens After Deemed Disposal? (Cost Basis &amp; Future Tax)</h2>
          <p>
            After a deemed disposal event, future tax calculations generally need to account for tax already paid. Revenue's investment undertaking manual includes guidance on offsetting previously paid exit tax.
          </p>

          <h3>Records You Need</h3>
          <p>Good record-keeping is essential for managing deemed disposal across multiple periods:</p>
          <ul>
            <li>Buy dates and amounts</li>
            <li>Market value at each 8‑year anniversary</li>
            <li>Tax paid at each deemed disposal event</li>
            <li>Adjusted cost basis after each event</li>
          </ul>

          <Callout variant="info" icon="📋" title="This Is Why a Calculator Matters">
            <p style={{ marginBottom: 0 }}>
              A calculator that identifies 8‑year dates, documents market values, and tracks tax paid at each event is invaluable. Manual tracking across multiple ETFs and periods is error‑prone.
            </p>
          </Callout>
        </section>

        {/* WHAT CAN YOU DO */}
        <section style={{ marginBottom: 40 }}>
          <h2>What Can You Do About It? (Your Options)</h2>

          <h3>Option 1: Sell Before 8 Years</h3>
          <p>
            You can sell before the 8‑year point to avoid a deemed disposal event at that anniversary. However, you may still have tax due on the actual disposal depending on the applicable regime.
          </p>
          <p>
            <strong>Pros:</strong> Avoid deemed disposal at the 8‑year mark
          </p>
          <p>
            <strong>Cons:</strong> Incur tax on actual sale; exit the investment
          </p>

          <h3>Option 2: Hold and Pay the Deemed Disposal Tax</h3>
          <p>
            If deemed disposal applies, you calculate the gain at the 8‑year point and pay the tax due on that chargeable event. You continue to hold the investment.
          </p>
          <p>
            <strong>Pros:</strong> Keep your investment; compounding may resume
          </p>
          <p>
            <strong>Cons:</strong> Pay tax without selling; need cash for the tax bill
          </p>

          <h3>Option 3: Plan Ahead for Cash Flow</h3>
          <p>
            A key challenge with deemed disposal is that you owe tax without selling the investment. Many investors plan ahead to have cash available around 8‑year anniversaries so they can pay the tax bill without disrupting their portfolio.
          </p>
        </section>

        {/* RECENT REVENUE GUIDANCE */}
        <section style={{ marginBottom: 40 }}>
          <h2>Recent Revenue Guidance (Fresh &amp; Updated)</h2>
          <p>
            Revenue's ETF manual notes that earlier guidance treating certain ETFs like shares does not apply from <strong>1 January 2022</strong>. Key updates:
          </p>
          <ul>
            <li>Where an ETF is considered equivalent to an Irish ETF, the 8‑year deemed disposal rule can apply</li>
            <li>A transitional approach exists where the 8 years are counted from 2022 (so earliest deemed disposal would be 2030 for affected ETFs)</li>
            <li>This guidance reflects a significant shift in Revenue's tax treatment of certain ETFs</li>
          </ul>

          <Callout variant="warning" icon="⚠️" title="Older Guidance May Be Out of Date">
            <p>
              If you've read blog posts or articles about ETF taxation before 2022, they may reflect outdated guidance. Always check Revenue's current guidance or consult a tax professional for the latest rules.
            </p>
          </Callout>
        </section>

        {/* EMAIL SIGNUP CTA */}
        <EmailSignup 
          title="Help Improve the Calculator"
          description="Submit your broker CSV files to help us support more brokers, or report a bug — your feedback makes the calculator better for everyone."
        />

        {/* FAQ SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>Frequently Asked Questions</h2>

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
              Do I owe tax if I don't sell my ETF?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              If your holding falls under the investment undertaking regime, an 8‑year chargeable event (deemed disposal) can occur even without a sale. Yes, you may owe tax without selling.
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
              Is deemed disposal the same as Capital Gains Tax (CGT)?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Often, deemed disposal is discussed under the exit tax / gross roll‑up rules for investment undertakings, not normal CGT rules for shares. The rate, treatment, and rules differ from CGT. Consult a tax professional to understand which applies to your specific holdings.
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
              What tax rate applies to deemed disposal?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Revenue states 41% exit tax for individuals (historically), decreasing to 38% from 1 January 2026 for chargeable events on or after that date (per Finance Bill changes). However, the exact rate depends on your circumstances and the regime.
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
              Can I avoid deemed disposal?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              You can sell before the 8‑year point, which avoids a deemed disposal event at that anniversary. However, you'd incur tax on the actual sale. Some investments may not fall under the investment undertaking regime at all. A tax professional can advise on your options.
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
              Does deemed disposal apply to pensions?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              No. Pensions (PRSA, occupational schemes) have different tax treatment. Deemed disposal rules are typically discussed for taxable investors in funds, not within pension structures.
            </p>
          </details>
        </section>

        {/* NEXT STEPS */}
        <section style={{ marginBottom: 40 }}>
          <h2>Next Steps</h2>
          <p>
            Now that you understand deemed disposal, explore related topics:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
            <Link href="/what-is-an-etf" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is an ETF? →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Understand what ETFs are and why they're affected
                </p>
              </div>
            </Link>
            <Link href="/irish-etf-tax" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Irish ETF Tax →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Tax rates, allowed ETF types, record‑keeping
                </p>
              </div>
            </Link>
            <Link href="/calculator" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Calculator →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Calculate your deemed disposal tax
                </p>
              </div>
            </Link>
          </div>
        </section>

        <Callout variant="info" icon="⚖️" title="Tax Disclaimer">
          <p style={{ marginBottom: 0 }}>
            This site provides general information only and is not tax advice. Deemed disposal rules are complex and subject to change. We recommend consulting with a qualified Irish tax professional before making investment or tax decisions.
          </p>
        </Callout>
      </PageShell>
    </>
  )
}
