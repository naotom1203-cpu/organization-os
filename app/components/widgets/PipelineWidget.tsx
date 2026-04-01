'use client'

import { useState } from 'react'
import { Plus, Check, ChevronDown, ChevronRight, FlaskConical } from 'lucide-react'

export default function PipelineWidget() {
  const [pipelineTab, setPipelineTab] = useState('todo')

  return (
    <div className="col-span-12 bg-[#ffffff] border border-[#e2e8f0] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center px-4 border-b border-[#e2e8f0] bg-slate-50 rounded-t-xl">
        <div className="flex items-center">
          <h3 className="text-[14px] font-black text-[#0f172a] mr-6 ml-2">Action Timeline</h3>
          <button onClick={() => setPipelineTab('todo')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'todo' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'}`}>
            実行中 (Do)
          </button>
          <button onClick={() => setPipelineTab('done')} className={`py-4 px-6 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'done' ? 'border-[#0d9488] text-[#0d9488]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'}`}>
            完了 / 振り返り
          </button>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center">
          <Plus size={14} className="mr-1.5" /> 追加
        </button>
      </div>

      <div className="flex-grow p-6 bg-slate-50 flex flex-col gap-4 rounded-b-xl custom-scroll">
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative cursor-pointer">
          <div className="flex items-center gap-3 pr-8 ml-2">
            <button className="w-5 h-5 rounded border-2 border-[#e2e8f0] flex items-center justify-center text-white hover:border-[#2563eb] hover:bg-blue-50 transition-colors z-10">
              <Check size={12} className="opacity-0 hover:opacity-100 text-[#2563eb]" />
            </button>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-[#d97706] flex items-center">
              <FlaskConical size={10} className="mr-1" /> 業務 探索
            </span>
            <span className="text-[14px] font-bold text-[#0f172a] flex-grow">トークBの検証 (架電20件)</span>
            <button className="text-[#64748b] hover:text-[#0f172a] px-2"><ChevronDown size={16} /></button>
          </div>

          <div className="pl-7 mt-3">
            <div className="bg-slate-100 rounded-lg p-3 text-[12px]">
              <span className="font-bold text-[#64748b] block mb-1">【Plan (目的・仮説)】</span>
              <p className="text-[#0f172a] whitespace-pre-wrap">質問から入るトークで接続率10%を目指す</p>
            </div>
          </div>

          <div className="flex items-stretch text-[11px] mt-4 ml-2 bg-slate-50 rounded-lg border border-[#e2e8f0] overflow-hidden">
            <div className="flex-1 p-3 border-r border-[#e2e8f0]">
              <span className="font-bold text-[#64748b] block mb-1">Plan</span>
              質問から入るトークで...
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3 border-r border-[#e2e8f0]">
              <span className="font-bold text-[#2563eb] block mb-1">Do</span>
              トークBの検証 (架電20件)
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3 border-r border-[#e2e8f0] opacity-40">
              <span className="font-bold text-[#d97706] block mb-1">Check</span>未検証
            </div>
            <div className="flex-none flex items-center justify-center px-2 text-slate-300"><ChevronRight size={14} /></div>
            <div className="flex-1 p-3 opacity-40">
              <span className="font-bold text-[#7c3aed] block mb-1">Act</span>未決裁
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
