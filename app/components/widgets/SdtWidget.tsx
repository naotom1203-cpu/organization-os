'use client'

export default function SdtWidget() {
  // SDTの3要素のモックデータ
  const factors = [
    { label: '自律性 (Autonomy)', score: 3.8, percent: 76, color: 'bg-blue-500' },
    { label: '有能感 (Competence)', score: 3.1, percent: 62, color: 'bg-orange-500' },
    { label: '関係性 (Relatedness)', score: 3.6, percent: 72, color: 'bg-teal-500' },
  ]

  return (
    <div className="col-span-12 md:col-span-6 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col min-h-[220px]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">推計 SDTスコア (総合)</h3>
        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">
          良化傾向
        </span>
      </div>
      
      <div className="flex items-end gap-1 mb-6">
        <span className="text-4xl font-black text-[#0f172a] leading-none">3.5</span>
        <span className="text-[12px] font-bold text-slate-400 mb-1">/ 5.0</span>
      </div>

      {/* 表（テーブル）形式の要因分解 */}
      <div className="space-y-4 mt-auto">
        {factors.map((factor, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-[12px] mb-1.5">
              <span className="font-semibold text-slate-600">{factor.label}</span>
              <span className="font-bold text-[#0f172a]">{factor.score.toFixed(1)}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className={`${factor.color} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${factor.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
