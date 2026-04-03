'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preconnect('https://fonts.googleapis.com')
  ReactDOM.preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' })
  ReactDOM.preconnect('https://www.googletagmanager.com')

  return null
}
