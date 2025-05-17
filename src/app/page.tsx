'use client'
import GameBoard from '../components/GameBoard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Крестики-нолики</h1>
      <GameBoard />
    </main>
  )
}
