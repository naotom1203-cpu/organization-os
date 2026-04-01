'use client'

import SdtWidget from '../widgets/SdtWidget'
import KpiWidget from '../widgets/KpiWidget' // ★新しく作ったファイルを読み込む
import PipelineWidget from '../widgets/PipelineWidget'

export default function PersonalBoard() {
  return (
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto p-6 lg:p-8">
      <div className="col-span-12 flex justify-between items-center px-2 mb-2">
        <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">マイボード (現場)</h2>
      </div>

      <SdtWidget />
      <KpiWidget /> {/* ★ここで呼び出すだけ！スッキリ！ */}
      <PipelineWidget />
    </div>
  )
}
