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

export default function Sidebar({ currentBoard, setCurrentBoard }: { currentBoard: string, setCurrentBoard: (b: string) => void }) {
  return (
    // w-[240px] で幅を完全固定し、h-screen で縦幅を画面いっぱいに強制します
    <aside className="w-[240px] bg-[#fbfbfa] border-r border-slate-200 flex flex-col shrink-0 z-50 h-screen">
      
      {/* ワークスペース名 */}
      <div className="h-14 flex items-center px-4 mt-2 mx-2 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-colors">
        <div className="w-6 h-6 bg-[#0f172a] text-white rounded flex items-center justify-center font-black shadow-sm">
          <Zap size={12} />
        </div>
        <span className="ml-2.5 font-bold text-[14px] text-[#0f172a] tracking-tight">
          OS.Alignment
        </span>
      </div>

      {/* ナビゲーション */}
      <nav className="mt-6 flex flex-col gap-1 px-3 flex-grow">
        <p className="px-2 text-[11px] font-bold text-slate-400 mb-1">Workspace</p>
        
        {boards.map((board) => {
          const isActive = currentBoard === board.id
          const Icon = board.icon
          return (
            <button
              key={board.id}
              onClick={() => setCurrentBoard(board.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-[13px] transition-all group ${
                isActive 
                  ? 'bg-slate-200/60 text-[#0f172a]' 
                  : 'text-slate-500 hover:bg-slate-200/40 hover:text-[#0f172a]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#0f172a]' : 'text-slate-400 group-hover:text-slate-600'} />
              <span>{board.name}</span>
            </button>
          )
        })}
      </nav>

      {/* フッター */}
      <div className="p-4 border-t border-slate-200/60">
        <button 
          onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[13px] font-medium text-slate-500 hover:bg-slate-200/40 hover:text-[#0f172a] transition-colors"
        >
          <LogOut size={16} className="text-slate-400" />
          <span>ログアウト</span>
        </button>
      </div>
    </aside>
  )
}
