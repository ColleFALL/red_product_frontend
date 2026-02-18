import React from 'react';
import ChatbotInterface from '../../components/chatbot/ChatbotInterface';

const ChatbotPage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header de la page */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Assistant IA</h1>
        <p className="text-sm text-gray-600 mt-1">
          Posez vos questions sur la gestion de vos hôtels
        </p>
      </div>

      {/* Interface chatbot */}
      <div className="flex-1">
        <ChatbotInterface />
      </div>
    </div>
  );
};

export default ChatbotPage;  // ✅ Vérifie que cette ligne est bien là