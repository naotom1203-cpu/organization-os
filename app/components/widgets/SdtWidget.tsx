// app/components/widgets/SdtWidget.tsx (新規作成)
'use client'

import { Network } from 'lucide-react'

export default function SdtWidget() {
  return (
    // shadow-[0_4px_20px_rgba(0,0,0,0.03)] でNotion風の薄い影を適用
    <div className="col-span-12 md:col-span-6 bg-white border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex items-center justify-between min-h-[150px]">
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">推計 SDTスコア</h3>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black tracking-tighter text-[#0f172a]">3.5</span>
          <span className="text-sm font-bold text-slate-400 mb-2">/ 5.0</span>
        </div>
      </div>
      {/* 簡易レーダーチャートのモック */}
      <div className="w-20 h-20 rounded-full bg-purple-50 border-2 border-purple-100 flex items-center justify-center shadow-inner">
        <Network size={32} className="text-purple-400 opacity-50" />
      </div>
    </div>
  )
}
