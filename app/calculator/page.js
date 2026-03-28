"use client"

import { useState } from 'react'
import Link from 'next/link'
import Papa from 'papaparse'
import PageShell from '@/components/PageShell'
import Callout from '@/components/Callout'

/* ─── Tiny reusable pieces ─── */

const pill = (label, color = 'var(--muted)') => (
  <span style={{
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: 999,
    background: `color-mix(in srgb, ${color} 12%, transparent)`,
    color,
    lineHeight: 1.6,
  }}>{label}</span>
)

const fmtEur = (v, decimals = 2) =>
  v != null ? `€${Number(v).toFixed(decimals)}` : '—'

const fmtRate = (v) =>
  v != null ? Number(v).toFixed(6) : '—'

/* ─── Stat card used in Import Summary ─── */

function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      transition: 'var(--transition)',
    }}>
      {icon && (
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.15rem',
          background: accent
            ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
            : 'var(--surface-2)',
          flexShrink: 0,
        }}>{icon}</div>
      )}
      <div>
        <div className="muted" style={{ fontSize: '0.8rem', lineHeight: 1.3 }}>{label}</div>
        <div style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          color: accent ? 'var(--accent)' : 'var(--text)',
          lineHeight: 1.2,
          marginTop: 2,
        }}>{value}</div>
      </div>
    </div>
  )
}

/* ─── Structured Audit Trail (replaces raw JSON) ─── */

function AuditTrail({ row }) {
  const [open, setOpen] = useState(false)
  const a = row.audit
  if (!a) return <span className="muted">—</span>

  const cls = a.classification || {}
  const buy = a.buy || {}
  const dd  = a.dd || {}

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: '5px 12px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          color: 'var(--link)',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          transition: 'var(--transition)',
        }}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 200ms ease',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          fontSize: '0.7rem',
        }}>&#9654;</span>
        Audit trail
      </button>

      {open && (
        <div style={{
          marginTop: 10,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          animation: 'fadeInUp 200ms ease',
        }}>
          {/* Classification */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
              Classification
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {pill(cls.isEtf === true ? 'ETF' : cls.isEtf === false ? 'Not ETF' : 'Unknown',
                     cls.isEtf === true ? 'var(--accent)' : cls.isEtf === false ? 'var(--error)' : 'var(--warning)')}
              {pill(`${cls.source || '—'}`, 'var(--info)')}
              <span className="muted" style={{ fontSize: '0.8rem' }}>
                confidence {((cls.confidence || 0) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Buy Price */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
              Buy Price
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px 16px', fontSize: '0.85rem' }}>
              <div><span className="muted">Native:</span> {buy.priceNative != null ? Number(buy.priceNative).toFixed(4) : '—'} {buy.currency || ''}</div>
              <div><span className="muted">EUR:</span> {fmtEur(row.buyPriceEur, 4)}</div>
              {buy.fx && buy.fx.fxToEur != null && (
                <div><span className="muted">FX rate:</span> {fmtRate(buy.fx.fxToEur)} <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>({buy.fx.fxPair || '—'})</span></div>
              )}
              {buy.totalEurUsed && <div>{pill('from CSV total', 'var(--info)')}</div>}
              {buy.source && <div><span className="muted">Source:</span> {buy.source}</div>}
            </div>
          </div>

          {/* DD Price */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
              DD Price
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px 16px', fontSize: '0.85rem' }}>
              {dd.quoteRaw && (
                <div><span className="muted">Raw:</span> {dd.quoteRaw.price != null ? Number(dd.quoteRaw.price).toFixed(4) : '—'} {dd.quoteRaw.currency || ''}</div>
              )}
              {dd.quoteNormalized && dd.quoteNormalized.unitAdjusted && (
                <div>{pill('unit adj.', 'var(--warning)')}</div>
              )}
              <div><span className="muted">EUR:</span> {fmtEur(row.ddPriceEur, 4)}</div>
              {dd.fx && dd.fx.fxToEur != null && (
                <div><span className="muted">FX rate:</span> {fmtRate(dd.fx.fxToEur)} <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>({dd.fx.fxPair || '—'})</span></div>
              )}
              {dd.dateUsed && <div><span className="muted">Price date:</span> {dd.dateUsed}</div>}
              {dd.source && <div><span className="muted">Source:</span> {dd.source}</div>}
            </div>
          </div>

          {/* Resolution */}
          {dd.resolutionCandidates && (
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 6 }}>
                Symbol Resolution
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span className="muted">Best:</span>{' '}
                <span style={{ fontWeight: 600, color: 'var(--text)' }}>{dd.resolutionCandidates.bestSymbol}</span>
                {dd.resolutionCandidates.allAttempted?.length > 1 && (
                  <span className="muted" style={{ fontSize: '0.8rem', marginLeft: 8 }}>
                    +{dd.resolutionCandidates.allAttempted.length - 1} fallback{dd.resolutionCandidates.allAttempted.length > 2 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Import Summary ─── */

function ImportSummary({ summary }) {
  const [showSkipped, setShowSkipped] = useState(false)
  if (!summary) return null

  const totalAccepted = (summary.accepted?.buys?.length || 0) + (summary.accepted?.sells?.length || 0)
  const totalRejected = summary.rowsParsed - totalAccepted

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 20px 16px',
      marginTop: 20,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <h4 style={{ marginTop: 0, marginBottom: 14, fontSize: '1rem' }}>Import Summary</h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 10,
      }}>
        <StatCard icon="📄" label="Total Rows" value={summary.totalRows} />
        <StatCard icon="🟢" label="Buys" value={summary.marketBuysFound} />
        <StatCard icon="🔴" label="Sells" value={summary.marketSellsFound || 0} />
        <StatCard icon="🔖" label="With ISIN" value={summary.isinPresent} />
        <StatCard icon="✅" label="Accepted" value={summary.accepted?.buys?.length || 0} accent />
      </div>

      {totalRejected > 0 && (
        <div style={{ marginTop: 14 }}>
          <button
            onClick={() => setShowSkipped(!showSkipped)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.85rem',
              color: 'var(--muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 200ms ease',
              transform: showSkipped ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '0.65rem',
            }}>&#9654;</span>
            {totalRejected} row{totalRejected !== 1 ? 's' : ''} skipped
          </button>
          {showSkipped && (
            <ul style={{ marginTop: 8, marginBottom: 0, fontSize: '0.85rem', color: 'var(--muted)', paddingLeft: 20, lineHeight: 1.7 }}>
              {summary.skipped.nonBuyAction?.length > 0 && <li>Non buy/sell action: {summary.skipped.nonBuyAction.length}</li>}
              {summary.skipped.dateParseFailure?.length > 0 && <li>Date parse failure: {summary.skipped.dateParseFailure.length}</li>}
              {summary.skipped.missingQuantity?.length > 0 && <li>Missing quantity: {summary.skipped.missingQuantity.length}</li>}
              {summary.skipped.missingPriceAndTotal?.length > 0 && <li>Missing price &amp; total: {summary.skipped.missingPriceAndTotal.length}</li>}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Result Event Card (one per DD event) ─── */

function EventCard({ r, index }) {
  const isGain = (r.gainEur ?? 0) >= 0
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition)',
    }}>
      {/* Header ribbon */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 18px',
        background: 'var(--surface-2)',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{r.brokerTicker}</span>
          <span style={{
            fontSize: '0.78rem',
            color: 'var(--muted)',
            background: 'var(--surface)',
            padding: '2px 8px',
            borderRadius: 4,
            border: '1px solid var(--border)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}>{r.yahooSymbol}</span>
          {r.isin && (
            <span className="muted" style={{ fontSize: '0.78rem' }}>{r.isin}</span>
          )}
        </div>
        <div style={{
          fontWeight: 700,
          fontSize: '1.1rem',
          color: r.taxEur > 0 ? 'var(--text)' : 'var(--accent)',
        }}>
          {fmtEur(r.taxEur)} tax
        </div>
      </div>

      {/* Body grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0',
      }}>
        {[
          { label: 'Buy Date', value: r.buyDate },
          { label: 'DD Date', value: r.ddDate },
          { label: 'Quantity', value: r.quantity },
          { label: 'Buy Price', value: fmtEur(r.buyPriceEur, 4) },
          { label: 'DD Price', value: fmtEur(r.ddPriceEur, 4) },
          { label: 'Gain',
            value: fmtEur(r.gainEur),
            color: isGain ? 'var(--accent)' : 'var(--error)',
            icon: isGain ? '▲' : '▼',
          },
        ].map((cell, ci) => (
          <div key={ci} style={{
            padding: '12px 18px',
            borderBottom: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
          }}>
            <div className="muted" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{cell.label}</div>
            <div style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              fontVariantNumeric: 'tabular-nums',
              color: cell.color || 'var(--text)',
            }}>
              {cell.icon && <span style={{ fontSize: '0.7rem', marginRight: 3 }}>{cell.icon}</span>}
              {cell.value}
            </div>
          </div>
        ))}
      </div>

      {/* Notes & Audit */}
      <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(r.notes || []).length > 0 && (
          <div style={{ fontSize: '0.85rem', color: 'var(--warning)', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <span>{r.notes.join(' ')}</span>
          </div>
        )}
        <AuditTrail row={r} />
      </div>
    </div>
  )
}

/* ─── Main Page ─── */

export default function CalculatorPage() {
  const [rows, setRows] = useState([])
  const [fileName, setFileName] = useState('')
  const [taxYear, setTaxYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showIgnored, setShowIgnored] = useState(false)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setRows(res.data)
        setResult(null)
        setError(null)
      },
      error: (err) => setError(err.message)
    })
  }

  async function calculate() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const resp = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows, taxYear })
      })
      if (!resp.ok) {
        const errData = await resp.json().catch(() => null)
        throw new Error(errData?.error || `Server error (${resp.status})`)
      }
      const data = await resp.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function downloadResultsPdf() {
    if (!result) return

    setPdfLoading(true)
    try {
      const [jspdfModule, autoTableModule] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
      ])

      const jsPDF = jspdfModule.jsPDF || jspdfModule.default
      const autoTable = autoTableModule.default

      const doc = new jsPDF({ unit: 'pt', format: 'a4' })
      const generatedAt = new Date().toLocaleString()

      const BRAND_PRIMARY = [11, 31, 59]
      const BRAND_ACCENT = [22, 163, 74]
      const BRAND_TEXT = [15, 23, 42]
      const MUTED_TEXT = [71, 85, 105]

      const toDataUrl = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })

      let logoDataUrl = null
      try {
        const logoResp = await fetch('/images/logo.png', { cache: 'force-cache' })
        if (logoResp.ok) {
          const logoBlob = await logoResp.blob()
          logoDataUrl = await toDataUrl(logoBlob)
        }
      } catch (_) {
        logoDataUrl = null
      }

      doc.setFillColor(...BRAND_PRIMARY)
      doc.rect(0, 0, 595.28, 94, 'F')
      doc.setFillColor(...BRAND_ACCENT)
      doc.rect(0, 94, 595.28, 5, 'F')

      if (logoDataUrl) {
        doc.addImage(logoDataUrl, 'PNG', 40, 22, 36, 36)
      }

      doc.setFontSize(18)
      doc.setTextColor(255, 255, 255)
      doc.text('Deemed Disposal Tax Report', logoDataUrl ? 86 : 40, 44)

      doc.setFontSize(10)
      doc.setTextColor(209, 213, 219)
      doc.text('Irish ETF deemed disposal calculator', logoDataUrl ? 86 : 40, 62)

      doc.setFontSize(10)
      doc.setTextColor(...MUTED_TEXT)
      doc.text(`Tax year: ${taxYear}`, 40, 122)
      doc.text(`Generated: ${generatedAt}`, 40, 138)

      doc.setFillColor(240, 249, 255)
      doc.roundedRect(40, 152, 515, 62, 8, 8, 'F')
      doc.setDrawColor(...BRAND_ACCENT)
      doc.setLineWidth(1)
      doc.line(40, 152, 555, 152)

      doc.setFontSize(12)
      doc.setTextColor(...BRAND_PRIMARY)
      doc.text(`Estimated total tax: ${fmtEur(result.totalTax)}`, 56, 177)
      doc.setTextColor(...MUTED_TEXT)
      doc.text(`Taxable events: ${result.rows?.length || 0}`, 56, 195)
      doc.text(`Excluded rows: ${result.ignored?.length || 0}`, 250, 195)

      const rowsData = (result.rows || []).map((row) => [
        row.brokerTicker || '—',
        row.yahooSymbol || '—',
        row.isin || '—',
        row.buyDate || '—',
        row.ddDate || '—',
        row.quantity != null ? String(row.quantity) : '—',
        row.buyPriceEur != null ? Number(row.buyPriceEur).toFixed(4) : '—',
        row.ddPriceEur != null ? Number(row.ddPriceEur).toFixed(4) : '—',
        row.gainEur != null ? Number(row.gainEur).toFixed(2) : '—',
        row.taxEur != null ? Number(row.taxEur).toFixed(2) : '—',
      ])

      if (rowsData.length > 0) {
        autoTable(doc, {
          startY: 232,
          head: [[
            'Broker',
            'Yahoo',
            'ISIN',
            'Buy Date',
            'DD Date',
            'Qty',
            'Buy EUR',
            'DD EUR',
            'Gain EUR',
            'Tax EUR',
          ]],
          body: rowsData,
          styles: {
            fontSize: 8,
            cellPadding: 4,
            textColor: BRAND_TEXT,
            lineColor: [226, 232, 240],
            lineWidth: 0.5,
          },
          headStyles: {
            fillColor: BRAND_PRIMARY,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252],
          },
        })
      }

      const ignoredData = (result.ignored || []).map((row) => [
        row.brokerTicker || '—',
        row.isin || '—',
        row.buyDate || '—',
        row.reason || '—',
      ])

      if (ignoredData.length > 0) {
        const currentY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 22 : 180

        doc.setFontSize(12)
        doc.setTextColor(...BRAND_PRIMARY)
        doc.text('Excluded Rows', 40, currentY)

        autoTable(doc, {
          startY: currentY + 10,
          head: [['Broker', 'ISIN', 'Buy Date', 'Reason']],
          body: ignoredData,
          styles: {
            fontSize: 8,
            cellPadding: 4,
            textColor: BRAND_TEXT,
            lineColor: [226, 232, 240],
            lineWidth: 0.5,
          },
          headStyles: {
            fillColor: [241, 245, 249],
            textColor: [15, 23, 42],
            fontStyle: 'bold',
          },
        })
      }

      const safeDate = new Date().toISOString().slice(0, 10)
      doc.save(`deemed-disposal-results-${taxYear}-${safeDate}.pdf`)
    } catch (e) {
      setError(`Could not generate PDF: ${e.message}`)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <PageShell>
      <h1>Deemed Disposal Calculator</h1>
      <p className="lead">
        Upload your broker CSV to find purchases hitting their 8-year deemed disposal date
        and estimate 38&nbsp;% exit tax on any gains.
      </p>

      <Callout variant="info" icon="ℹ️" title="How to use">
        <ol style={{ marginBottom: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Export your transaction history CSV from your broker (Trading 212, DEGIRO, etc.)</li>
          <li>Upload it below</li>
          <li>Select the tax year you want to check</li>
          <li>Click <strong>Calculate Tax</strong></li>
        </ol>
      </Callout>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 22px',
        marginTop: 20,
        marginBottom: 8,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <h2 style={{ marginBottom: 10, fontSize: '1.25rem' }}>How this calculator works</h2>
        <p className="muted" style={{ marginBottom: 14, fontSize: '0.95rem' }}>
          This tool estimates Irish deemed disposal tax by processing your transaction history in a few clear steps.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.75, fontSize: '0.95rem' }}>
          <li><strong>Reads your CSV trades</strong> and standardizes buys/sells, dates, quantities, currencies, and ISINs.</li>
          <li><strong>Keeps ETF holdings only</strong> (based on ISIN classification) and excludes non-ETF rows.</li>
          <li><strong>Applies the 8-year deemed disposal rule</strong> to find lots that become taxable in your selected tax year.</li>
          <li><strong>Fetches historical prices</strong> for the deemed disposal date from Yahoo Finance.</li>
          <li><strong>Converts all values to EUR</strong> using historical FX rates (for example, USD value converted to EUR on the relevant date).</li>
          <li><strong>Calculates estimated gain and 38% exit tax</strong>, then shows excluded rows and audit details for transparency.</li>
        </ul>
      </div>

      {/* ── Upload controls ── */}
      <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginTop: 24,
        marginBottom: 24,
        padding: 20,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ flex: '1 1 260px' }}>
          <label htmlFor="csv-upload">Broker CSV File</label>
          <input
            id="csv-upload"
            type="file"
            accept="text/csv,.csv"
            onChange={handleFile}
            style={{ width: '100%' }}
          />
          {fileName && (
            <div className="muted" style={{ fontSize: '0.85rem', marginTop: 6 }}>
              📄 {fileName} — {rows.length} row{rows.length !== 1 ? 's' : ''} parsed
            </div>
          )}
        </div>
        <div>
          <label htmlFor="tax-year">Tax Year</label>
          <input
            id="tax-year"
            type="number"
            value={taxYear}
            onChange={e => setTaxYear(Number(e.target.value))}
            min={2020}
            max={2040}
          />
        </div>
        <div>
          <button
            className="btn-accent"
            onClick={calculate}
            disabled={rows.length === 0 || loading}
            style={{ padding: '10px 28px', fontSize: '1rem' }}
          >
            {loading ? 'Calculating\u2026' : 'Calculate Tax'}
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <Callout variant="error" icon="❌" title="Something went wrong">
          <p style={{ marginBottom: 0 }}>{error}</p>
        </Callout>
      )}

      {/* ── Results ── */}
      {result && (
        <div>
          <ImportSummary summary={result.importSummary} />

          {/* Tax banner */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            color: 'white',
            borderRadius: 12,
            padding: '28px 24px',
            marginTop: 24,
            marginBottom: 28,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(22,163,74,0.18)',
          }}>
            <div style={{ fontSize: '0.85rem', opacity: 0.88, marginBottom: 6, letterSpacing: '0.02em' }}>
              Estimated Deemed Disposal Tax &middot; {taxYear}
            </div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
              {fmtEur(result.totalTax)}
            </div>
            <div style={{ fontSize: '0.82rem', opacity: 0.78, marginTop: 8 }}>
              {result.rows?.length || 0} taxable event{(result.rows?.length || 0) !== 1 ? 's' : ''}
              {(result.ignored?.length || 0) > 0 && (<>&nbsp;&middot;&nbsp;{result.ignored.length} excluded</>)}
            </div>
          </div>

          {/* Event cards list */}
          {result.rows && result.rows.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ marginBottom: 0 }}>Taxable Events</h3>
              {result.rows.map((r, i) => (
                <EventCard key={i} r={r} index={i} />
              ))}
            </div>
          )}

          {result.rows && result.rows.length === 0 && (
            <Callout variant="info" icon="📭" title="No taxable events">
              <p style={{ marginBottom: 0 }}>
                No deemed disposal events found for tax year {taxYear}.
                None of your ETF purchases reach their 8-year anniversary this year.
              </p>
            </Callout>
          )}

          {/* Excluded rows */}
          {result.ignored && result.ignored.length > 0 && (
            <div style={{
              marginTop: 28,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <button
                onClick={() => setShowIgnored(!showIgnored)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 18px',
                  background: 'var(--surface-2)',
                  border: 'none',
                  borderBottom: showIgnored ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  textAlign: 'left',
                }}
              >
                <span>Excluded Rows ({result.ignored.length})</span>
                <span style={{
                  display: 'inline-block',
                  transition: 'transform 200ms ease',
                  transform: showIgnored ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: '0.7rem',
                }}>&#9660;</span>
              </button>
              {showIgnored && (
                <div style={{ padding: 0 }}>
                  {result.ignored.map((r, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 18px',
                      borderBottom: i < result.ignored.length - 1 ? '1px solid var(--border)' : 'none',
                      flexWrap: 'wrap',
                      gap: 6,
                      fontSize: '0.88rem',
                    }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600 }}>{r.brokerTicker || '—'}</span>
                        {r.isin && (
                          <span style={{
                            fontSize: '0.75rem',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            padding: '1px 6px',
                            background: 'var(--surface-2)',
                            borderRadius: 3,
                            color: 'var(--muted)',
                          }}>{r.isin}</span>
                        )}
                        {r.buyDate && <span className="muted" style={{ fontSize: '0.82rem' }}>{r.buyDate}</span>}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{r.reason}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Disclaimer ── */}
      <div style={{ marginTop: 44, marginBottom: 20 }}>
        <Callout variant="warning" icon="⚠️" title="Disclaimer">
          <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>
            This calculator provides <strong>estimates only</strong> and is not tax advice.
            Results depend on historical price data from Yahoo Finance and may not match
            Revenue-accepted values. Always consult a qualified tax advisor for your
            actual tax filing. See our <Link href="/faq">FAQ</Link> for more details.
          </p>
        </Callout>
      </div>

      {result && (
        <div style={{
          marginTop: 8,
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            className="btn-primary"
            onClick={downloadResultsPdf}
            disabled={pdfLoading}
            style={{ minWidth: 240, fontWeight: 600 }}
          >
            {pdfLoading ? 'Generating PDF…' : 'Download Results as PDF'}
          </button>
        </div>
      )}

      {/* ── Support / Buy Me a Coffee ── */}
      <div style={{
        marginTop: 32,
        marginBottom: 20,
        textAlign: 'center',
        padding: '24px 20px',
        background: 'var(--surface-2)',
        borderRadius: 12,
        border: '1px solid var(--border)',
      }}>
        <p style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>
          ☕ Did this calculator help?
        </p>
        <p className="muted" style={{ margin: '0 0 14px', fontSize: '0.9rem', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          This site is completely ad-free. If it saved you time or money, consider buying me a coffee to help cover hosting, the domain, and future updates.
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
    </PageShell>
  )
}
