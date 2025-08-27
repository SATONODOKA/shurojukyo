import { create } from 'zustand'
import type { Pair } from './types'
import { fixedPairs } from './fixed-data'

export type JourneyStage = 'individual' | 'pair'

export type Thread = {
  id: string
  type: 'landlord' | 'employer'
  title: string
  content: string
  timestamp: Date
}

type State = {
  pairs: Pair[]
  savedIds: Set<string>
  journeyStage: JourneyStage
  threads: Thread[]
  creditScore: number
  trainingCompleted: boolean
  toggleSave: (id: string) => void
  setJourneyStage: (stage: JourneyStage) => void
  addThread: (thread: Thread) => void
  setCreditScore: (score: number) => void
  toggleTrainingCompleted: () => void
}

export const useAppStore = create<State>((set, get) => ({
  pairs: fixedPairs,
  savedIds: new Set<string>(),
  journeyStage: 'individual',
  threads: [],
  creditScore: 650,
  trainingCompleted: false,
  
  toggleSave: (id: string) => {
    const next = new Set(get().savedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    set({ savedIds: next })
  },
  
  setJourneyStage: (stage) => set({ journeyStage: stage }),
  
  addThread: (thread) => set((state) => ({
    threads: [...state.threads, thread]
  })),
  
  setCreditScore: (score) => set({ creditScore: score }),
  
  toggleTrainingCompleted: () => set((state) => ({
    trainingCompleted: !state.trainingCompleted
  }))
}))
