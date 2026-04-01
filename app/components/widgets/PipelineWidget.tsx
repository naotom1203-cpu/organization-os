'use client'

import { useState } from 'react'
import { Plus, Check, MoreHorizontal, FlaskConical } from 'lucide-react'

export default function PipelineWidget() {
  const [pipelineTab, setPipelineTab] = useState('todo')

  return (
    <div className="col-span-12 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col min-h-[400px]">
      
      {/* ヘッダータブ */}
      <div className="flex justify-between items-center px-6 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-center gap-6">
          <h3 className="text-[14px] font-black text-[#0f172a]">Action Timeline</h3>
          <div className="flex gap-4">
            <button onClick={() => setPipelineTab('todo')} className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'todo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-[#0f172a]'}`}>
              実行中 (Do)
            </button>
            <button onClick={() => setPipelineTab('done')} className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${pipelineTab === 'done' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-[#0f172a]'}`}>
              完了 / 振り返り
            </button>
          </div>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
          <Plus size={14} /> 追加
        </button>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-grow p-6 bg-slate-50/30 flex flex-col gap-4 overflow-y-auto custom-scroll">
        
        {/* PDCAアクションカード */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative group">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-50 border border-orange-100 text-orange-600 flex items-center gap-1">
                <FlaskConical size={12} /> 業務探索
              </span>
              <h4 className="text-[14px] font-bold text-[#0f172a]">トークBの検証 (架電20件)</h4>
            </div>
            <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="mt-3 bg-slate-50 p-3 rounded-md border border-slate-100">
            <p className="text-[12px] text-slate-600 font-medium"><span className="font-bold text-slate-400 mr-2">Plan</span>質問から入るトークで接続率10%を目指す</p>
          </div>

          {/* 視覚的なPDCAステッパー */}
          <div className="mt-6 px-2 relative">
            {/* 背景の繋ぎ線 */}
            <div className="absolute left-6 right-6 top-3 h-[2px] bg-slate-100 -z-10"></div>
            {/* 進行状況の線 (Doまで青く塗る) */}
            <div className="absolute left-6 w-1/3 top-3 h-[2px] bg-blue-500 -z-10 transition-all"></div>

            <div className="flex justify-between">
              {/* Step 1: Plan (完了済) */}
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-bold text-slate-500">Plan</span>
              </div>

              {/* Step 2: Do (現在位置) */}
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-[10px] font-bold text-blue-600">Do</span>
              </div>

              {/* Step 3: Check (未完了) */}
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400">3</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Check</span>
              </div>

              {/* Step 4: Act (未完了) */}
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-6 h-6 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400">4</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Act</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
