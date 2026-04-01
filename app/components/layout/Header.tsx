// app/components/layout/Header.tsx (新規作成)
'use client'

import { Settings } from 'lucide-react'

type HeaderProps = {
  isEditMode: boolean
  setIsEditMode: (isEditMode: boolean) => void
}

export default function Header({ isEditMode, setIsEditMode }: HeaderProps) {
  return (
    // glass-nav クラスを適用してGASのヘッダーを再現
    <header className="glass-nav h-16 flex items-center justify-between px-8 shrink-0 z-30 border-b border-slate-200">
      <div className="flex items-center gap-4">
        <span className="text-[#0f172a] text-sm font-bold cursor-pointer hover:text-slate-600">鈴木 (現場)</span>
      </div>
      <div className="flex items-center gap-4">
        {/* レンズ切り替え (モック) */}
        <div className="flex bg-slate-100 border border-slate-200 rounded-full p-1 shadow-sm mr-4 relative z-10">
          <button className="bg-white text-[#0f172a] px-6 py-1.5 rounded-full text-xs font-bold transition-all border border-slate-200 shadow-sm relative z-20">業務 (Biz)</button>
          <button className="text-slate-500 hover:text-[#0f172a] px-6 py-1.5 rounded-full text-xs font-bold transition-all relative z-10">組織 (Org)</button>
        </div>
        {/* カスタマイズボタン (完全移植) */}
        <button onClick={() => setIsEditMode(!isEditMode)} className="bg-white hover:bg-slate-50 border border-slate-200 text-[#0f172a] font-bold px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-2 text-[12px]">
          <Settings size={14} className="text-[#2563eb]" />
          UIをカスタマイズ
        </button>
      </div>
    </header>
  )
}
