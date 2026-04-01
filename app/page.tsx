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
      // 1. ログイン状態の確認
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // 2. 名簿（profiles）から会社IDを取得
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single()

        if (profile) {
          // 3. 会社情報を取得（ここがRLSで守られている！）
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
    const email = window.prompt('メールアドレス')
    const password = window.prompt('パスワード')
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert('ログイン失敗: ' + error.message)
      else window.location.reload()
    }
  }

  if (loading) return <div style={{ padding: '40px' }}>🔐 セキュリティ確認中...</div>

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>組織OS ダッシュボード</h1>

      {user ? (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#666' }}>✅ ログイン：{user.email}</p>
          
          {company ? (
            <div style={{ padding: '30px', backgroundColor: '#f0f7ff', borderRadius: '15px', border: '2px solid #0070f3', marginTop: '20px' }}>
              <h2 style={{ color: '#0070f3', marginTop: 0 }}>認証成功</h2>
              <p style={{ fontSize: '1.4rem' }}>ビルド中の組織：<strong>{company.name}</strong></p>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '10px', marginTop: '20px' }}>
              <p>⚠️ 会社との紐付けがまだ有効ではありません。</p>
              <p>Supabaseの profiles にデータがあるか確認してください。</p>
            </div>
          )}
          
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer' }}>
            ログアウト
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '40px', padding: '40px', border: '1px solid #eee', borderRadius: '20px' }}>
          <p>🔑 セキュリティ保護されたエリアです</p>
          <button onClick={handleLogin} style={{ padding: '15px 30px', fontSize: '1.1rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ログインして開始
          </button>
        </div>
      )}
    </div>
  )
}
