import { createClient } from '@supabase/supabase-js'

export default async function Home() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(url!, key!)

  // 接続テスト：エラーがあれば詳細を表示する
  const { data, error } = await supabase.from('companies').select('*')

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>接続診断モード</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
        <p>📡 <strong>Vercelの設定状況:</strong></p>
        <p>URL設定: {url ? '✅ 設定あり' : '❌ 未設定'}</p>
        <p>Key設定: {key ? '✅ 設定あり' : '❌ 未設定'}</p>
      </div>

      <div style={{ padding: '10px', backgroundColor: error ? '#fff1f0' : '#f6ffed', border: '1px solid' }}>
        <p>🔍 <strong>Supabase通信結果:</strong></p>
        {error ? (
          <div style={{ color: 'red' }}>
            <p>エラー発生：{error.message}</p>
            <p>ヒント：{error.hint || 'なし'}</p>
            <p>コード：{error.code}</p>
          </div>
        ) : (
          <div style={{ color: 'green' }}>
            <p>通信成功！データが {data?.length} 件見つかりました。</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
