'use client' // クライアント側で動かすための魔法の言葉

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // ログイン状態をチェック
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleLogin = async () => {
    // メールアドレスでログイン（テスト用）
    const email = window.prompt('メールアドレスを入力してください')
    const password = window.prompt('パスワードを入力してください')
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert('ログイン失敗: ' + error.message)
      else window.location.reload()
    }
  }

  const handleSignUp = async () => {
    const email = window.prompt('新規登録するメールアドレスを入力してください')
    const password = window.prompt('パスワードを入力してください')
    if (email && password) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert('登録失敗: ' + error.message)
      else alert('確認メールを送信しました！メール内のリンクをクリックしてください。')
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>組織OS プロトタイプ</h1>
      {user ? (
        <div>
          <p>✅ ログイン中: {user.email}</p>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>🔑 ログインが必要です</p>
          <button onClick={handleLogin} style={{ marginRight: '10px' }}>ログイン</button>
          <button onClick={handleSignUp}>新規登録</button>
        </div>
      )}
    </div>
  )
}
