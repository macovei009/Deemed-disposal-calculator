import React from 'react'

interface FeatureCardProps {
  icon?: React.ReactNode
  title?: string
  children?: React.ReactNode
  className?: string
}

export default function FeatureCard({
  icon,
  title,
  children,
  className = ''
}: FeatureCardProps) {
  return (
    <div className={`card ${className}`}>
      {icon && (
        <div style={{
          fontSize: 32,
          marginBottom: 12,
          lineHeight: 1
        }}>
          {icon}
        </div>
      )}
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  )
}
