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
        // 1. profilesテーブルから、このユーザーの会社IDを取得
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single()

        if (profile) {
          // 2. 会社IDを使って、companiesテーブルから会社名を取得
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

  if (loading) return <div style={{ padding: '40px' }}>読み込み中...</div>

return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>組織OS ダッシュボード</h1>
      
      {user ? (
        <div>
          <p>✅ ログイン中: {user.email}</p>
          {company ? (
            <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '12px', border: '1px solid #0070f3' }}>
              <h2 style={{ marginTop: 0 }}>所属組織</h2>
              <p>組織名：<strong>{company.name}</strong></p>
            </div>
          ) : (
            <p>⚠️ 会社との紐付けがありません（profilesを確認してください）</p>
          )}
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ marginTop: '20px' }}>ログアウト</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid #eee' }}>
          <p>🔑 ログインが必要です</p>
          <button onClick={handleLogin} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>ログイン</button>
          <button onClick={handleSignUp} style={{ padding: '10px 20px', cursor: 'pointer' }}>新規登録</button>
        </div>
      )}
    </div>
  )
}
