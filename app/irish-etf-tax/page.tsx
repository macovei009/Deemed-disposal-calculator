import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'Irish ETF Tax Explained (Exit Tax + Deemed Disposal) | Deemed Disposal Calculator',
  description: 'A clear overview of Irish ETF tax: exit tax, chargeable events, 8‑year deemed disposal, rates (38% from 2026), records, and FX conversion.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/irish-etf-tax'
  }
}

export default function IrishETFTax() {
  return (
    <>
      <PageShell>
        <h1 style={{ marginBottom: 12 }}>Irish ETF Tax Explained (Exit Tax + Deemed Disposal)</h1>
        <p className="lead">
          How ETFs are taxed in Ireland. Understand chargeable events, the 8‑year rule, exit tax rates, and what records you need to keep.
        </p>

        {/* INTRO SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>The Key Difference for Irish Investors</h2>
          <p>
            If you're an Irish tax resident and you invest in ETFs, here's the essential thing to know:
          </p>
          <p>
            Many ETFs are taxed under Ireland's <strong>"investment undertaking / gross roll‑up"</strong> rules, where tax is triggered by <strong>chargeable events</strong>—including an 8‑year deemed disposal—rather than only when you sell like ordinary shares.
          </p>

          <Callout variant="info" icon="ℹ️" title="This page is an overview">
            <p style={{ marginBottom: 0 }}>
              This is not tax advice. Always check Revenue guidance for your specific ETF and circumstances, as tax rules can change and individual situations vary.
            </p>
          </Callout>
        </section>

        {/* 30-SECOND SUMMARY */}
        <section style={{ marginBottom: 40 }}>
          <h2>Key Takeaway (30 Seconds)</h2>
          <p>
            For many Irish ETF investors, tax is triggered at these moments:
          </p>
          <ul>
            <li><strong>Distributions / dividends</strong> paid by the fund (if any) can be a chargeable event</li>
            <li><strong>When you sell / redeem / transfer</strong> your holding also a chargeable event</li>
            <li><strong>Every 8 years after you buy</strong> (even if you don't sell) the 8‑year deemed disposal, which is also a chargeable event</li>
          </ul>
        </section>

        {/* SECTION 1: THE GROSS ROLL-UP MODEL */}
        <section style={{ marginBottom: 40 }}>
          <h2>1. The "Gross Roll‑Up / Exit Tax" Model</h2>
          <p>
            Revenue describes the <strong>"gross roll‑up"</strong> approach as one where profits roll up inside the fund and tax is applied when a <strong>chargeable event</strong> occurs.
          </p>
          <p>
            Chargeable events can include:
          </p>
          <ul>
            <li>Dividends and distributions paid out</li>
            <li>Redemption or repurchase of shares</li>
            <li>Transfers of holdings</li>
            <li>The 8‑year deemed disposal</li>
          </ul>
          <p>
            <strong>Why this matters:</strong> With many ETFs, you don't just think "tax when I sell." You also think "tax at 8 years" and "tax on distributions (if any)."
          </p>
        </section>

        {/* SECTION 2: DEEMED DISPOSAL */}
        <section style={{ marginBottom: 40 }}>
          <h2>2. Deemed Disposal (The 8‑Year Rule)</h2>
          <p>
            Revenue's investment undertaking guidance lists a chargeable event occurring at the end of an 8‑year period from acquisition, and at each subsequent 8‑year period—commonly called <strong>deemed disposal</strong>.
          </p>
          <p>
            The policy rationale: the Finance Act 2006 introduced the 8‑year deemed disposal as a chargeable event specifically to prevent indefinite deferral of tax under the gross roll‑up regime.
          </p>
          <p>
            <strong>In simple terms:</strong> Every 8 years, the tax system treats you as if you've sold your ETF and recomputed the gains, even if you haven't actually sold anything.
          </p>
          <div style={{
            backgroundColor: 'var(--info-bg)',
            border: '1px solid var(--info)',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
            marginBottom: 16
          }}>
            <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--info)' }}>
              <strong>Learn more:</strong> Read our deep dive into <Link href="/what-is-deemed-disposal" style={{ color: 'var(--info)', textDecoration: 'underline' }}>how deemed disposal works</Link>.
            </p>
          </div>
        </section>

        {/* SECTION 3: TAX RATES */}
        <section style={{ marginBottom: 40 }}>
          <h2>3. What Tax Rate Applies? (Important 2026 Update)</h2>
          <p>
            <strong>This is a critical practical change for 2026:</strong>
          </p>
          <p>
            Ireland reduced the exit tax rate that applies to investment undertakings, offshore equivalents, and certain other investments <strong>from 41% to 38%</strong>, effective <strong>from 1 January 2026</strong> for relevant chargeable events.
          </p>
          <div style={{
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
            marginBottom: 16
          }}>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>Timeline:</strong>
            </p>
            <ul style={{ marginTop: 0 }}>
              <li><strong>Before 1 Jan 2026:</strong> 41% exit tax on chargeable events</li>
              <li><strong>From 1 Jan 2026 onwards:</strong> 38% exit tax on chargeable events</li>
            </ul>
          </div>

          <Callout variant="warning" icon="⚠️" title="Exact treatment depends on ETF classification">
            <p style={{ marginBottom: 0 }}>
              The rate that applies depends on the ETF's classification. This is why a good calculator should show "what regime we assumed" and "which rates were used," so you know exactly what's included in the calculation.
            </p>
          </Callout>
        </section>

        {/* SECTION 4: COST BASIS AFTER DEEMED DISPOSAL */}
        <section style={{ marginBottom: 40 }}>
          <h2>4. Cost Basis After Deemed Disposal (What Happens "Next")</h2>
          <p>
            A deemed disposal is effectively treated as a <strong>"tax checkpoint"</strong>. You calculate gains up to the 8‑year date, pay the tax due, and then future calculations need to reflect what happened at that chargeable event.
          </p>

          <h3>Example: Cost Basis Reset</h3>
          <div style={{
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
            marginBottom: 16
          }}>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>Scenario:</strong> You buy €5,000 of an ETF on 1 January 2016.
            </p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>1 January 2024 (8 years):</strong> The ETF is worth €7,500. Deemed disposal tax is owed on the €2,500 gain.
            </p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              <strong>After 1 January 2024:</strong> For tax purposes, your cost basis becomes €7,500 (the market value at the deemed disposal event), not €5,000.
            </p>
            <p style={{ marginTop: 0 }}>
              <strong>If you sell in 2026 at €8,000:</strong> You only owe tax on €500 gain (€8,000 − €7,500), not €3,000.
            </p>
          </div>

          <p>
            <strong>Practical takeaway:</strong> Keep records of the 8‑year valuation and tax paid, because it affects later tax events.
          </p>
        </section>

        {/* SECTION 5: DISTRIBUTING VS ACCUMULATING */}
        <section style={{ marginBottom: 40 }}>
          <h2>5. Distributing vs Accumulating ETFs (Dividends)</h2>
          <p>
            Some ETFs distribute cash (dividends or interest). Others accumulate income inside the fund. Under the investment undertaking regime, a distribution or dividend can be a <strong>chargeable event</strong>.
          </p>

          <h3>Why This Matters for Investors</h3>
          <ul>
            <li><strong>If your ETF is accumulating:</strong> You may have fewer interim cash tax points, but the 8‑year deemed disposal can still apply where the regime applies</li>
            <li><strong>If your ETF distributes:</strong> You may have more frequent chargeable events</li>
          </ul>

          <Callout variant="info" icon="ℹ️" title="Know your ETF type">
            <p style={{ marginBottom: 0 }}>
              Check your ETF's factsheet or prospectus to see if it's distributing or accumulating. This affects how often you face tax events.
            </p>
          </Callout>
        </section>

        {/* SECTION 6: ETF TYPE AND DOMICILE */}
        <section style={{ marginBottom: 40 }}>
          <h2>6. ETF Type and Domicile Matter (2022 Guidance Change)</h2>
          <p>
            Revenue's ETF manual makes two crucial points:
          </p>
          <ul>
            <li><strong>"ETF" is a general industry term</strong> and ETFs can take different legal and regulatory forms. Tax treatment depends on what the ETF actually is</li>
            <li><strong>Earlier guidance that treated some ETFs like shares no longer applies from 1 January 2022</strong> (e.g., certain US/EEA/OECD ETFs)</li>
          </ul>

          <h3>The 2022 Transition & 8‑Year Rule</h3>
          <p>
            Revenue notes a transitional interaction with the 8‑year rule: where an ETF previously covered by earlier guidance is found equivalent to an Irish ETF, <strong>the 8‑year period is counted from 2022</strong>. This means the earliest deemed disposal would be <strong>2030</strong> in that scenario.
          </p>

          <Callout variant="warning" icon="⚠️" title="2022 Guidance Change">
            <p>
             Always check the current Revenue guidance.
            </p>
          </Callout>

          <p>
            <strong>Why your calculator should care:</strong> A good calculator should prefer an explicit "ETF classification" step (based on ISIN, domicile, and legal form) rather than assuming all ETFs are treated the same.
          </p>
        </section>

        {/* SECTION 7: CURRENCY & FX */}
        <section style={{ marginBottom: 40 }}>
          <h2>7. EUR vs Other Currencies (FX Conversion)</h2>
          <p>
            Irish tax reporting is done in euro amounts. In practice, investors generally compute gains using EUR values at relevant dates (purchase date, deemed disposal date, sale date).
          </p>

          <h3>How FX Affects Your Tax</h3>
          <p>
            Many ETFs trade in non‑EUR currencies (e.g., VUSA in USD, VTI in USD). When you buy, sell, or experience deemed disposal:
          </p>
          <ul>
            <li>The tax authorities convert the gain/loss to EUR at the exchange rate on the relevant date</li>
            <li>Exchange rate gains/losses themselves can be taxable in some cases</li>
            <li>This is why good record-keeping includes noting the FX rates used at each event</li>
          </ul>

          <p>
            <strong>How our calculator handles it:</strong>
          </p>
          <ul>
            <li>"We convert prices and transactions into EUR at the relevant dates to calculate gains consistently."</li>
            <li>"Where FX affects values, we show the FX rates used in the calculation breakdown."</li>
          </ul>
        </section>

        {/* SECTION 8: EXEMPTIONS */}
        <section style={{ marginBottom: 40 }}>
          <h2>8. Exemptions and Special Cases</h2>
          <p>
            Certain investors can be exempt from exit tax in specific contexts. Revenue's investment undertaking manual includes extensive sections on declarations and categories such as:
          </p>
          <ul>
            <li>Pension schemes (PRSA, occupational pensions)</li>
            <li>Certain approved bodies and charities</li>
            <li>Life insurance policy holders (in specific cases)</li>
          </ul>

          <p>
            <strong>For most retail investors:</strong> Your personal situation and the ETF's classification can change the result, so check Revenue guidance when in doubt.
          </p>

          <Callout variant="info" icon="ℹ️" title="Does your situation qualify?">
            <p style={{ marginBottom: 0 }}>
              Consult a tax professional if you think you might qualify for an exemption. This calculator assumes standard retail investor treatment.
            </p>
          </Callout>
        </section>

        {/* SECTION 9: RECORDS */}
        <section style={{ marginBottom: 40 }}>
          <h2>9. What Records Should You Keep?</h2>
          <p>
            To calculate deemed disposal correctly and support your tax filings, you generally need:
          </p>
          <ul>
            <li><strong>Buy dates and quantities:</strong> When you purchased each ETF and how many shares/units</li>
            <li><strong>Total cost:</strong> Purchase price including any fees</li>
            <li><strong>ETF value at the 8‑year date:</strong> Market value at each 8‑year anniversary (and any sale date)</li>
            <li><strong>Distribution notes:</strong> Any dividends or distributions received</li>
            <li><strong>Tax paid:</strong> Records of any tax already paid at earlier chargeable events</li>
            <li><strong>FX rates:</strong> Exchange rates used on key dates if the ETF trades in non‑EUR currency</li>
          </ul>

          <Callout variant="info" icon="📋" title="This is exactly why a calculator helps">
            <p style={{ marginBottom: 0 }}>
              A calculator that finds 8‑year dates, documents market values, tracks tax paid at each event, and maintains records is invaluable. Manual tracking across multiple ETFs and periods is error‑prone.
            </p>
          </Callout>
        </section>

        {/* SECTION 10: NEXT STEPS */}
        <section style={{ marginBottom: 40 }}>
          <h2>10. Next Steps</h2>
          <p>
            Now that you understand Irish ETF tax, dive deeper into specific topics:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
            <Link href="/what-is-an-etf" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>What is an ETF? →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Understand ETF basics and types
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
            <Link href="/calculator" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Calculator →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Calculate your tax liability
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
              Is Irish ETF tax the same as CGT (Capital Gains Tax) on shares?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Often, ETFs and funds can fall under the investment undertaking / gross roll‑up regime, which triggers tax on chargeable events (including 8‑year deemed disposal), rather than only on sale like ordinary shares. This is a different regime from normal CGT rules, so the rates, treatment, and timing differ. Always verify which regime applies to your specific ETF.
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
              Why does deemed disposal exist?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              An Oireachtas answer explains that it was introduced as a chargeable event to prevent indefinite tax deferral under the gross roll‑up regime. Without the 8‑year rule, investors could hold growth investments forever and never pay tax until they sold. The rule ensures the tax system gets a "check-in" every 8 years.
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
              What tax rate applies now (2026)?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              The reduction from 41% to 38% from 1 January 2026 for relevant investment undertakings and life products is now in effect. This applies to chargeable events on or after that date. Check with your tax adviser for how this affects your specific situation.
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
              What if my ETF distributes dividends?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Under the investment undertaking regime, distributions from your ETF can be chargeable events. This means you may have more frequent tax events beyond just the 8‑year deemed disposal. Check your ETF's prospectus to see if it's distributing or accumulating.
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
              Does deemed disposal apply to my pension?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              No. Pensions (PRSA, occupational schemes) have different tax treatment. Deemed disposal rules are typically discussed for taxable investors in funds, not within pension structures. Your pension provider can explain the tax treatment that applies to your pension investment.
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
              How should I handle FX (foreign currencies) in my tax calculation?
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, color: 'var(--muted)' }}>
              Irish tax is reported in EUR. When your ETF trades in a different currency (e.g., USD), you convert the purchase price, 8‑year valuation, and sale price to EUR at the exchange rates on those respective dates. Exchange rate differences can then create gains or losses that affect your tax calculation. Keep records of the FX rates used.
            </p>
          </details>
        </section>

        {/* EMAIL SIGNUP CTA */}
        <EmailSignup 
          title="Get Advanced Tax Tools"
          description="Stay ahead of Irish tax changes. Get early access to automated exit tax calculations, Revenue compliance reports, and multi-currency FX tracking."
        />

        <Callout variant="info" icon="⚖️" title="Tax Disclaimer">
          <p style={{ marginBottom: 0 }}>
            This site provides general information only and is not tax advice. Tax rules can change and individual circumstances vary. We recommend consulting with a qualified Irish tax professional before making investment or tax decisions. Revenue's manuals themselves emphasize their guidance is not comprehensive advice for all situations.
          </p>
        </Callout>
      </PageShell>
    </>
  )
}
