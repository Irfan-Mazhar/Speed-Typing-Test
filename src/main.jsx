import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WordProvider } from './contexts/WordContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <WordProvider>

  
    <App />
  
  </WordProvider>
)
