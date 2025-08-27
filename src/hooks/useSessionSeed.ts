'use client'

import { useMemo, useState, useEffect } from 'react'

function getSessionSeed(): number {
  if (typeof window === 'undefined') return 42
  
  const sessionKey = 'session_seed'
  let seed = sessionStorage.getItem(sessionKey)
  
  if (!seed) {
    seed = Math.random().toString()
    sessionStorage.setItem(sessionKey, seed)
  }
  
  return parseFloat(seed)
}

function shuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  let currentSeed = seed
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280
    const j = Math.floor((currentSeed / 233280) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

export function useSessionSeed<T>(items: T[]): T[] {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return useMemo(() => {
    if (!isClient) {
      return items
    }
    const seed = getSessionSeed()
    return shuffle(items, seed)
  }, [items, isClient])
}