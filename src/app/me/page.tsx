'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit3, Save, X, Plus, Shield, FileText, User, Briefcase, Home } from 'lucide-react'
import type { UserProfile } from '@/lib/types'

export default function MePage() {
  const { userProfile, updateUserProfile } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>(userProfile || {})
  const [newLanguage, setNewLanguage] = useState('')
  const [newJobType, setNewJobType] = useState('')
  const [newArea, setNewArea] = useState('')

  const handleSave = () => {
    updateUserProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(userProfile || {})
    setIsEditing(false)
  }

  const addItem = (field: 'languages' | 'preferredJobTypes' | 'preferredAreas', value: string, setter: (v: string) => void) => {
    if (!value.trim()) return
    const current = editedProfile[field] || []
    setEditedProfile({
      ...editedProfile,
      [field]: [...current, value.trim()]
    })
    setter('')
  }

  const removeItem = (field: 'languages' | 'preferredJobTypes' | 'preferredAreas', index: number) => {
    const current = editedProfile[field] || []
    setEditedProfile({
      ...editedProfile,
      [field]: current.filter((_, i) => i !== index)
    })
  }

  const creditScore = userProfile?.creditScore || { score: 78, maxScore: 100, factors: [] }
  const displayName = userProfile?.fullName || 'Y. Nguyen'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">
      {/* Profile Header */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-blue-600 text-white text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-white">{displayName}</h1>
                <p className="text-sm text-neutral-400">
                  {userProfile?.languages?.join(' / ') || 'ベトナム語 / 英語 / 日本語（N3）'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="border-neutral-600 text-neutral-300"
              suppressHydrationWarning
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
              {isEditing ? 'キャンセル' : '編集'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Credit Score (Non-editable) */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-green-400" />
            信用スコア（編集不可）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-white">{creditScore.score}</span>
                <span className="text-sm text-neutral-400">/ {creditScore.maxScore}</span>
              </div>
              <Progress value={creditScore.score} className="h-3 bg-neutral-800" />
            </div>
            <div className="space-y-2">
              {creditScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-neutral-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="w-5 h-5 text-blue-400" />
            基本情報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-neutral-300">氏名 *</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.fullName || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.fullName || '未設定'}</p>
              )}
            </div>
            <div>
              <Label className="text-neutral-300">国籍 *</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.nationality || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, nationality: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.nationality || '未設定'}</p>
              )}
            </div>
            <div>
              <Label className="text-neutral-300">メールアドレス *</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedProfile.email || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.email || '未設定'}</p>
              )}
            </div>
            <div>
              <Label className="text-neutral-300">電話番号 *</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.phone || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.phone || '未設定'}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label className="text-neutral-300">現住所</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.currentAddress || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, currentAddress: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.currentAddress || '未設定'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job-related Info */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Briefcase className="w-5 h-5 text-blue-400" />
            仕事関連情報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-neutral-300">日本語レベル</Label>
            {isEditing ? (
              <Select value={editedProfile.japaneseLevel || ''} onValueChange={(value) => setEditedProfile({...editedProfile, japaneseLevel: value as 'N5' | 'N4' | 'N3' | 'N2' | 'N1'})}>
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="N5">N5</SelectItem>
                  <SelectItem value="N4">N4</SelectItem>
                  <SelectItem value="N3">N3</SelectItem>
                  <SelectItem value="N2">N2</SelectItem>
                  <SelectItem value="N1">N1</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-white mt-1">{userProfile?.japaneseLevel || '未設定'}</p>
            )}
          </div>

          <div>
            <Label className="text-neutral-300">話せる言語</Label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="言語を追加"
                    className="bg-neutral-800 border-neutral-600 text-white"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => addItem('languages', newLanguage, setNewLanguage)}
                    className="bg-blue-600 hover:bg-blue-700"
                    suppressHydrationWarning
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editedProfile.languages || []).map((lang, index) => (
                    <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                      {lang}
                      <button onClick={() => removeItem('languages', index)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {(userProfile?.languages || []).map((lang, index) => (
                  <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                    {lang}
                  </Badge>
                ))}
                {(!userProfile?.languages || userProfile.languages.length === 0) && (
                  <p className="text-neutral-400">未設定</p>
                )}
              </div>
            )}
          </div>

          <div>
            <Label className="text-neutral-300">希望職種</Label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value)}
                    placeholder="職種を追加"
                    className="bg-neutral-800 border-neutral-600 text-white"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => addItem('preferredJobTypes', newJobType, setNewJobType)}
                    className="bg-blue-600 hover:bg-blue-700"
                    suppressHydrationWarning
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editedProfile.preferredJobTypes || []).map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                      {type}
                      <button onClick={() => removeItem('preferredJobTypes', index)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {(userProfile?.preferredJobTypes || []).map((type, index) => (
                  <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                    {type}
                  </Badge>
                ))}
                {(!userProfile?.preferredJobTypes || userProfile.preferredJobTypes.length === 0) && (
                  <p className="text-neutral-400">未設定</p>
                )}
              </div>
            )}
          </div>

          <div>
            <Label className="text-neutral-300">勤務開始可能日</Label>
            {isEditing ? (
              <Input
                type="date"
                value={editedProfile.availableStartDate || ''}
                onChange={(e) => setEditedProfile({...editedProfile, availableStartDate: e.target.value})}
                className="bg-neutral-800 border-neutral-600 text-white"
              />
            ) : (
              <p className="text-white mt-1">{userProfile?.availableStartDate || '未設定'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Housing Info */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Home className="w-5 h-5 text-green-400" />
            住居関連情報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-neutral-300">希望エリア</Label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="エリアを追加"
                    className="bg-neutral-800 border-neutral-600 text-white"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => addItem('preferredAreas', newArea, setNewArea)}
                    className="bg-green-600 hover:bg-green-700"
                    suppressHydrationWarning
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editedProfile.preferredAreas || []).map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                      {area}
                      <button onClick={() => removeItem('preferredAreas', index)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {(userProfile?.preferredAreas || []).map((area, index) => (
                  <Badge key={index} variant="secondary" className="bg-neutral-800 text-neutral-300">
                    {area}
                  </Badge>
                ))}
                {(!userProfile?.preferredAreas || userProfile.preferredAreas.length === 0) && (
                  <p className="text-neutral-400">未設定</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-neutral-300">予算範囲</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.budgetRange || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, budgetRange: e.target.value})}
                  placeholder="例: ¥50,000 - ¥80,000"
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.budgetRange || '未設定'}</p>
              )}
            </div>
            <div>
              <Label className="text-neutral-300">入居希望日</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editedProfile.moveInDate || ''}
                  onChange={(e) => setEditedProfile({...editedProfile, moveInDate: e.target.value})}
                  className="bg-neutral-800 border-neutral-600 text-white"
                />
              ) : (
                <p className="text-white mt-1">{userProfile?.moveInDate || '未設定'}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-neutral-300">緊急連絡先</Label>
            {isEditing ? (
              <Input
                value={editedProfile.emergencyContact || ''}
                onChange={(e) => setEditedProfile({...editedProfile, emergencyContact: e.target.value})}
                className="bg-neutral-800 border-neutral-600 text-white"
              />
            ) : (
              <p className="text-white mt-1">{userProfile?.emergencyContact || '未設定'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="bg-neutral-900/70 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-yellow-400" />
            書類・資格
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="residenceCard"
                checked={editedProfile.hasResidenceCard || false}
                onChange={(e) => setEditedProfile({...editedProfile, hasResidenceCard: e.target.checked})}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <Label htmlFor="residenceCard" className="text-neutral-300">在留カード</Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="workPermit"
                checked={editedProfile.hasWorkPermit || false}
                onChange={(e) => setEditedProfile({...editedProfile, hasWorkPermit: e.target.checked})}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <Label htmlFor="workPermit" className="text-neutral-300">就労許可</Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="insurance"
                checked={editedProfile.hasInsurance || false}
                onChange={(e) => setEditedProfile({...editedProfile, hasInsurance: e.target.checked})}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <Label htmlFor="insurance" className="text-neutral-300">保険証</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="flex gap-4">
          <Button onClick={handleCancel} variant="outline" className="flex-1 border-neutral-600 text-neutral-300" suppressHydrationWarning>
            キャンセル
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" suppressHydrationWarning>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </div>
      )}
    </main>
  )
}