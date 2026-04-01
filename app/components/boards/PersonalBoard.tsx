// app/components/boards/PersonalBoard.tsx (新規作成)
'use client'

// 切り分けたウィジェットをインポート
import SdtWidget from '../widgets/SdtWidget'
import PipelineWidget from '../widgets/PipelineWidget'

export default function PersonalBoard() {
  return (
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto overflow-y-auto custom-scroll p-6 lg:p-8">
      
      {/* タイトルウィジェット (完全移植) */}
      <div className="col-span-12 flex justify-between items-center px-2 mb-2">
        <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">マイボード (現場)</h2>
      </div>

      {/* ウィジェットを配置 */}
      <SdtWidget />
      
      {/* KPIウィジェット (ファイルがないのでここに直書き) */}
      <div className="col-span-12 md:col-span-6 bg-[#ffffff] border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col justify-center min-h-[150px]">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">今月のKPI達成率</h3>
          <Target size={14} className="text-teal-400" />
        </header>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-4xl font-black text-[#0f172a] tracking-tighter">82%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: '82%' }}></div>
        </div>
      </div>

      <PipelineWidget />

    </div>
  )
}
