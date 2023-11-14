import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TipCalculatorProvider from './store/TipCalculateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TipCalculatorProvider>
    <App />
  </TipCalculatorProvider>,
)
