import React from 'react'

interface PageShellProps {
  children?: React.ReactNode
  className?: string
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <main className={`container ${className}`} style={{ minHeight: 'calc(100vh - 200px)' }}>
      {children}
    </main>
  )
}
