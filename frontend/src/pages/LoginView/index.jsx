import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Alert,
  CircularProgress 
} from '@mui/material';

import { useAuth } from "../../hook/AuthContext";

const LoginView = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // 2. INICIALIZAR O NAVIGATE
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 3. VALIDAR PRIMEIRO (Antes de setar loading e chamar API)
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    
    // Chama o login (que agora envia "username" para o seu FastAPI)
    const result = await login(email, password);
    
    if (result.success) {
      // 4. SE SUCESSO, NAVEGAR PARA A RAIZ (Chat)
      navigate('/');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            IA Resume
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
            Acesse sua conta para formatar currículos
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginView;