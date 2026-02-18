import { api } from './apiClient';

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat/', { message: message.trim() }, { auth: true });

    return {
      success: true,
      reply: response.data.reply
    };

  } catch (error) {
    console.error('Erreur chatbot:', error);
    
    return {
      success: false,
      error: error.message || 'Erreur de connexion au chatbot'
    };
  }
};