import Link from 'next/link'

interface EmailSignupProps {
  variant?: 'default' | 'compact' | 'hero'
  title?: string
  description?: string
}

export default function EmailSignup({ 
  variant = 'default',
  title = "Get Launch Updates",
  description = "Be first to know when our full calculator launches with advanced features like multi-year calculations, loss offsetting, and detailed tax reports."
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
          Get notified when we launch advanced features
        </div>
        <Link 
          href="https://docs.google.com/forms/d/e/1FAIpQLSei5v9GdxABf0AetvSvMUYw1zhmTf6oVyxuHkBEf9_JCv8c7Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '0.9rem', padding: '8px 16px' }}
        >
          Join Waitlist →
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
          href="https://docs.google.com/forms/d/e/1FAIpQLSei5v9GdxABf0AetvSvMUYw1zhmTf6oVyxuHkBEf9_JCv8c7Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '1rem', padding: '12px 24px' }}
        >
          Join Launch List →
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
          href="https://docs.google.com/forms/d/e/1FAIpQLSei5v9GdxABf0AetvSvMUYw1zhmTf6oVyxuHkBEf9_JCv8c7Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
          style={{ fontSize: '1.1rem', padding: '12px 24px' }}
        >
          Get Launch Updates →
        </Link>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
        ✓ Free updates • ✓ No spam • ✓ Unsubscribe anytime
      </div>
    </div>
  )
}