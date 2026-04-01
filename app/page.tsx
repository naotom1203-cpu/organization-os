'use client'

import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkEverything() {
      const { data: { user } } = await supabase.auth.getUser()
      const info: any = { userEmail: user?.email, userId: user?.id }

      if (user) {
        // プロフィール取得テスト
        const { data: profile, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
        
        info.profileData = profile
        info.profileError = pError?.message

        if (profile && profile.length > 0) {
          const companyId = profile[0].company_id
          info.targetCompanyId = companyId

          // 会社取得テスト
          const { data: company, error: cError } = await supabase
            .from('companies')
            .select('*')
            .eq('id', companyId)
          
          info.companyData = company
          info.companyError = cError?.message
        }
      }
      setDebugInfo(info)
      setLoading(false)
    }
    checkEverything()
  }, [])

  if (loading) return <div style={{ padding: '40px' }}>診断中...</div>

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px', backgroundColor: '#eee' }}>
      <h1>🛠 最終診断モード</h1>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      <hr />
      <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>ログアウトしてやり直す</button>
    </div>
  )
}
