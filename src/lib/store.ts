import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Pair, UserProfile, Job, House } from './types'
import { fixedPairs, jobHousePairs } from './fixed-data'

export type JourneyStage = 'individual' | 'pair'

export type Message = {
  id: string
  text: string
  isMe: boolean
  timestamp: Date
}

export type Thread = {
  id: string
  type: 'landlord' | 'employer'
  title: string
  content: string
  timestamp: Date
  messages: Message[]
  lastMessage?: string
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
  addThread: (thread: Omit<Thread, 'messages' | 'lastMessage'>) => void
  addMessage: (threadId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
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

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
  pairs: [...fixedPairs, ...jobHousePairs],
  savedIds: new Set<string>(),
  journeyStage: 'individual',
  threads: [],
  creditScore: 650,
  trainingCompleted: false,
  selectedJob: null,
  selectedHouse: null,
  isSelecting: false,
  userProfile: {
    fullName: 'グエン・ヴァン・アン',
    email: 'nguyen.van.an@example.com',
    phone: '090-1234-5678',
    nationality: 'ベトナム',
    currentAddress: '東京都新宿区西新宿1-1-1',
    emergencyContact: 'グエン・ティ・ハン (090-8765-4321)',
    moveInDate: '2024-04-01',
    availableStartDate: '2024-04-15',
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
  
  
  addThread: (thread) => {
    const threadWithMessages = {
      ...thread,
      messages: [{
        id: '1',
        text: thread.content,
        isMe: false,
        timestamp: thread.timestamp
      }],
      lastMessage: thread.content.slice(0, 50) + (thread.content.length > 50 ? '...' : '')
    }
    set((state) => ({
      threads: [...state.threads, threadWithMessages]
    }))
  },

  addMessage: (threadId, messageData) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date()
    }

    set((state) => ({
      threads: state.threads.map(thread => 
        thread.id === threadId
          ? {
              ...thread,
              messages: [...thread.messages, newMessage],
              lastMessage: newMessage.text.slice(0, 50) + (newMessage.text.length > 50 ? '...' : '')
            }
          : thread
      )
    }))

    // 自動応答
    if (!messageData.isMe) return

    setTimeout(() => {
      const thread = get().threads.find(t => t.id === threadId)
      if (!thread) return

      let autoReplyText = ''
      if (thread.type === 'employer') {
        const replies = [
          'お疲れ様です。メッセージありがとうございます。',
          '承知いたしました。詳細について確認いたします。',
          '面接の件につきまして、後ほど詳細をお送りします。',
          'ありがとうございます。人事担当より改めてご連絡いたします。'
        ]
        autoReplyText = replies[Math.floor(Math.random() * replies.length)]
      } else {
        const replies = [
          'お疲れ様です。物件の件でご連絡いたします。',
          'ありがとうございます。確認して回答いたします。',
          '入居に関する詳細については、改めてお知らせいたします。',
          '物件管理会社より後日ご連絡させていただきます。'
        ]
        autoReplyText = replies[Math.floor(Math.random() * replies.length)]
      }

      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: autoReplyText,
        isMe: false,
        timestamp: new Date()
      }

      set((state) => ({
        threads: state.threads.map(thread => 
          thread.id === threadId
            ? {
                ...thread,
                messages: [...thread.messages, autoReply],
                lastMessage: autoReply.text.slice(0, 50) + (autoReply.text.length > 50 ? '...' : '')
              }
            : thread
        )
      }))
    }, 1000 + Math.random() * 2000) // 1-3秒後にランダムで返信
  },
  
  setCreditScore: (score) => set({ creditScore: score }),
  
  toggleTrainingCompleted: () => set((state) => ({
    trainingCompleted: !state.trainingCompleted
  })),

  startSelection: () => set({ isSelecting: true }),

  selectJob: (job, router) => {
    const currentState = get()
    if (router && job && currentState.selectedHouse) {
      // 両方選択済みの場合は即座に遷移（状態更新前）
      const { pairs, resetSelection } = currentState
      const matchingPair = pairs.find(p => 
        p.job.id === job.id && p.house.id === currentState.selectedHouse!.id
      )
      
      if (matchingPair) {
        resetSelection()
        router.push(`/pair/${matchingPair.id}`)
        return // 早期リターンで状態更新をスキップ
      }
    }
    
    // 通常の状態更新
    set({ selectedJob: job })
  },

  selectHouse: (house, router) => {
    const currentState = get()
    if (router && house && currentState.selectedJob) {
      // 両方選択済みの場合は即座に遷移（状態更新前）
      const { pairs, resetSelection } = currentState
      const matchingPair = pairs.find(p => 
        p.job.id === currentState.selectedJob!.id && p.house.id === house.id
      )
      
      if (matchingPair) {
        resetSelection()
        router.push(`/pair/${matchingPair.id}`)
        return // 早期リターンで状態更新をスキップ
      }
    }
    
    // 通常の状態更新
    set({ selectedHouse: house })
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
}),
    {
      name: 'foreigner-life-store',
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          try {
            const value = localStorage.getItem(key)
            if (!value) return null
            const state = JSON.parse(value)
            return {
              ...state.state,
              savedIds: new Set(state.state.savedIds || [])
            }
          } catch {
            return null
          }
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') return
          try {
            const serialized = JSON.stringify({
              ...value,
              state: {
                ...value.state,
                savedIds: Array.from(value.state.savedIds)
              }
            })
            localStorage.setItem(key, serialized)
          } catch {
            // Silently fail in SSR
          }
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') return
          try {
            localStorage.removeItem(key)
          } catch {
            // Silently fail in SSR
          }
        }
      }
    }
  )
)
