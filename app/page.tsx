'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState<any>(null)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    async function load() {
      // 門番がいないので、直接 companies を取りに行く
      const { data: companies } = await supabase.from('companies').select('*')
      if (companies && companies.length > 0) {
        setData(companies[0])
      }
    }
    load()
  }, [])

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>組織OS プロトタイプ</h1>
      {data ? (
        <div style={{ padding: '20px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '10px' }}>
          <p style={{ fontSize: '1.5rem' }}>所属組織：<strong>{data.name}</strong></p>
          <p>通信状況：✅ 接続成功</p>
        </div>
      ) : (
        <p>📡 データを取得しています...</p>
      )}
    </div>
  )
}
