import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthContext from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextShare>
        <GoogleOAuthProvider clientId="774040131306-qe0m4uq36lsienfoo13vu036d15fr9kg.apps.googleusercontent.com">
          <AuthContext>
            <App />
          </AuthContext>
        </GoogleOAuthProvider>
      </ContextShare>
    </BrowserRouter>
  </StrictMode>,
)
