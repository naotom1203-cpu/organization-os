'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single()

        if (profile) {
          const { data: companyData } = await supabase
            .from('companies')
            .select('*')
            .eq('id', profile.company_id)
            .single()
          setCompany(companyData)
        }
      }
      setLoading(false)
    }
    loadData()
  }, [])

  // ログイン処理
  const handleLogin = async () => {
    const email = window.prompt('メールアドレスを入力してください')
    const password = window.prompt('パスワードを入力してください')
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert('ログイン失敗: ' + error.message)
      else window.location.reload()
    }
  }

  // 新規登録処理
  const handleSignUp = async () => {
    const email = window.prompt('新規登録するメールアドレスを入力してください')
    const password = window.prompt('パスワードを入力してください')
    if (email && password) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert('登録失敗: ' + error.message)
      else alert('確認メールを送信しました！メール内のリンクをクリックしてください。')
    }
  }

  if (loading) return <div style={{ padding: '40px' }}>読み込み中...</div>

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>組織OS ダッシュボード</h1>
      
      {user ? (
        <div>
          <p style={{ color: '#666' }}>✅ ログイン中: {user.email}</p>
          {company ? (
            <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '12px', border: '1px solid #0070f3' }}>
              <h2 style={{ marginTop: 0, color: '#0070f3' }}>所属組織の情報</h2>
              <p style={{ fontSize: '1.2rem' }}>
                ビルド中の組織名：<strong>{company.name}</strong>
              </p>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '8px' }}>
              <p>⚠️ 会社との紐付けが見つかりません。</p>
              <p style={{ fontSize: '0.8rem' }}>Supabaseの profiles テーブルを確認してください。</p>
            </div>
          )}
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>ログアウト</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid #eee', borderRadius: '12px' }}>
          <p>🔑 ログインが必要です</p>
          <button onClick={handleLogin} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>ログイン</button>
          <button onClick={handleSignUp} style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>新規登録</button>
        </div>
      )}
    </div>
  )
}
