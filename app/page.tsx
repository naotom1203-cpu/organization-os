// app/page.tsx (丸ごと上書き)
'use client'

import { useState } from 'react'

// 切り分けたコンポーネントをインポート
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import PersonalBoard from './components/boards/PersonalBoard'
import ManagerBoard from './components/boards/ManagerBoard' // 追加

export default function OrganizationOS() {
  // 画面切り替えの状態管理
  const [currentBoard, setCurrentBoard] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    // bg-[#f8fafc] でNotionのメインエリア色を再現
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      
      {/* 1. 分割したサイドバーを配置 */}
      <Sidebar currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />

      {/* 2. 右側のメインコンテンツエリア */}
      <div className="flex-grow flex flex-col h-screen relative">
        
        {/* 3. 分割したヘッダーを配置 */}
        <Header isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

        {/* 4. ダッシュボードコンテンツ (ボードごとの出し分け) */}
        {/* レンダリングエンジンを overflow-hidden にして、各ボード側でスクロールさせます */}
        <main className={`flex-grow overflow-hidden relative ${isEditMode ? 'is-editing' : ''}`}>
          
          {currentBoard === 'personal' && <PersonalBoard />}
          {currentBoard === 'manager' && <ManagerBoard />}

          {/* 他のボードはまだ空白 (モック) */}
          {currentBoard !== 'personal' && currentBoard !== 'manager' && (
            <div className="p-10 text-slate-500 text-sm text-center">
              ここに {currentBoard} のコンポーネントを配置します。
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
