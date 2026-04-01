// app/components/widgets/PipelineWidget.tsx (新規作成)
'use client'

import { useState } from 'react'
import { Plus, Check, ChevronDown, ChevronRight, FlaskConical, Target, Bell } from 'lucide-react'

export default function PipelineWidget() {
  const [pipelineTab, setPipelineTab] = useState('todo')

  return (
    <div className="col-span-12 bg-white border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-[400px] overflow-hidden">
      {/* ヘッダー / タブ (完全移植) */}
      <div className="flex justify-between items-center px-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl shrink-0">
        <div className="flex items-center">
          <h3 className="text-[14px] font-black text-[#0f172a] mr-6 ml-2 tracking-tight">Action Timeline</h3>
          <button onClick={() => setPipelineTab('todo')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'todo' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-slate-500 hover:text-[#0f172a]'}`}>
            実行中 (Do)
          </button>
          <button onClick={() => setPipelineTab('done')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'done' ? 'border-[#0d9488] text-[#0d9488]' : 'border-transparent text-slate-500 hover:text-[#0f172a]'}`}>
            完了 / 振り返り
          </button>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
          <Plus size={14} /> 追加
        </button>
      </div>

      {/* コンテンツエリア (完全移植) */}
      <div className="flex-grow p-6 bg-slate-50 flex flex-col gap-4 custom-scroll overflow-y-auto">
        
        {/* アクションカード (GASのDOM構造を完全再現) */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group/item relative">
          
          <div className="flex items-center gap-4 pr-10 ml-2">
            {/* チェックボックス (完全移植) */}
            <button className="w-5 h-5 rounded border-2 border-slate-200 flex items-center justify-center text-white hover:border-[#2563eb] hover:bg-blue-50 transition-colors z-10 group-hover/item:border-[#2563eb]">
              <Check size={12} className="opacity-0 hover:opacity-100 text-[#2563eb]" />
            </button>
            {/* タグ (完全移植) */}
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-orange-100 border border-orange-200 text-[#d97706] flex items-center gap-1 shrink-0 uppercase tracking-wider">
              <FlaskConical size={10} /> 業務探索
            </span>
            {/* タイトル (完全移植) */}
            <span className="text-[14px] font-bold text-slate-700 group-hover/item:text-[#2563eb] flex-grow truncate">トークBの検証 (架電20件)</span>
            <span className="text-[10px] font-bold text-slate-400 shrink-0">12:05 PM</span>
            <button className="text-slate-300 hover:text-slate-600 px-2"><ChevronDown size={16} /></button>
          </div>

          {/* Plan (完全移植) */}
          <div className="pl-9 mt-4">
            <div className="bg-slate-100 rounded-xl p-4 text-[12px] shadow-inner border border-slate-200/50">
              <span className="font-bold text-slate-500 block mb-1.5 tracking-tight">【Plan (目的・仮説)】</span>
              <p className="text-[#0f172a] whitespace-pre-wrap leading-relaxed">質問から入るトークで接続率10%を目指す</p>
            </div>
          </div>

          {/* PDCA進捗バー (GASの複雑なDOMをJSXに翻訳) */}
          <div className="flex items-stretch text-[11px] mt-5 ml-2 bg-slate-50 rounded-xl border border-slate-200/50 overflow-hidden shadow-inner">
            <div className="flex-1 p-3.5 border-r border-slate-200/50">
              <span className="font-bold text-slate-500 block mb-1 tracking-tight">Plan</span>
              質問から入るトークで接続率...
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3.5 border-r border-slate-200/50 bg-blue-50">
              <span className="font-bold text-[#2563eb] block mb-1 tracking-tight">Do</span>
              トークBの検証 (架電20件)
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3.5 border-r border-slate-200/50 opacity-40">
              <span className="font-bold text-[#d97706] block mb-1 tracking-tight">Check</span>未検証
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3.5 opacity-40">
              <span className="font-bold text-[#7c3aed] block mb-1 tracking-tight">Act</span>未決裁
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
