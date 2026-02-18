import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { sendMessage } from '../../services/chatbotApi';
import { Bot, AlertCircle } from 'lucide-react';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll vers le bas quand nouveaux messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message de bienvenue au chargement
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Bonjour ! Je suis votre assistant Red Product. Posez-moi des questions sur vos hôtels, statistiques ou toute autre information.',
        created_at: new Date().toISOString()
      }
    ]);
  }, []);

  const handleSendMessage = async (messageText) => {
    setError(null);

    // Ajouter le message de l'utilisateur
    const userMessage = {
      role: 'user',
      content: messageText,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Appeler l'API
    const result = await sendMessage(messageText);

    setIsLoading(false);

    if (result.success) {
      // Ajouter la réponse de l'assistant
      const assistantMessage = {
        role: 'assistant',
        content: result.reply,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      // Afficher l'erreur
      setError(result.error);
      
      // Message d'erreur de l'assistant
      const errorMessage = {
        role: 'assistant',
        content: `Désolé, une erreur est survenue : ${result.error}`,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Assistant Red Product</h2>
            <p className="text-sm text-gray-500">
              {isLoading ? 'En train d\'écrire...' : 'En ligne'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages zone */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isUser={msg.role === 'user'}
          />
        ))}

        {/* Indicateur de typing */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Erreur</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input zone */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatbotInterface;