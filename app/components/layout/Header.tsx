'use client'

import { Settings } from 'lucide-react'

export default function Header({ isEditMode, setIsEditMode }: { isEditMode: boolean, setIsEditMode: (v: boolean) => void }) {
  return (
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
  )
}
