import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './contexts/ContextAPI.jsx'
import AuthContext from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <ContextAPI>
        <BrowserRouter>
         <App />
        </BrowserRouter>
      </ContextAPI>
    </AuthContext>
  </React.StrictMode>,
)
