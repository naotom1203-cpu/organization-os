'use client'

export default function KpiWidget() {
  return (
    <div className="col-span-12 md:col-span-6 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col justify-center min-h-[220px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">今月のKPI達成率</h3>
        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
          順調
        </span>
      </div>
      
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex justify-between items-end">
          <span className="text-4xl font-black text-[#0f172a] tracking-tighter leading-none">82%</span>
          <span className="text-xs font-bold text-slate-500">目標まで 18%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
        </div>
      </div>
    </div>
  )
}
