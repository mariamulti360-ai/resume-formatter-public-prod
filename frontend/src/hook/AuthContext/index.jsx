import { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../../services/groq';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar o app, verifica se já existe um token
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      // Aqui você poderia fazer um GET /me para validar o token no backend
      setUser({ authenticated: true }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiService.post('/auth/login', { 
      username: email, 
      password: password 
    });

    if (response.error) {
      return { success: false, message: response.data.detail || 'Erro ao logar' };
    }

    // Sucesso: Salva o access_token e atualiza o estado
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    setUser({ authenticated: true });
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext);