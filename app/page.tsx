'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [status, setStatus] = useState('診断開始...')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function check() {
      // 1. そもそもログインしているか？
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        setStatus('❌ ログインチェックでエラー: ' + authError.message)
        return
      }
      if (!user) {
        setStatus('🔑 ログインしていません（セッション切れ）')
        return
      }

      // 2. ログインしているなら、そのIDを出す
      setStatus('✅ ログイン中！ あなたのIDは: ' + user.id)
    }
    check()
  }, [])

  return (
    <div style={{ padding: '40px', fontSize: '20px', fontWeight: 'bold' }}>
      診断結果：{status}
      <hr />
      <button onClick={() => {
        const email = window.prompt('メアド')
        const pass = window.prompt('パス')
        supabase.auth.signInWithPassword({email: email!, password: pass!})
          .then(() => window.location.reload())
      }}>
        再ログインを試す
      </button>
    </div>
  )
}
