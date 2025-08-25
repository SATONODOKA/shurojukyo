import { create } from 'zustand'
import type { Pair } from './types'
import { fixedPairs } from './fixed-data'

type State = {
  pairs: Pair[]
  savedIds: Set<string>
  toggleSave: (id: string) => void
}

export const useAppStore = create<State>((set, get) => ({
  pairs: fixedPairs,
  savedIds: new Set<string>(),
  toggleSave: (id) => {
    const next = new Set(get().savedIds)
    next.has(id) ? next.delete(id) : next.add(id)
    set({ savedIds: next })
  },
}))
