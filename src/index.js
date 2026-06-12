import React from 'react'

import { Analytics } from '@vercel/analytics/react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'

if (process.env.REACT_APP_GA4_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA4_ID)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

const vitalsCallback = ({ name, value, rating }) => {
  if (process.env.NODE_ENV === 'production' && window.va) {
    window.va('event', { name: `web_vital_${name}`, value: Math.round(value), rating })
  } else if (process.env.NODE_ENV !== 'production') {
    console.debug(`[Web Vital] ${name}:`, Math.round(value), `(${rating})`)
  }
}

reportWebVitals(vitalsCallback)
