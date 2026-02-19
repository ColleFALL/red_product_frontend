import { api } from './apiClient';

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/api/chatbot/chat/', { message: message.trim() }, { auth: true });
console.log('Response complète:', response);
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

export const getHistory = async () => {
  try {
    const response = await api.get('/api/chatbot/history/', { auth: true });
    return { success: true, messages: response.data.messages };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const clearConversation = async () => {
  try {
    const response = await api.delete('/api/chatbot/clear/', { auth: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};