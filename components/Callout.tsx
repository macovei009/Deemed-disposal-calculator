import React from 'react'

interface CalloutProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  icon?: React.ReactNode
  title?: string
  children?: React.ReactNode
}

export default function Callout({
  variant = 'info',
  icon,
  title,
  children
}: CalloutProps) {
  return (
    <div style={{
      backgroundColor: `var(--${variant}-bg)`,
      color: `var(--${variant})`,
      border: `1px solid var(--${variant})`,
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      display: 'flex',
      gap: 12
    }}>
      {icon && (
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {icon}
        </div>
      )}
      <div>
        {title && <h3 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h3>}
        {children}
      </div>
    </div>
  )
}
