import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './context'
import { AppRouter } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
