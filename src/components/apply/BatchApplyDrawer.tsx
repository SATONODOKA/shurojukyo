'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Home, Briefcase, User } from 'lucide-react'
import type { Pair } from '@/lib/types'

interface BatchApplyDrawerProps {
  isOpen: boolean
  onClose: () => void
  pair: Pair
}

interface FormData {
  fullName: string
  email: string
  phone: string
  nationality: string
  currentAddress: string
  moveInDate: string
  employmentStartDate: string
  emergencyContact: string
  message: string
}

export function BatchApplyDrawer({ isOpen, onClose, pair }: BatchApplyDrawerProps) {
  const router = useRouter()
  const { addThread, userProfile, isProfileComplete } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [showProfileIncomplete, setShowProfileIncomplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: userProfile?.fullName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    nationality: userProfile?.nationality || '',
    currentAddress: userProfile?.currentAddress || '',
    moveInDate: userProfile?.moveInDate || '',
    employmentStartDate: userProfile?.availableStartDate || '',
    emergencyContact: userProfile?.emergencyContact || '',
    message: ''
  })

  const steps = [
    { id: 'basic', title: '基本情報', icon: User },
    { id: 'landlord', title: '家主送信', icon: Home },
    { id: 'employer', title: '雇用主送信', icon: Briefcase }
  ]

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const validateStep = () => {
    if (!isProfileComplete()) {
      setShowProfileIncomplete(true)
      return false
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) {
      return
    }

    if (currentStep === 2) {
      const now = new Date()
      
      addThread({
        id: `landlord-${Date.now()}`,
        type: 'landlord',
        title: `${pair.house.name}への入居申込`,
        content: `
申込者: ${formData.fullName}
物件: ${pair.house.name}
家賃: ¥${pair.house.rent.toLocaleString()}
希望入居日: ${formData.moveInDate || '即日'}
メッセージ: ${formData.message || 'よろしくお願いします'}
        `,
        timestamp: now
      })

      addThread({
        id: `employer-${Date.now()}`,
        type: 'employer',
        title: `${pair.job.employer}への応募`,
        content: `
応募者: ${formData.fullName}
職種: ${pair.job.title}
時給: ${pair.job.wage}
勤務開始希望日: ${formData.employmentStartDate || '即日'}
メッセージ: ${formData.message || 'よろしくお願いします'}
        `,
        timestamp: now
      })

      setTimeout(() => {
        onClose()
        router.push('/dm')
      }, 1000)
      
      return
    }

    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>セット一括申込</DialogTitle>
          <DialogDescription>
            {pair.house.name} と {pair.job.employer} への申込を同時に行います
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep 
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />

          <div className="space-y-4">
            {showProfileIncomplete && (
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-yellow-200">プロフィールが未完成です</h3>
                </div>
                <p className="text-yellow-100 text-sm mb-3">
                  一括申込にはプロフィールの必須項目を入力してください。
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onClose()
                      router.push('/me')
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    プロフィールを編集
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProfileIncomplete(false)}
                    className="border-yellow-600 text-yellow-300"
                  >
                    キャンセル
                  </Button>
                </div>
              </div>
            )}
            
            {currentStep === 0 && !showProfileIncomplete && (
              <>
                <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                  <h3 className="font-semibold text-green-200 mb-2">プロフィールから自動入力されました</h3>
                  <div className="space-y-1 text-sm text-green-100">
                    <p>氏名: {formData.fullName}</p>
                    <p>メール: {formData.email}</p>
                    <p>電話: {formData.phone}</p>
                    <p>国籍: {formData.nationality}</p>
                    {formData.currentAddress && <p>現住所: {formData.currentAddress}</p>}
                  </div>
                </div>
                <div className="text-sm text-neutral-400">
                  ※ 情報を変更する場合はマイページで編集してください
                </div>
              </>
            )}

            {currentStep === 1 && !showProfileIncomplete && (
              <>
                <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-200">物件情報</h3>
                  <div className="space-y-1 text-sm text-green-100">
                    <p>物件名: {pair.house.name}</p>
                    <p>家賃: {pair.house.rent}/月</p>
                    <p>最寄駅: {pair.house.station}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveInDate" className="text-white font-medium">希望入居日 📅</Label>
                  <div className="relative">
                    <Input
                      id="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={handleInputChange('moveInDate')}
                      className="bg-neutral-800 border-neutral-600 text-white focus:border-green-500 cursor-pointer"
                      placeholder="日付を選択してください"
                    />
                  </div>
                  <p className="text-xs text-neutral-400">※ カレンダーアイコンをクリックして日付を選択</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">緊急連絡先</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange('emergencyContact')}
                    className="bg-neutral-800 border-neutral-600 text-white"
                    placeholder="プロフィールから自動入力: {userProfile?.emergencyContact || '未設定'}"
                  />
                </div>
              </>
            )}

            {currentStep === 2 && !showProfileIncomplete && (
              <>
                <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-200">求人情報</h3>
                  <div className="space-y-1 text-sm text-blue-100">
                    <p>会社名: {pair.job.employer}</p>
                    <p>職種: {pair.job.title}</p>
                    <p>時給: {pair.job.wage}</p>
                    <p>勤務地: {pair.job.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStartDate" className="text-white font-medium">勤務開始希望日 📅</Label>
                  <div className="relative">
                    <Input
                      id="employmentStartDate"
                      type="date"
                      value={formData.employmentStartDate}
                      onChange={handleInputChange('employmentStartDate')}
                      className="bg-neutral-800 border-neutral-600 text-white focus:border-blue-500 cursor-pointer"
                      placeholder="日付を選択してください"
                    />
                  </div>
                  <p className="text-xs text-neutral-400">※ カレンダーアイコンをクリックして日付を選択</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">メッセージ（任意）</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-400 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    rows={4}
                    placeholder="志望動機や質問などがあればご記入ください"
                  />
                </div>
              </>
            )}
          </div>

          {!showProfileIncomplete && (
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={currentStep === 0 ? onClose : handleBack}
              >
                {currentStep === 0 ? 'キャンセル' : '戻る'}
              </Button>
              <Button 
                className="btn-primary"
                onClick={handleNext}
              >
                {currentStep === 2 ? '送信する' : '次へ'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}