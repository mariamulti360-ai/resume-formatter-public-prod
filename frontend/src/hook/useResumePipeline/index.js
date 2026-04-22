import { useState } from 'react';
import { apiService } from '../../services/groq';

export const useResumePipeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [vagaAnalise, setVagaAnalise] = useState(null); // Guarda o JSON da Etapa 1
  const [resultadoFinal, setResultadoFinal] = useState('');

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const processarEtapa = async (inputUsuario) => {
    setLoading(true);
    
    if (activeStep === 0) {
      // ETAPA 1: Analisar Vaga
      const response = await apiService.post('api/v1/vaga/analisar', { 
        mensagem: inputUsuario,
        historico: [] 
      });

      if (!response.error) {
        setVagaAnalise(response.data.data); // Guarda o JSON retornado
        nextStep();
      }
    } else if (activeStep === 1) {
      // ETAPA 2: Formatar Currículo
      // Aqui passamos o currículo + a análise guardada anteriormente
      const payload = {
        mensagem: `Currículo: ${inputUsuario} | Análise da Vaga: ${JSON.stringify(vagaAnalise)}`,
        historico: []
      };

      const response = await apiService.post('api/v1/curriculo/formatar', payload);

      if (!response.error) {
        setResultadoFinal(response.data.data);
        nextStep();
      }
    } else {
      console.error("Erro na formatacao", response.data);
    }
    setLoading(false);
  };

  return { activeStep, loading, vagaAnalise, resultadoFinal, processarEtapa, prevStep };
};