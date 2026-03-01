import React from 'react'

interface TableWrapProps {
  children?: React.ReactNode
}

export default function TableWrap({ children }: TableWrapProps) {
  return (
    <div className="table-wrap">
      {children}
    </div>
  )
}
