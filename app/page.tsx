'use client'

import { useState } from 'react'

// コンポーネントのインポート
import AppStyles from './components/layout/AppStyles' // ★新しく作ったデザイン設定
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import PersonalBoard from './components/boards/PersonalBoard'
import ManagerBoard from './components/boards/ManagerBoard'

export default function OrganizationOS() {
  const [currentBoard, setCurrentBoard] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <>
      <AppStyles /> {/* ★設定ファイルをここで1行で読み込む */}
      
      <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
        <Sidebar currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />

        <div className="flex-grow flex flex-col h-screen relative">
          <Header isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

          <main className="flex-grow overflow-y-auto custom-scroll relative">
            {currentBoard === 'personal' && <PersonalBoard />}
            {currentBoard === 'manager' && <ManagerBoard />}
            
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
