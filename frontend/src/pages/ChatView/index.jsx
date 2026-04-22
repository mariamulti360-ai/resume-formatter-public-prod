import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  TextField, 
  IconButton, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { apiService } from "../../services/groq"; 


const ChatView = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou sua IA de currículos. Como posso ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // 1. Adiciona a mensagem do usuário na tela
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 2. Chamada ao seu FastAPI
    // Ajuste o endpoint conforme sua rota (ex: /chat ou /generate)
    const response = await apiService.post('/chat', { message: input });

    if (response.error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Erro ao processar. Tente novamente.' }]);
    } else {
      // 3. Adiciona a resposta da IA (ajuste conforme o retorno do seu JSON)
      setMessages((prev) => [...prev, { role: 'assistant', content: response.data.reply }]);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ height: '90vh', display: 'flex', flexDirection: 'column', py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        AI Resume Assistant
      </Typography>

      {/* Área do Histórico */}
      <Paper elevation={2} sx={{ flex: 1, mb: 2, p: 2, overflowY: 'auto', bgcolor: 'background.default' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper 
                sx={{ 
                  p: 1.5, 
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                  color: msg.role === 'user' ? 'white' : 'text.primary',
                  maxWidth: '80%',
                  borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0'
                }}
              >
                <ListItemText primary={msg.content} />
              </Paper>
            </ListItem>
          ))}
          {loading && <CircularProgress size={20} sx={{ m: 2 }} />}
        </List>
      </Paper>

      {/* Input */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend} 
          disabled={loading}
          sx={{ 
            background: 'linear-gradient(45deg, #f09433, #bc1888)', 
            color: 'white',
            '&:hover': { opacity: 0.9 } 
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default ChatView;