'use client'

import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import PersonalBoard from './components/boards/PersonalBoard'
import ManagerBoard from './components/boards/ManagerBoard'

// GAS風のデザインを適用するためのCSSを直接埋め込む
const AppStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
    
    body {
      font-family: 'Inter', 'Noto Sans JP', sans-serif !important;
      font-size: 13px !important;
      color: #0f172a;
      background-color: #f8fafc;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
    }

    .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
    .custom-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
    .custom-scroll::-webkit-scrollbar-track { background: transparent; }

    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
    }
  `}} />
)

export default function OrganizationOS() {
  const [currentBoard, setCurrentBoard] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <>
      <AppStyles />
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        
        {/* サイドバー */}
        <Sidebar currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />

        {/* メインエリア */}
        <div className="flex-grow flex flex-col h-screen relative">
          
          {/* ヘッダー */}
          <Header isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

          {/* コンテンツエリア (スクロールはここで制御) */}
          <main className="flex-grow overflow-y-auto custom-scroll relative">
            
            {currentBoard === 'personal' && <PersonalBoard />}
            {currentBoard === 'manager' && <ManagerBoard />}
            
            {/* その他のボードのモック */}
            {currentBoard !== 'personal' && currentBoard !== 'manager' && (
              <div className="p-10 text-center text-[#64748b]">
                ここに {currentBoard} の画面が入ります。
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  )
}
