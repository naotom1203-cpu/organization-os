import { createClient } from '@supabase/supabase-js'

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 金庫から「会社名」を1件だけ取ってくる
  const { data: companies } = await supabase.from('companies').select('*')

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>組織OS プロトタイプ</h1>
      <p>データベース接続テスト:</p>
      {companies?.map((company) => (
        <div key={company.id} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          構成会社：<strong>{company.name}</strong>
        </div>
      ))}
    </div>
  )
}
