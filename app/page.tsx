'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function load() {
      // 1. ユーザー情報を取得
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // 2. profiles（名簿）を直接読みに行く
        const { data: profiles, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)

        if (pError) {
          setErrorMsg('名簿の読み込みに失敗：' + pError.message)
          return
        }

        if (profiles && profiles.length > 0) {
          // 3. 会社情報を読みに行く
          const { data: companyData, error: cError } = await supabase
            .from('companies')
            .select('*')
            .eq('id', profiles[0].company_id)
            .single()

          if (cError) {
            setErrorMsg('会社情報の読み込みに失敗：' + cError.message)
          } else {
            setCompany(companyData)
          }
        } else {
          setErrorMsg('名簿にあなたのIDが見つかりません。SupabaseでSaveを押したか確認してください。')
        }
      }
    }
    load()
  }, [])

  if (user && company) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f0f7ff', height: '100vh' }}>
        <h1 style={{ color: '#0070f3' }}>組織OS 起動完了</h1>
        <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#666' }}>ログイン：{user.email}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            所属：<span style={{ color: '#0070f3' }}>{company.name}</span>
          </p>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} style={{ marginTop: '20px' }}>ログアウト</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>読み込み中...</h1>
      {errorMsg && <p style={{ color: 'red', padding: '20px', border: '1px solid red' }}>{errorMsg}</p>}
      <p>ID: {user?.id || '取得中'}</p>
      <button onClick={() => window.location.reload()}>再試行（リロード）</button>
    </div>
  )
}
