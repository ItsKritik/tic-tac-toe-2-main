'use client'
import { FC } from 'react'

interface CellProps {
  value: string | null
  onClick: () => void
}

const Cell: FC<CellProps> = ({ value, onClick }) => {
  return (
    <button 
      className="w-24 h-24 border border-gray-400 flex items-center justify-center text-4xl font-bold"
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Cell