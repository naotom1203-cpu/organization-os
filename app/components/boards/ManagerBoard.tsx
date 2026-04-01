'use client'

export default function ManagerBoard() {
  return (
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1400px] mx-auto p-6 lg:p-8">
      <div className="col-span-12 flex justify-between items-center px-2 mb-2">
        <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">管理職ボード</h2>
      </div>
      <div className="col-span-12 p-10 border border-[#e2e8f0] bg-white rounded-xl text-[#64748b] text-center shadow-sm">
        ここにメンバーリストや1on1管理のコンポーネントを配置します。
      </div>
    </div>
  )
}
