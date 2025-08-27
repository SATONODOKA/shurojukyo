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
  const addThread = useAppStore(s => s.addThread)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    currentAddress: '',
    moveInDate: '',
    employmentStartDate: '',
    emergencyContact: '',
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
    if (currentStep === 0) {
      return formData.fullName && formData.email && formData.phone && formData.nationality
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) {
      alert('必須項目を入力してください')
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
                      ? 'bg-[rgb(var(--primary))] border-[rgb(var(--primary))] text-white'
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
                      index < currentStep ? 'bg-[rgb(var(--primary))]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />

          <div className="space-y-4">
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">氏名 *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange('fullName')}
                    placeholder="山田 太郎"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="yamada@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号 *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    placeholder="090-1234-5678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">国籍 *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange('nationality')}
                    placeholder="日本"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentAddress">現住所</Label>
                  <Input
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange('currentAddress')}
                    placeholder="東京都渋谷区..."
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">物件情報</h3>
                  <div className="space-y-1 text-sm">
                    <p>物件名: {pair.house.name}</p>
                    <p>家賃: {pair.house.rent}/月</p>
                    <p>最寄駅: {pair.house.station}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveInDate">希望入居日</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={handleInputChange('moveInDate')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">緊急連絡先</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange('emergencyContact')}
                    placeholder="090-9876-5432"
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">求人情報</h3>
                  <div className="space-y-1 text-sm">
                    <p>会社名: {pair.job.employer}</p>
                    <p>職種: {pair.job.title}</p>
                    <p>時給: {pair.job.wage}</p>
                    <p>勤務地: {pair.job.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStartDate">勤務開始希望日</Label>
                  <Input
                    id="employmentStartDate"
                    type="date"
                    value={formData.employmentStartDate}
                    onChange={handleInputChange('employmentStartDate')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">メッセージ（任意）</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange('message')}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={4}
                    placeholder="志望動機や質問などがあればご記入ください"
                  />
                </div>
              </>
            )}
          </div>

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
        </div>
      </DialogContent>
    </Dialog>
  )
}