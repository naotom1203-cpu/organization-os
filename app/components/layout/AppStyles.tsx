'use client'

import Script from 'next/script'

export default function AppStyles() {
  return (
    <>
      {/* Tailwindエンジンとオリジナルカラーの設定 */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script id="tailwind-config" strategy="beforeInteractive">
        {`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  bgBase: '#f8fafc', bgPanel: '#ffffff', borderDim: '#e2e8f0', 
                  textMain: '#0f172a', textMuted: '#64748b', accentBlue: '#2563eb', 
                  alertRose: '#e11d48', goodTeal: '#0d9488', goldCore: '#d97706', orgPurple: '#7c3aed'
                }
              }
            }
          }
        `}
      </Script>

      {/* グローバルCSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
        
        body {
          font-family: 'Inter', 'Noto Sans JP', sans-serif !important;
          font-size: 13px !important;
          color: #0f172a;
          background-color: #f8fafc;
          -webkit-font-smoothing: antialiased;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }

        .glass-nav {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
        }
      `}} />
    </>
  )
}
