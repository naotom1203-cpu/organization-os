// app/components/layout/Sidebar.tsx (新規作成)
'use client'

import { Zap, PieChart, Network, Users, User, LogOut } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const boards = [
  { id: 'portfolio', name: '経営者ボード', icon: PieChart },
  { id: 'division', name: '事業部長ボード', icon: Network },
  { id: 'manager', name: '管理職ボード', icon: Users },
  { id: 'personal', name: 'マイボード (現場)', icon: User },
]

type SidebarProps = {
  currentBoard: string
  setCurrentBoard: (boardId: string) => void
}

export default function Sidebar({ currentBoard, setCurrentBoard }: SidebarProps) {
  return (
    // bg-[#fbfbfa] でNotionの左メニュー色を再現
    <aside className="w-16 lg:w-56 bg-[#fbfbfa] border-r border-slate-200 flex flex-col shrink-0 z-40 relative shadow-sm h-screen">
      
      {/* ワークスペースロゴ (完全移植) */}
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-200">
        <div className="w-8 h-8 bg-[#0f172a] text-white rounded flex items-center justify-center font-black shrink-0">
          <Zap size={16} />
        </div>
        <span className="ml-3 font-black text-lg hidden lg:block tracking-tight text-[#0f172a]">
          OS.Alignment
        </span>
      </div>

      {/* ナビゲーションメニュー (完全移植) */}
      <nav className="mt-8 flex flex-col gap-1 px-3 flex-grow overflow-y-auto custom-scroll">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden lg:block mb-2">Workspace</p>
        
        {boards.map((board) => {
          const isActive = currentBoard === board.id
          const Icon = board.icon
          
          return (
            <button
              key={board.id}
              onClick={() => setCurrentBoard(board.id)}
              // ホバー時の質感（transition-colorsと透明度グレー）を適用
              className={`flex items-center gap-3.5 px-3 py-2.5 rounded-lg font-bold text-[13px] transition-all group ${
                isActive 
                  ? 'bg-slate-200/60 text-[#0f172a] border border-slate-200 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-200/40 hover:text-[#0f172a]'
              }`}
            >
              <Icon size={18} className={`w-5 text-center ${isActive ? 'text-[#0f172a]' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="hidden lg:block">{board.name}</span>
            </button>
          )
        })}
      </nav>

      {/* フッター（ユーザーエリア / ログアウト） (完全移植) */}
      <div className="p-3 border-t border-slate-200/60">
        <button 
          onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          <LogOut size={16} className="text-slate-400" />
          <span>ログアウト</span>
        </button>
      </div>
    </aside>
  )
}
