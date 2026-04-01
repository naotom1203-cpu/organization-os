'use client'

import SdtWidget from '../widgets/SdtWidget'
import PipelineWidget from '../widgets/PipelineWidget'

export default function PersonalBoard() {
  return (
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto p-6 lg:p-8">
      <div className="col-span-12 flex justify-between items-center px-2 mb-2">
        <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">マイボード (現場)</h2>
      </div>

      <SdtWidget />
      
      {/* KPIウィジェット (ファイルがないのでここに直書き) */}
      <div className="col-span-12 md:col-span-6 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col justify-center min-h-[150px]">
        <h3 className="text-[11px] font-bold text-[#64748b] uppercase tracking-widest mb-3">今月のKPI達成率</h3>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-4xl font-black text-[#0f172a]">82%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="h-2 rounded-full bg-[#2563eb]" style={{ width: '82%' }}></div>
        </div>
      </div>

      <PipelineWidget />
    </div>
  )
}
