import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Technology Made Simple for Seniors'
  const category = searchParams.get('category') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1e3a5f',
          padding: '60px',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '6px',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                color: '#93c5fd',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 48 : 56,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 700,
              }}
            >
              T
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '28px', fontWeight: 600 }}>
              TechFor60s
            </div>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '18px' }}>
            techfor60s.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
