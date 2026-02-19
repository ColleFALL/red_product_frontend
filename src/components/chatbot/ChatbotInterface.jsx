import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { sendMessage, getHistory, clearConversation } from '../../services/chatbotApi';
import { Bot, AlertCircle, Trash2 } from 'lucide-react';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Charger l'historique au démarrage
  useEffect(() => {
    const loadHistory = async () => {
      const result = await getHistory();
      if (result.success && result.messages.length > 0) {
        setMessages(result.messages);
      } else {
        setMessages([
          {
            role: 'assistant',
            content: 'Bonjour ! Je suis votre assistant Red Product. Posez-moi des questions sur vos hôtels, statistiques ou toute autre information.',
            created_at: new Date().toISOString()
          }
        ]);
      }
    };
    loadHistory();
  }, []);

  // Supprimer la conversation
  const handleClear = async () => {
    const result = await clearConversation();
    if (result.success) {
      setMessages([
        {
          role: 'assistant',
          content: 'Bonjour ! Je suis votre assistant Red Product. Posez-moi des questions sur vos hôtels, statistiques ou toute autre information.',
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  const handleSendMessage = async (messageText) => {
    setError(null);

    const userMessage = {
      role: 'user',
      content: messageText,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const result = await sendMessage(messageText);
    setIsLoading(false);

    if (result.success) {
      const assistantMessage = {
        role: 'assistant',
        content: result.reply,
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      setError(result.error);
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
        <div className="flex items-center justify-between">
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
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
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