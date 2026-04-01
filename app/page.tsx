'use client'

import { useState } from 'react'
import { 
  Zap, User, PieChart, Network, Users, ChevronRight, Settings, LogOut,
  Play, Check, ChevronDown, Plus, FlaskConical, Target, Bell
} from 'lucide-react'

// ==========================================
// 1. デザインシステム (GASの<style>を完全移植)
// ==========================================
// ※本来はglobals.cssに書きますが、コピペ一発で動かすためにここに記述します
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
    
    :root {
      --bg-base: #f8fafc;
      --bg-panel: #ffffff;
      --border-dim: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --accent-blue: #2563eb;
      --alert-rose: #e11d48;
      --good-teal: #0d9488;
      --gold-core: #d97706;
      --org-purple: #7c3aed;
    }

    body {
      font-family: 'Inter', 'Noto Sans JP', sans-serif;
      font-size: 13px;
      color: var(--text-main);
      background-color: var(--bg-base);
      -webkit-font-smoothing: antialiased;
    }

    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
    }

    .custom-scroll::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 4px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: transparent;
    }

    .dashboard-grid { align-content: start; }
    .is-editing .dashboard-grid {
      padding: 20px;
      background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
      background-size: 20px 20px;
      border-radius: 16px;
      border: 2px dashed #94a3b8;
    }
  `}} />
)

// ==========================================
// 2. メインアプリケーション
// ==========================================
export default function OrganizationOS() {
  const [currentBoard, setCurrentBoard] = useState('personal')
  const [pipelineTab, setPipelineTab] = useState('todo')
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <>
      <CustomStyles />
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        
        {/* --- サイドバー --- */}
        <aside className="w-16 lg:w-56 bg-white border-r border-[#e2e8f0] flex flex-col shrink-0 z-40 relative shadow-sm">
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#e2e8f0]">
            <div className="w-8 h-8 bg-[#0f172a] text-white rounded flex items-center justify-center font-black">
              <Zap size={16} />
            </div>
            <span className="ml-3 font-black text-lg hidden lg:block tracking-tight text-[#0f172a]">
              OS.Alignment
            </span>
          </div>

          <nav className="mt-8 flex flex-col gap-2 px-3">
            <p className="px-3 text-[10px] font-bold text-[#64748b] uppercase tracking-widest hidden lg:block mb-2">Workspace</p>
            
            <button onClick={() => setCurrentBoard('portfolio')} className={`flex items-center gap-3.5 px-3 py-3 rounded-lg font-bold text-[13px] transition-all ${currentBoard === 'portfolio' ? 'bg-slate-100 text-[#0f172a] border border-[#e2e8f0]' : 'text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a]'}`}>
              <PieChart size={18} className="w-5 text-center" />
              <span className="hidden lg:block">経営者ボード</span>
            </button>
            <button onClick={() => setCurrentBoard('division')} className={`flex items-center gap-3.5 px-3 py-3 rounded-lg font-bold text-[13px] transition-all ${currentBoard === 'division' ? 'bg-slate-100 text-[#0f172a] border border-[#e2e8f0]' : 'text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a]'}`}>
              <Network size={18} className="w-5 text-center" />
              <span className="hidden lg:block">事業部長ボード</span>
            </button>
            <button onClick={() => setCurrentBoard('manager')} className={`flex items-center gap-3.5 px-3 py-3 rounded-lg font-bold text-[13px] transition-all ${currentBoard === 'manager' ? 'bg-slate-100 text-[#0f172a] border border-[#e2e8f0]' : 'text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a]'}`}>
              <Users size={18} className="w-5 text-center" />
              <span className="hidden lg:block">管理職ボード</span>
            </button>
            <button onClick={() => setCurrentBoard('personal')} className={`flex items-center gap-3.5 px-3 py-3 rounded-lg font-bold text-[13px] transition-all ${currentBoard === 'personal' ? 'bg-slate-100 text-[#0f172a] border border-[#e2e8f0]' : 'text-[#64748b] hover:bg-slate-50 hover:text-[#0f172a]'}`}>
              <User size={18} className="w-5 text-center" />
              <span className="hidden lg:block">マイボード (現場)</span>
            </button>
          </nav>
        </aside>

        {/* --- メインコンテンツ --- */}
        <div className="flex-grow flex flex-col h-screen relative">
          
          {/* グラスモーフィズム・ヘッダー */}
          <header className="glass-nav h-16 flex items-center justify-between px-8 shrink-0 z-30 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-4">
              <span className="text-[#0f172a] text-sm font-bold cursor-pointer hover:text-slate-600">鈴木 (現場)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 border border-[#e2e8f0] rounded-full p-1 shadow-sm mr-4">
                <button className="bg-white text-[#0f172a] px-6 py-1.5 rounded-full text-xs font-bold transition-all border border-[#e2e8f0] shadow-sm">業務 (Biz)</button>
                <button className="text-[#64748b] hover:text-[#0f172a] px-6 py-1.5 rounded-full text-xs font-bold transition-all">組織 (Org)</button>
              </div>
              <button onClick={() => setIsEditMode(!isEditMode)} className="bg-white hover:bg-slate-50 border border-[#e2e8f0] text-[#0f172a] font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 text-[12px]">
                <Settings size={14} className="text-[#2563eb]" />
                UIをカスタマイズ
              </button>
            </div>
          </header>

          {/* ダッシュボードエリア */}
          <main className={`flex-grow overflow-y-auto custom-scroll p-6 lg:p-8 flex flex-col relative ${isEditMode ? 'is-editing' : ''}`}>
            <div className="dashboard-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto">
              
              {/* --- ウィジェット：ヘッダー --- */}
              <div className="col-span-12 flex justify-between items-center px-2 mb-2">
                <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">マイボード (現場)</h2>
              </div>

              {/* --- ウィジェット：SDTスコア --- */}
              <div className="col-span-12 md:col-span-6 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex items-center justify-between min-h-[150px]">
                <div>
                  <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-1">推計 SDTスコア</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-[#0f172a]">3.5</span>
                    <span className="text-[12px] text-[#64748b] mb-1">/ 5.0</span>
                  </div>
                </div>
                {/* 簡易レーダーチャートのモック */}
                <div className="w-16 h-16 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
                  <Network size={24} className="text-purple-400 opacity-50" />
                </div>
              </div>

              {/* --- ウィジェット：KPIモック --- */}
              <div className="col-span-12 md:col-span-6 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col justify-center min-h-[150px]">
                <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-3">今月のKPI達成率</h3>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-black text-[#0f172a]">82%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#2563eb]" style={{ width: '82%' }}></div>
                </div>
              </div>

              {/* --- ウィジェット：PDCAパイプライン（完全再現） --- */}
              <div className="col-span-12 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-[400px]">
                <div className="flex justify-between items-center px-4 border-b border-[#e2e8f0] bg-slate-50 rounded-t-xl">
                  <div className="flex items-center">
                    <h3 className="text-[14px] font-black text-[#0f172a] mr-6 ml-2">Action Timeline</h3>
                    <button onClick={() => setPipelineTab('todo')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'todo' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'}`}>
                      実行中 (Do)
                    </button>
                    <button onClick={() => setPipelineTab('done')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'done' ? 'border-[#0d9488] text-[#0d9488]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'}`}>
                      完了 / 振り返り
                    </button>
                  </div>
                  <button className="bg-[#0f172a] hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center">
                    <Plus size={14} className="mr-1.5" /> 追加
                  </button>
                </div>

                <div className="flex-grow p-6 bg-slate-50 flex flex-col gap-4 rounded-b-xl">
                  {/* アクションカード (GASのDOM構造を完全再現) */}
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative cursor-pointer">
                    <div className="flex items-center gap-3 pr-8 ml-2">
                      <button className="w-5 h-5 rounded border-2 border-[#e2e8f0] flex items-center justify-center text-white hover:border-[#2563eb] hover:bg-blue-50 transition-colors z-10">
                        <Check size={12} className="opacity-0 hover:opacity-100 text-[#2563eb]" />
                      </button>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-[#d97706] flex items-center">
                        <FlaskConical size={10} className="mr-1" /> 業務 探索
                      </span>
                      <span className="text-[14px] font-bold text-[#0f172a] flex-grow">トークBの検証 (架電20件)</span>
                      <button className="text-[#64748b] hover:text-[#0f172a] px-2"><ChevronDown size={16} /></button>
                    </div>

                    {/* アコーディオン部分のPlan */}
                    <div className="pl-7 mt-3">
                      <div className="bg-slate-100 rounded-lg p-3 text-[12px]">
                        <span className="font-bold text-[#64748b] block mb-1">【Plan (目的・仮説)】</span>
                        <p className="text-[#0f172a] whitespace-pre-wrap">質問から入るトークで接続率10%を目指す</p>
                      </div>
                    </div>

                    {/* PDCA進捗バー */}
                    <div className="flex items-stretch text-[11px] mt-4 ml-2 bg-slate-50 rounded-lg border border-[#e2e8f0] overflow-hidden">
                      <div className="flex-1 p-3 border-r border-[#e2e8f0]">
                        <span className="font-bold text-[#64748b] block mb-1">Plan</span>
                        質問から入るトークで...
                      </div>
                      <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
                      <div className="flex-1 p-3 border-r border-[#e2e8f0]">
                        <span className="font-bold text-[#2563eb] block mb-1">Do</span>
                        トークBの検証 (架電20件)
                      </div>
                      <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
                      <div className="flex-1 p-3 border-r border-[#e2e8f0] opacity-40">
                        <span className="font-bold text-[#d97706] block mb-1">Check</span>未検証
                      </div>
                      <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
                      <div className="flex-1 p-3 opacity-40">
                        <span className="font-bold text-[#7c3aed] block mb-1">Act</span>未決裁
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}
