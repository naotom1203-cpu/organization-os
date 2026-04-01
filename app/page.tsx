'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, Settings, Plus, Play, CheckCircle, 
  MessageSquare,Zap, LogOut, GripVertical, Maximize2, Minimize2, Trash2 
} from 'lucide-react'

// --- Supabase設定 ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OrganizationOS() {
  const [user, setUser] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // GASのプロトタイプから引き継いだレイアウト状態
  const [layout, setLayout] = useState([
    { id: 'widget-sdt', title: '推計 SDTスコア', cols: 6 },
    { id: 'widget-pipeline', title: 'PDCAパイプライン', cols: 12 },
  ])

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('company_id').eq('id', user.id).single()
        if (profile) {
          const { data: companyData } = await supabase.from('companies').select('*').eq('id', profile.company_id).single()
          setCompany(companyData)
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  if (loading) return <div className="p-10 text-center font-bold">OS.Alignment 起動中...</div>

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* --- サイドバー --- */}
      <aside className="w-16 lg:w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="w-8 h-8 bg-slate-900 text-white rounded flex items-center justify-center font-black">
            <Zap size={18} />
          </div>
          <span className="ml-3 font-black text-lg hidden lg:block tracking-tight">OS.Alignment</span>
        </div>
        <nav className="mt-8 flex flex-col gap-2 px-3">
          <button className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm">
            <LayoutDashboard size={20} />
            <span className="hidden lg:block">マイボード</span>
          </button>
        </nav>
      </aside>

      {/* --- メインコンテンツ --- */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="font-bold text-lg">
            {company ? company.name : '組織を選択してください'}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                isEditMode ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-white text-slate-700 border-slate-200 shadow-sm'
              }`}
            >
              <Settings size={14} className={isEditMode ? 'animate-spin' : ''} />
              {isEditMode ? 'レイアウトを保存' : 'UIをカスタマイズ'}
            </button>
            <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-slate-400 hover:text-rose-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-8 custom-scroll">
          <div className={`grid grid-cols-12 gap-6 max-w-[1400px] mx-auto ${isEditMode ? 'p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-100/50' : ''}`}>
            {layout.map((widget) => (
              <div 
                key={widget.id} 
                className={`col-span-12 md:col-span-${widget.cols} bg-white border border-slate-200 rounded-xl shadow-sm relative min-h-[200px] flex flex-col group transition-all ${
                  isEditMode ? 'ring-2 ring-blue-500 ring-offset-2 scale-[0.98]' : ''
                }`}
              >
                {/* 編集モード限定のオーバーレイ */}
                {isEditMode && (
                  <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-[2px] z-10 rounded-xl flex flex-col items-center justify-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md border border-blue-200 flex items-center gap-2 font-bold text-blue-600 cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} />
                      {widget.title}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 shadow-sm"><Minimize2 size={16}/></button>
                      <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 shadow-sm"><Maximize2 size={16}/></button>
                      <button className="p-2 bg-rose-50 text-rose-600 rounded-lg border border-rose-200 hover:bg-rose-100 shadow-sm ml-2"><Trash2 size={16}/></button>
                    </div>
                  </div>
                )}

                {/* ウィジェットの中身（GASのプロトタイプから移植） */}
                <div className="p-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{widget.title}</h3>
                  {widget.id === 'widget-sdt' && (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-slate-900">3.5</span>
                      <span className="text-sm text-slate-400 mb-1">/ 5.0</span>
                    </div>
                  )}
                  {widget.id === 'widget-pipeline' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Play size={14} fill="currentColor"/></div>
                          <span className="font-bold text-sm">トークBの検証 (架電20件)</span>
                        </div>
                        <button className="text-slate-300 hover:text-teal-500"><CheckCircle size={20}/></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- アクション追加FAB --- */}
      {!isEditMode && (
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
          <Plus size={24} strokeWidth={3} />
        </button>
      )}
    </div>
  )
}
