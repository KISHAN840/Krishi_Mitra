import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { FarmDataProvider } from './contexts/FarmDataContext'
import { InventoryProvider } from './contexts/InventoryContext' // 1. Import it

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <FarmDataProvider>
        <InventoryProvider> {/* 2. Add it here */}
          <App />
        </InventoryProvider>
      </FarmDataProvider>
    </AuthProvider>
  </React.StrictMode>,
)