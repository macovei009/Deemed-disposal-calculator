import Link from 'next/link'

interface EmailSignupProps {
  variant?: 'default' | 'compact' | 'hero'
  title?: string
  description?: string
}

export default function EmailSignup({ 
  variant = 'default',
  title = "Help Improve the Deemed Disposal Calculator",
  description = "Submit your broker CSV files to help us support more brokers, or report a bug — your feedback makes the calculator better for everyone."
}: EmailSignupProps) {
  
  if (variant === 'compact') {
    return (
      <div style={{
        background: 'var(--accent-bg, #f0fdf4)',
        border: '1px solid var(--accent)',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '12px', fontWeight: 600, color: 'var(--accent)' }}>
          🚀 {title}
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '12px' }}>
          Share broker CSVs or report a bug
        </div>
        <Link 
          href="https://form.jotform.com/260880903014048"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '0.9rem', padding: '8px 16px' }}
        >
          Help Improve the Calculator →
        </Link>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-bg, #f0fdf4) 0%, var(--info-bg, #f0f9ff) 100%)',
        border: '1px solid var(--accent)',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
        marginTop: '32px'
      }}>
        <div style={{ 
          fontSize: '1.1rem', 
          fontWeight: 600, 
          color: 'var(--accent)', 
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          🎯 {title}
        </div>
        <p style={{ 
          fontSize: '0.95rem', 
          color: 'var(--muted)', 
          marginBottom: '16px',
          maxWidth: '500px',
          margin: '0 auto 16px'
        }}>
          {description}
        </p>
        <Link 
          href="https://form.jotform.com/260880903014048"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '1rem', padding: '12px 24px' }}
        >
          Help Improve the Calculator →
        </Link>
      </div>
    )
  }

  // Default variant
  return (
    <div style={{
      background: 'var(--surface)',
      border: '2px solid var(--accent)',
      borderRadius: '10px',
      padding: '24px',
      textAlign: 'center',
      marginTop: '40px',
      marginBottom: '40px'
    }}>
      <div style={{ 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        color: 'var(--primary)', 
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        📧 {title}
      </div>
      <p style={{ 
        fontSize: '1rem', 
        color: 'var(--muted)', 
        marginBottom: '20px',
        lineHeight: 1.5,
        maxWidth: '500px',
        margin: '0 auto 20px'
      }}>
        {description}
      </p>
      <div style={{ marginBottom: '16px' }}>
        <Link 
          href="https://form.jotform.com/260880903014048"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '1.1rem', padding: '12px 24px' }}
        >
          Help Improve the Calculator →
        </Link>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
        ✓ Submit broker CSVs • ✓ Report bugs • ✓ Help us improve
      </div>
    </div>
  )
}