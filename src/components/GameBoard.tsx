'use client'
import { useState } from 'react'
import Cell from './Cell'

export default function GameBoard() {
  const [boardSize, setBoardSize] = useState(3)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const resetGame = (size: number) => {
    setBoardSize(size)
    setBoard(Array(size * size).fill(null))
    setXIsNext(true)
  }

  const handleClick = (i: number) => {
    if (board[i] || calculateWinner(board)) return
    const newBoard = [...board]
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(board)
  const status = winner 
    ? `Winner: ${winner}` 
    : board.every(square => square) 
    ? 'Draw!' 
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div>
      <div className="text-xl mb-4">{status}</div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => resetGame(3)} className="px-4 py-2 bg-blue-500 text-white rounded">
          3x3
        </button>
        <button onClick={() => resetGame(4)} className="px-4 py-2 bg-blue-500 text-white rounded">
          4x4
        </button>
        <button onClick={() => resetGame(5)} className="px-4 py-2 bg-blue-500 text-white rounded">
          5x5
        </button>
      </div>
      <div className="grid gap-1" style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`
      }}>
        {board.map((square, i) => (
          <Cell key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]): string | null {
  const size = Math.sqrt(squares.length)
  const lines: number[][] = []

  // Генерация линий для проверки
  // Горизонтальные линии
  for (let i = 0; i < size; i++) {
    const line = []
    for (let j = 0; j < size; j++) {
      line.push(i * size + j)
    }
    lines.push(line)
  }

  // Вертикальные линии
  for (let i = 0; i < size; i++) {
    const line = []
    for (let j = 0; j < size; j++) {
      line.push(j * size + i)
    }
    lines.push(line)
  }

  // Диагонали
  const diag1 = []
  const diag2 = []
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i)
    diag2.push(i * size + (size - 1 - i))
  }
  lines.push(diag1, diag2)

  // Проверка всех линий
  for (const line of lines) {
    const first = squares[line[0]]
    if (first && line.every(index => squares[index] === first)) {
      return first
    }
  }

  return null
}