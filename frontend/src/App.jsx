import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getAppTheme } from './theme';

import { AuthProvider } from './hook/AuthContext'; 
import LoginView from './pages/LoginView'; 
import { ProtectedRoute } from './hook/ProtectedRoute'; 
import ChatView from './pages/ChatView';

function App() {
  const theme = getAppTheme('dark');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<LoginView />} />

            {/* Rota Protegida (Chat) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ChatView />
              </ProtectedRoute>
            } 
          />
            {/* Redireciona qualquer rota desconhecida para o Login ou Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;