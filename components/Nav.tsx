'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 99
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        position: 'relative'
      }}>
        {/* BRAND */}
        <Link
          href="/"
          className="nav-brand"
          style={{
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '1.05rem',
            color: 'var(--primary)',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 101
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            borderRadius: '6px',
            padding: '4px',
            animation: 'pulse 2s infinite',
            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.2)'
          }}>
            <Image 
              src="/images/logo.png" 
              alt="Deemed Disposal Calculator" 
              width={24} 
              height={24}
              style={{ borderRadius: '2px', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <span className="nav-brand-text" style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700
          }}>
            Deemed Disposal
          </span>
        </Link>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            transition: 'var(--transition)',
            zIndex: 101,
            width: '40px',
            height: '40px'
          }}
          className="mobile-menu-btn"
        >
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></span>
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--primary)',
            margin: '3px 0',
            transition: 'all 0.3s ease',
            opacity: mobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></span>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          gap: 28,
          fontSize: '0.95rem',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-start',
          marginLeft: 12
        }}>
          <Link 
            href="/what-is-an-etf" 
            className="nav-link"
            style={{ 
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              position: 'relative',
              paddingBottom: 4
            }}
          >
            ETFs
          </Link>
          <Link 
            href="/what-is-deemed-disposal" 
            className="nav-link"
            style={{ 
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              paddingBottom: 4
            }}
          >
            Deemed Disposal
          </Link>
          <Link 
            href="/irish-etf-tax" 
            className="nav-link"
            style={{ 
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              paddingBottom: 4
            }}
          >
            Tax
          </Link>
          <Link 
            href="/faq" 
            className="nav-link"
            style={{ 
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'var(--transition)',
              paddingBottom: 4
            }}
          >
            FAQ
          </Link>
        </nav>

        {/* DESKTOP CTA BUTTONS */}
        <div className="desktop-ctas" style={{ 
          display: 'flex', 
          gap: '8px', 
          alignItems: 'center' 
        }}>
          <Link
            href="/what-is-deemed-disposal"
            className="btn-secondary"
            style={{ 
              whiteSpace: 'nowrap',
              fontSize: '0.85rem',
              padding: '8px 16px'
            }}
          >
            Learn Deemed Disposal
          </Link>
          <Link
            href="/calculator"
            className="btn-accent"
            style={{ 
              whiteSpace: 'nowrap'
            }}
          >
            Calculator (Soon)
          </Link>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          zIndex: 98
        }} className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          
          {/* MOBILE MENU PANEL */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100vh',
            width: '280px',
            maxWidth: '80vw',
            backgroundColor: 'var(--surface)',
            borderLeft: '1px solid var(--border)',
            padding: '80px 24px 24px',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* MOBILE MENU LINKS */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24
            }}>
              <Link 
                href="/what-is-an-etf" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                📈 What is an ETF?
              </Link>
              <Link 
                href="/what-is-deemed-disposal" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                ⏰ Deemed Disposal
              </Link>
              <Link 
                href="/irish-etf-tax" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                🇮🇪 Irish ETF Tax
              </Link>
              <Link 
                href="/faq" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                ❓ FAQ
              </Link>
              <Link 
                href="/glossary" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)'
                }}
              >
                📚 Glossary
              </Link>
            </nav>

            {/* MOBILE CTA BUTTONS */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 32
            }}>
              <Link
                href="/what-is-deemed-disposal"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{ 
                  textAlign: 'center',
                  fontSize: '1rem',
                  padding: '12px 20px'
                }}
              >
                📚 Learn Deemed Disposal
              </Link>
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-accent"
                style={{ 
                  textAlign: 'center',
                  fontSize: '1rem',
                  padding: '12px 20px'
                }}
              >
                📊 Calculator (Coming Soon)
              </Link>
            </div>

            {/* MOBILE MENU FOOTER */}
            <div style={{
              marginTop: 40,
              padding: '20px 0',
              borderTop: '1px solid var(--border)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--muted)',
                marginBottom: 12
              }}>
                Irish ETF Tax Made Simple
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--muted)'
              }}>
                ✓ Free guides • ✓ Clear examples • ✓ Up-to-date rates
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

