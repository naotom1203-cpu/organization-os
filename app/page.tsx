'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, Settings, Plus, Play, CheckCircle, 
  Zap, LogOut, GripVertical, Maximize2, Minimize2, Trash2,
  PieChart, Users, User, ArrowRight, Bell, FlaskConical, Target
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OrganizationOS() {
  const [user, setUser] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // GASのUIを再現するためのウィジェット配置
  const [layout, setLayout] = useState([
    { id: 'widget-sdt', title: '推計 SDTスコア', cols: 6, type: 'org' },
    { id: 'widget-kpi', title: '今月のKPI達成率', cols: 6, type: 'biz' },
    { id: 'widget-pipeline', title: 'PDCAパイプライン (Do)', cols: 12, type: 'explore' },
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

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white font-black text-2xl animate-pulse">
      OS.ALIGNMENT INITIALIZING...
    </div>
  )

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-[#0f172a] overflow-hidden">
      
      {/* --- 左サイドバー (GASのデザインを再現) --- */}
      <aside className="w-16 lg:w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 z-40 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="w-8 h-8 bg-slate-900 text-white rounded flex items-center justify-center font-black shrink-0">
            <Zap size={18} />
          </div>
          <span className="ml-3 font-black text-lg hidden lg:block tracking-tight text-slate-900">OS.Alignment</span>
        </div>
        
        <nav className="mt-8 flex flex-col gap-2 px-3">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden lg:block mb-2">Workspace</p>
          <button className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm transition-all shadow-sm">
            <User size={20} className="text-slate-600" />
            <span className="hidden lg:block">マイボード (現場)</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-50 font-bold text-sm transition-all">
            <PieChart size={20} />
            <span className="hidden lg:block">経営者ボード</span>
          </button>
        </nav>
      </aside>

      {/* --- メインエリア --- */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        
        {/* ヘッダー */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-500 border border-slate-200">PROJECT</div>
            <div className="font-black text-lg text-slate-800 tracking-tight">
              {company ? company.name : 'NO ORGANIZATION SELECTED'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-2 border shadow-sm ${
                isEditMode ? 'bg-teal-500 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Settings size={14} className={isEditMode ? 'animate-spin' : ''} />
              {isEditMode ? 'レイアウトを保存' : 'UIをカスタマイズ'}
            </button>
            <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-slate-300 hover:text-rose-500 transition-colors p-2">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* ダッシュボード本体 */}
        <main className={`flex-grow overflow-y-auto p-8 custom-scroll bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]`}>
          <div className={`grid grid-cols-12 gap-6 max-w-[1400px] mx-auto transition-all ${isEditMode ? 'p-6 bg-slate-200/50 border-4 border-dashed border-slate-300 rounded-[2rem]' : ''}`}>
            
            {layout.map((widget) => (
              <div 
                key={widget.id} 
                className={`col-span-12 md:col-span-${widget.cols} bg-white border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative flex flex-col group overflow-hidden transition-all duration-300 ${
                  isEditMode ? 'ring-4 ring-blue-500/50 scale-[0.98] z-20 cursor-grab active:cursor-grabbing' : ''
                }`}
              >
                {isEditMode && (
                  <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] z-10 flex items-center justify-center gap-2">
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl border border-blue-200 font-black text-blue-600 text-[10px] uppercase flex items-center gap-2">
                      <GripVertical size={14} /> {widget.title}
                    </div>
                  </div>
                )}

                {/* ウィジェットコンテンツ */}
                <div className="p-7">
                  <header className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{widget.title}</h3>
                    {widget.type === 'org' && <Bell size={14} className="text-purple-400" />}
                    {widget.type === 'biz' && <Target size={14} className="text-teal-400" />}
                    {widget.type === 'explore' && <FlaskConical size={14} className="text-orange-400" />}
                  </header>

                  {/* モジュールごとの出し分け */}
                  {widget.id === 'widget-sdt' && (
                    <div className="flex items-center gap-6">
                      <div className="flex items-end gap-1">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">3.5</span>
                        <span className="text-sm font-bold text-slate-400 mb-2">/ 5.0</span>
                      </div>
                      <div className="h-12 w-px bg-slate-100"></div>
                      <div className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                        <i className="fa-solid fa-arrow-up mr-1"></i> 先週比 +0.2
                      </div>
                    </div>
                  )}

                  {widget.id === 'widget-kpi' && (
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-end">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">82%</span>
                        <span className="text-xs font-bold text-teal-600">目標達成まであと 18%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full w-[82%] rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                      </div>
                    </div>
                  )}

                  {widget.id === 'widget-pipeline' && (
                    <div className="space-y-4">
                      {/* アクションアイテム */}
                      <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 hover:border-blue-200 transition-all cursor-pointer group/item">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                          <Play size={16} fill="currentColor" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black px-2 py-0.5 bg-orange-100 text-orange-600 rounded uppercase">Explore</span>
                            <span className="text-[10px] font-bold text-slate-400">2時間前</span>
                          </div>
                          <p className="font-bold text-slate-700 text-sm italic">"トークBの検証 (架電20件)"</p>
                        </div>
                        <ArrowRight size={18} className="text-slate-300 group-hover/item:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* アクション追加ボタン (FAB) */}
      {!isEditMode && (
        <button className="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-all z-50">
          <Plus size={32} strokeWidth={3} />
        </button>
      )}
    </div>
  )
}
