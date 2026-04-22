import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

const StepContent = ({ activeStep, onSendMessage, loading, resultadoFinal }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSendMessage(text);
    setText('');
  };

  if (activeStep === 2) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          bgcolor: '#fdfdfd', // Um cinza quase branco para dar profundidade
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          maxHeight: '60vh',
          overflowY: 'auto'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ color: '#1a1a1a', mb: 2, fontWeight: 'bold', borderBottom: '2px solid #bc1888', pb: 1 }}
        >
          Currículo Otimizado
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-wrap', 
            color: '#2c3e50', // Azul escuro acinzentado (ótimo contraste)
            fontFamily: '"Roboto Mono", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6
          }}
        >
          {resultadoFinal}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {activeStep === 0 ? "Cole a descrição da Vaga" : "Agora, cole seu Currículo atual"}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        placeholder="Cole o texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <Button 
        variant="contained" 
        onClick={handleSubmit} 
        disabled={loading || !text}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Próximo Passo"}
      </Button>
    </Box>
  );
};

export default StepContent;