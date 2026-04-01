'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    async function loadData() {
      // 1. 今ログインしているのは誰か確認
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // 2. その人のプロフィールから会社IDを取得
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single()

        if (profile) {
          // 3. その会社IDを使って会社名を取得
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

  if (loading) return <div style={{ padding: '40px' }}>🔐 セキュリティチェック中...</div>

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>組織OS ダッシュボード</h1>
      {company ? (
        <div style={{ padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '12px', border: '1px solid #0070f3' }}>
          <p>✅ セキュリティ認証済み</p>
          <p style={{ fontSize: '1.5rem' }}>所属組織：<strong>{company.name}</strong></p>
        </div>
      ) : (
        <p>🔑 ログインして、プロフィールの紐付けを確認してください。</p>
      )}
    </div>
  )
}
