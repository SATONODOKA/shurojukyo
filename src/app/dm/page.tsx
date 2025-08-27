'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import { useState } from 'react'
import { Search, Send, ArrowLeft, MoreVertical } from 'lucide-react'

export default function DMPage() {
  const { threads, addMessage } = useAppStore()
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [showChatList, setShowChatList] = useState(true)
  const [newMessage, setNewMessage] = useState('')

  // 実際のスレッドをチャット表示用に変換
  const allChats = threads.map(thread => ({
    id: thread.id,
    title: thread.type === 'employer' ? '求人応募' : '入居申込',
    subtitle: thread.title,
    lastMessage: thread.lastMessage || thread.content.slice(0, 30) + '...',
    timestamp: new Date(thread.timestamp).toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    unread: thread.messages?.length > 0 ? Math.max(0, thread.messages.filter(m => !m.isMe).length - 1) : 0,
    type: thread.type,
    avatar: thread.type === 'employer' ? '💼' : '🏠',
    thread: thread
  }))

  const selectedChat = allChats.find(chat => chat.id === selectedThread)

  // メッセージ送信機能
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return

    addMessage(selectedThread, {
      text: newMessage.trim(),
      isMe: true
    })

    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBackToList = () => {
    setShowChatList(true)
    setSelectedThread(null)
  }

  const handleSelectChat = (chatId: string) => {
    setSelectedThread(chatId)
    setShowChatList(false)
  }

  // モバイル: チャット一覧表示時
  if (showChatList || !selectedThread) {
    return (
      <main className="mx-auto max-w-md lg:max-w-6xl h-[calc(100dvh-56px)]">
        {/* モバイル・PC共通: チャット一覧 */}
        <div className="lg:grid lg:grid-cols-[360px_1fr] h-full">
          
          {/* チャット一覧サイドバー */}
          <div className="bg-neutral-950 border-r border-neutral-800 flex flex-col h-full">
            {/* ヘッダー */}
            <div className="p-4 border-b border-neutral-800">
              <h1 className="text-lg font-semibold text-white mb-3">メッセージ</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input 
                  placeholder="チャットを検索"
                  className="pl-10 bg-neutral-900 border-neutral-700 text-white placeholder-neutral-400"
                />
              </div>
            </div>

            {/* チャットリスト */}
            <div className="flex-1 overflow-y-auto">
              {allChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className="p-4 border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg">
                      {chat.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {chat.title}
                        </h3>
                        <span className="text-xs text-neutral-400">{chat.timestamp}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mb-1">{chat.subtitle}</p>
                      <p className="text-sm text-neutral-300 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PC: 選択されていない時のプレースホルダー */}
          <div className="hidden lg:flex items-center justify-center bg-neutral-950">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                💬
              </div>
              <h2 className="text-lg font-medium text-white mb-2">チャットを選択</h2>
              <p className="text-neutral-400 text-sm">左側からチャットを選んでメッセージを開始しましょう</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // チャットが空の場合の処理
  if (allChats.length === 0) {
    return (
      <main className="mx-auto max-w-md lg:max-w-6xl h-[calc(100dvh-56px)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            💬
          </div>
          <h2 className="text-lg font-medium text-white mb-2">チャットがありません</h2>
          <p className="text-neutral-400 text-sm">セットで申し込みをすると、チャットが開始されます</p>
        </div>
      </main>
    )
  }

  // 選択されたスレッドのメッセージを取得
  const selectedThreadData = threads.find(t => t.id === selectedThread)
  const messages = selectedThreadData?.messages || []
  
  return (
    <main className="mx-auto max-w-md lg:max-w-6xl h-[calc(100dvh-56px)]">
      <div className="lg:grid lg:grid-cols-[360px_1fr] h-full">
        
        {/* PC: チャット一覧（常に表示） */}
        <div className="hidden lg:block bg-neutral-950 border-r border-neutral-800">
          <div className="p-4 border-b border-neutral-800">
            <h1 className="text-lg font-semibold text-white mb-3">メッセージ</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input 
                placeholder="チャットを検索"
                className="pl-10 bg-neutral-900 border-neutral-700 text-white placeholder-neutral-400"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {allChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedThread(chat.id)}
                className={`p-4 border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors ${
                  selectedThread === chat.id ? 'bg-neutral-900' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-white truncate">
                        {chat.title}
                      </h3>
                      <span className="text-xs text-neutral-400">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mb-1">{chat.subtitle}</p>
                    <p className="text-sm text-neutral-300 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{chat.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* チャット詳細画面 */}
        <div className="bg-neutral-950 flex flex-col h-full">
          {/* チャットヘッダー */}
          <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
            <button 
              onClick={handleBackToList}
              className="lg:hidden p-1 hover:bg-neutral-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
              {selectedChat?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-white">{selectedChat?.title}</h2>
              <p className="text-xs text-neutral-400">{selectedChat?.subtitle}</p>
            </div>
            <button className="p-1 hover:bg-neutral-800 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.isMe
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-neutral-800 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-200' : 'text-neutral-400'}`}>
                    {message.timestamp.toLocaleTimeString('ja-JP', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* メッセージ入力 */}
          <div className="p-4 border-t border-neutral-800">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="flex-1 bg-neutral-900 border-neutral-700 text-white placeholder-neutral-400"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 disabled:bg-neutral-600 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">自動翻訳が有効です</p>
          </div>
        </div>
      </div>
    </main>
  )
}