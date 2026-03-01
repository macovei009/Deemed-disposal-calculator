import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'
import EmailSignup from '@/components/EmailSignup'

export const metadata = {
  title: 'What Is an ETF? (Ireland Guide) | Deemed Disposal Calculator',
  description: 'Learn what ETFs are, how they work, costs, risks, and how ETFs are taxed in Ireland including the 8‑year deemed disposal rule.',
  alternates: {
    canonical: 'https://www.deemeddisposalcalculator.ie/what-is-an-etf'
  }
}

export default function WhatIsAnETF() {
  return (
    <>
      <PageShell>
        <h1 style={{ marginBottom: 12 }}>What Is an ETF? (Exchange‑Traded Fund)</h1>
        <p className="lead">
          An ETF is a fund that holds a basket of assets and trades like a stock. Learn how they work, why investors use them, and how they're taxed in Ireland.
        </p>

        {/* DEFINITION SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>ETF Definition</h2>
          <p>
            An <strong>ETF (Exchange‑Traded Fund)</strong> is an investment fund that holds a basket of assets (such as shares, bonds, or commodities) and trades on a stock exchange like a regular share.
          </p>
          <p>
            Because ETFs trade on an exchange, their price can move throughout the trading day, and you can buy or sell them during market hours. This is unlike traditional mutual funds, which typically price once per day at end‑of‑day.
          </p>
          <p>
            <strong>In plain English:</strong> An ETF lets you buy "a whole bundle of investments" in one purchase, using your brokerage account.
          </p>
        </section>

        {/* BASICS SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>ETF Basics (Quick Summary)</h2>
          <ul>
            <li><strong>ETF = a fund + a share‑like wrapper:</strong> A fund that trades on an exchange</li>
            <li><strong>Most track something:</strong> An index, sector, theme, or bond market (though some are actively managed)</li>
            <li><strong>Broad diversification:</strong> One trade can give exposure across many underlying holdings</li>
          </ul>
        </section>

        {/* WHAT DO ETFS INVEST IN */}
        <section style={{ marginBottom: 40 }}>
          <h2>What Do ETFs Invest In?</h2>
          <p>ETFs can hold many types of assets, including:</p>
          <ul>
            <li><strong>Equities (shares):</strong> e.g., broad market indexes like the S&amp;P 500 or European stock markets</li>
            <li><strong>Bonds:</strong> Government bonds, corporate bonds, high‑yield bonds, and other fixed income</li>
            <li><strong>Commodities:</strong> Such as gold exposure (often via commodity‑linked structures)</li>
            <li><strong>Other strategies:</strong> Some ETFs use derivatives or special approaches (these are generally more complex and higher risk)</li>
          </ul>
        </section>

        {/* WHY INVESTORS USE ETFS */}
        <section style={{ marginBottom: 40 }}>
          <h2>Why Investors Use ETFs</h2>

          <h3>1. Diversification in One Purchase</h3>
          <p>
            Many ETFs provide exposure to hundreds (sometimes thousands) of securities in one holding. This reduces reliance on any single company's performance and spreads risk across many investments.
          </p>

          <h3>2. Low Ongoing Costs (Often)</h3>
          <p>
            Many broad index ETFs have relatively low ongoing charges. For example, passively managed ETFs typically have operating expense ratios around 0.15–0.30%, though this varies by ETF. This is lower than many actively managed funds.
          </p>

          <h3>3. Simple to Buy and Sell</h3>
          <p>
            ETFs trade on exchanges and can be bought and sold during market hours, just like regular shares. You don't need to wait for end‑of‑day pricing.
          </p>

          <h3>4. Transparency</h3>
          <p>
            Many ETFs publish their holdings daily and are designed to track a clear benchmark or rules‑based strategy. You know exactly what you own.
          </p>
        </section>

        {/* ETF RISKS */}
        <section style={{ marginBottom: 40 }}>
          <h2>ETF Risks (Important)</h2>
          <p>
            Even though ETFs are convenient, they still carry investment risks:
          </p>

          <h3>Market Risk</h3>
          <p>
            If the underlying market falls, the ETF can fall too. For example, if you own a US stock ETF and the stock market declines, the ETF's value will decline.
          </p>

          <h3>Concentration Risk</h3>
          <p>
            Sector or thematic ETFs can be less diversified than broad‑market ETFs. An ETF focused on tech stocks, for example, carries more sector risk than an ETF tracking the entire market.
          </p>

          <h3>Complex ETF Risk</h3>
          <p>
            Leveraged, inverse, or derivative‑based ETFs are more complex and can behave very differently from "normal" index ETFs. These are generally suitable only for experienced investors.
          </p>

          <Callout variant="warning" icon="⚠️" title="Investment Risk">
            <p>
              All ETFs carry market risk. Past performance is not a guarantee of future results. Consider your investment objectives and risk tolerance before investing.
            </p>
          </Callout>
        </section>

        {/* ETF VS MUTUAL FUND */}
        <section style={{ marginBottom: 40 }}>
          <h2>ETF vs Mutual Fund (What's the Difference?)</h2>
          <p>
            Both ETFs and mutual funds can hold diversified baskets of assets. However, a key difference is how they trade:
          </p>
          <ul>
            <li><strong>ETFs</strong> trade throughout the day on an exchange, like normal shares (price changes during market hours)</li>
            <li><strong>Mutual funds</strong> typically price and trade once daily at Net Asset Value (NAV) after market close</li>
          </ul>
          <p>
            This makes ETFs more flexible for trading during market hours, but it also means their price can fluctuate throughout the day.
          </p>
        </section>

        {/* UCITS ETFS */}
        <section style={{ marginBottom: 40 }}>
          <h2>UCITS ETFs (Common in Ireland &amp; Europe)</h2>
          <p>
            Most ETFs available to EU retail investors are often structured under the <strong>UCITS framework</strong>, which is an EU regime designed for retail investor protection. UCITS rules cover:
          </p>
          <ul>
            <li>Liquidity requirements (assets must be easy to value and sell)</li>
            <li>Diversification limits (concentration is restricted)</li>
            <li>Custody safeguards (assets are held separately)</li>
            <li>Disclosure rules (clear information for investors)</li>
          </ul>
          <p>
            In Ireland specifically, ETFs are often established under UCITS structures and may be held in clearing systems. This is important for understanding which regulatory framework applies to your investments.
          </p>
        </section>

        {/* IRISH TAX SECTION */}
        <section style={{ marginBottom: 40 }}>
          <h2>ETFs and Irish Tax (The Deemed Disposal Rule)</h2>
          <p>
            In Ireland, ETFs are subject to a unique tax treatment called <strong>"deemed disposal"</strong>. This is crucial for Irish investors to understand.
          </p>

          <h3>The 8‑Year Rule</h3>
          <p>
            If you hold an ETF for 8 years without selling, a "deemed disposal" event occurs automatically. On that anniversary, you owe capital gains tax on the profit (if any), even though you haven't sold the ETF.
          </p>

          <p style={{ marginBottom: 24 }}>
            <strong>Example:</strong> You buy €5,000 of an ETF on January 1, 2024. By January 1, 2032 (8 years later), it's worth €7,000. You owe tax on the €2,000 gain that year—even if you still hold the ETF.
          </p>

          <Callout variant="info" icon="ℹ️" title="Unique to Ireland">
            <p>
              This 8‑year deemed disposal rule is an Irish tax rule that applies to ETFs regardless of where the ETF is listed or what assets it holds. It does not apply in many other countries.
            </p>
          </Callout>

          <h3>Tax Rate</h3>
          <p>
            ETF gains are treated as income in Ireland and taxed at your marginal income tax rate. This is typically:
          </p>
          <ul>
            <li><strong>20%</strong> (standard rate for most taxpayers)</li>
            <li><strong>40%</strong> (higher rate for top earners)</li>
            <li>Plus <strong>3% Universal Social Charge (USC)</strong></li>
          </ul>

          <h3>If Your ETF Loses Value</h3>
          <p>
            You don't pay tax on deemed disposal if the ETF has decreased in value. However, you may not be able to claim a loss against other gains. Check with your tax adviser for your situation.
          </p>

          <h3>What About Selling?</h3>
          <p>
            If you sell an ETF before 8 years, you also owe tax on any gain. So whether you hold it for 8 years (deemed disposal) or sell it earlier (actual sale), you'll eventually owe tax on the profit.
          </p>
        </section>

        {/* NEXT STEPS */}
        <section style={{ marginBottom: 40 }}>
          <h2>Next Steps</h2>
          <p>
            Now that you understand ETFs, dive deeper into the Irish tax rules:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
            <Link href="/what-is-deemed-disposal" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ marginTop: 0, color: 'var(--link)' }}>Deemed Disposal →</h3>
                <p style={{ marginBottom: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>
                  How the 8‑year rule works in detail
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
                  Calculate your tax liability
                </p>
              </div>
            </Link>
          </div>
        </section>

        <Callout variant="info" icon="⚖️" title="Tax Disclaimer">
          <p style={{ marginBottom: 0 }}>
            This site provides general information only and is not tax advice. We recommend consulting with a qualified Irish tax professional before making investment or tax decisions. ETF taxation rules are complex and subject to change.
          </p>
        </Callout>
      </PageShell>
    </>
  )
}
