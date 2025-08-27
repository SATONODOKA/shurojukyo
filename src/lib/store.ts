import { create } from 'zustand'
import type { Pair, UserProfile, Job, House } from './types'
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
  selectedJob: Job | null
  selectedHouse: House | null
  isSelecting: boolean
  userProfile: Partial<UserProfile> | null
  toggleSave: (id: string) => void
  setJourneyStage: (stage: JourneyStage) => void
  addThread: (thread: Thread) => void
  setCreditScore: (score: number) => void
  toggleTrainingCompleted: () => void
  startSelection: () => void
  selectJob: (job: Job, router?: { push: (path: string) => void }) => void
  selectHouse: (house: House, router?: { push: (path: string) => void }) => void
  resetSelection: () => void
  checkAndNavigateToApplication: (router: { push: (path: string) => void }) => void
  updateUserProfile: (profile: Partial<UserProfile>) => void
  isProfileComplete: () => boolean
}

export const useAppStore = create<State>((set, get) => ({
  pairs: fixedPairs,
  savedIds: new Set<string>(),
  journeyStage: 'individual',
  threads: [],
  creditScore: 650,
  trainingCompleted: false,
  selectedJob: null,
  selectedHouse: null,
  isSelecting: false,
  userProfile: {
    creditScore: {
      score: 78,
      maxScore: 100,
      factors: [
        '雇用形態：フルタイム（Airワーク経由）',
        '勤続見込み：2年以上', 
        'Recruit利用歴：1年'
      ]
    }
  },
  
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
  })),

  startSelection: () => set({ isSelecting: true }),

  selectJob: (job, router) => {
    set({ selectedJob: job })
    if (router) {
      get().checkAndNavigateToApplication(router)
    }
  },

  selectHouse: (house, router) => {
    set({ selectedHouse: house })
    if (router) {
      get().checkAndNavigateToApplication(router)
    }
  },

  checkAndNavigateToApplication: (router) => {
    const { selectedJob, selectedHouse, pairs, resetSelection } = get()
    
    if (selectedJob && selectedHouse) {
      // 両方選択されている場合、マッチするペアを探す
      const matchingPair = pairs.find(p => 
        p.job.id === selectedJob.id && p.house.id === selectedHouse.id
      )
      
      if (matchingPair) {
        resetSelection()
        router.push(`/pair/${matchingPair.id}`)
      } else {
        // マッチするペアがない場合は検索画面に戻る
        resetSelection()
        router.push('/search')
      }
    }
  },

  resetSelection: () => set({ 
    selectedJob: null, 
    selectedHouse: null, 
    isSelecting: false 
  }),

  updateUserProfile: (profile) => set((state) => ({
    userProfile: { ...state.userProfile, ...profile }
  })),

  isProfileComplete: () => {
    const profile = get().userProfile
    if (!profile) return false
    
    const requiredFields = [
      'fullName', 'email', 'phone', 'nationality'
    ]
    
    return requiredFields.every(field => profile[field as keyof UserProfile])
  }
}))
