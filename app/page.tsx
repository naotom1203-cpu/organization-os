'use client'

import { useState } from 'react'
import { 
  PieChart, 
  Network, 
  Users, 
  User, 
  Zap, 
  LogOut,
  ChevronRight
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// --- Supabase設定 ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ==========================================
// 1. サイドバー・コンポーネント (Notion風デザイン)
// ==========================================
function Sidebar({ currentBoard, setCurrentBoard }: { currentBoard: string, setCurrentBoard: (b: string) => void }) {
  
  // ボードの定義リスト
  const boards = [
    { id: 'portfolio', name: '経営者ボード', icon: PieChart },
    { id: 'division', name: '事業部長ボード', icon: Network },
    { id: 'manager', name: '管理職ボード', icon: Users },
    { id: 'personal', name: 'マイボード (現場)', icon: User },
  ]

  return (
    <aside className="w-[240px] bg-[#fbfbfa] border-r border-slate-200 flex flex-col shrink-0 h-screen transition-all">
      {/* ワークスペース名（ヘッダー部分） */}
      <div className="h-[48px] flex items-center px-4 hover:bg-slate-200/50 cursor-pointer transition-colors m-2 rounded-md">
        <div className="w-5 h-5 bg-slate-800 text-white rounded flex items-center justify-center font-black shrink-0 shadow-sm">
          <Zap size={12} />
        </div>
        <span className="ml-2.5 font-semibold text-[14px] text-slate-800 tracking-tight truncate">
          OS.Alignment
        </span>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex-grow px-3 pt-4 flex flex-col gap-0.5">
        <p className="px-2 text-[11px] font-semibold text-slate-400 mb-1">ワークスペース</p>
        
        {boards.map((board) => {
          const isActive = currentBoard === board.id
          const Icon = board.icon
          
          return (
            <button
              key={board.id}
              onClick={() => setCurrentBoard(board.id)}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors group ${
                isActive 
                  ? 'bg-slate-200/60 text-slate-900' 
                  : 'text-slate-600 hover:bg-slate-200/40 hover:text-slate-900'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-600'} />
              <span>{board.name}</span>
            </button>
          )
        })}
      </nav>

      {/* ユーザーエリア（フッター部分） */}
      <div className="p-3 border-t border-slate-200/60">
        <button 
          onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-medium text-slate-500 hover:bg-slate-200/40 hover:text-slate-800 transition-colors"
        >
          <LogOut size={16} className="text-slate-400" />
          <span>ログアウト</span>
        </button>
      </div>
    </aside>
  )
}

// ==========================================
// 2. メインアプリ（全体のレイアウトと状態管理）
// ==========================================
export default function OrganizationOS() {
  // どのボードを開いているかの状態（初期値は 'personal'）
  const [currentBoard, setCurrentBoard] = useState('personal')

  // ボードのIDからタイトルを取得するヘルパー関数
  const getBoardTitle = () => {
    switch (currentBoard) {
      case 'portfolio': return '経営者ボード'
      case 'division': return '事業部長ボード'
      case 'manager': return '管理職ボード'
      case 'personal': return 'マイボード (現場)'
      default: return 'ボード'
    }
  }

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* 分割したサイドバーを呼び出し、状態を渡す */}
      <Sidebar currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />

      {/* 右側のメインコンテンツエリア */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        
        {/* パンくずリスト風の上部ヘッダー */}
        <header className="h-[48px] flex items-center px-6 shrink-0 z-10">
          <div className="flex items-center text-[13px] font-medium text-slate-500">
            <span className="cursor-pointer hover:underline">OS.Alignment</span>
            <ChevronRight size={14} className="mx-1 text-slate-300" />
            <span className="text-slate-800 font-semibold">{getBoardTitle()}</span>
          </div>
        </header>

        {/* コンテンツの中身が変わるエリア */}
        <div className="flex-grow overflow-y-auto p-8 custom-scroll">
          <div className="max-w-[1000px] mx-auto">
            {/* タイトル */}
            <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              {getBoardTitle()}
            </h1>

            {/* ボードごとの出し分けロジック */}
            {currentBoard === 'portfolio' && (
              <div className="p-10 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm">
                ここに全社KGIやリスクヒートマップのコンポーネントを配置します。
              </div>
            )}
            
            {currentBoard === 'division' && (
              <div className="p-10 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm">
                ここに組織ツリーや事業部KPIのコンポーネントを配置します。
              </div>
            )}
            
            {currentBoard === 'manager' && (
              <div className="p-10 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm">
                ここにメンバーリストや1on1管理のコンポーネントを配置します。
              </div>
            )}
            
            {currentBoard === 'personal' && (
              <div className="p-10 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500 text-sm">
                ここにSDTスコアやPDCAパイプラインのコンポーネントを配置します。
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
