'use client'

import { Network } from 'lucide-react'

export default function SdtWidget() {
  return (
    <div className="col-span-12 md:col-span-6 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex items-center justify-between min-h-[150px]">
      <div>
        <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-1">推計 SDTスコア</h3>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-black text-[#0f172a]">3.5</span>
          <span className="text-[12px] text-[#64748b] mb-1">/ 5.0</span>
        </div>
      </div>
      <div className="w-16 h-16 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
        <Network size={24} className="text-purple-400 opacity-50" />
      </div>
    </div>
  )
}
