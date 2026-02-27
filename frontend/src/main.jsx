import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter} from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <UserProvider>
          <App />
        </UserProvider>
      </ClerkProvider>
  </BrowserRouter>
)
