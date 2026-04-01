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
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1>組織OS ダッシュボード</h1>
        {user ? (
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            ログイン：{user.email} 
            <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ marginLeft: '10px' }}>ログアウト</button>
          </div>
        ) : (
          <p>🔑 ログインしてください</p>
        )}
      </header>

      <main>
        {user && company ? (
          <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '12px', border: '1px solid #0070f3' }}>
            <h2 style={{ marginTop: 0, color: '#0070f3' }}>所属組織の情報</h2>
            <p style={{ fontSize: '1.2rem' }}>
              ビルド中の組織名：<strong>{company.name}</strong>
            </p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>組織ID: {company.id}</p>
          </div>
        ) : user ? (
          <div style={{ padding: '20px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '8px' }}>
            <p>⚠️ 会社との紐付けが見つかりません。</p>
            <p style={{ fontSize: '0.9rem' }}>Supabaseの `profiles` テーブルにあなたのUIDと会社IDが登録されているか確認してください。</p>
          </div>
        ) : (
          <p>ログインボタンからシステムを開始してください。</p>
        )}
      </main>
    </div>
  )
}
