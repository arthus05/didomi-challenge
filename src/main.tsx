import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { worker } from './mocks/browser'
import App from './App.tsx'

import './index.css'

worker.start({ onUnhandledRequest: 'bypass' }).then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  ),
)
