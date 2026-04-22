import React from 'react';
import { 
  Container, 
  Typography, 
  Box 
} from '@mui/material';

// Importando os novos componentes e o Hook
import StepperHeader from '../../components/StepperHeader';
import StepContent from '../../components/StepContent';
import { useResumePipeline } from '../../hook/useResumePipeline';

const ChatView = () => {
  // Puxamos toda a inteligência do nosso Hook maestro
  const { 
    activeStep, 
    loading, 
    resultadoFinal, 
    processarEtapa 
  } = useResumePipeline();

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        height: '90vh', 
        display: 'flex', 
        flexDirection: 'column', 
        py: 3 
      }}
    >
      {/* Título fixo da página */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        AI Resume Assistant
      </Typography>

      {/* 1. O Cabeçalho de Progresso (Stepper) */}
      <StepperHeader activeStep={activeStep} />

      {/* 2. O Conteúdo Dinâmico (Muda conforme o passo) */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StepContent 
          activeStep={activeStep} 
          onSendMessage={processarEtapa} 
          loading={loading}
          resultadoFinal={resultadoFinal}
        />
      </Box>

      {/* Rodapé informativo discreto */}
      <Typography variant="caption" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
        Siga os passos acima para gerar seu currículo otimizado.
      </Typography>
    </Container>
  );
};

export default ChatView;