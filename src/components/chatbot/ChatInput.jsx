import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage(''); // Vider l'input après envoi
    }
  };

  const handleKeyDown = (e) => {
    // Envoyer avec Ctrl+Enter ou Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-3">
        {/* Zone de texte */}
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur vos hôtels..."
            disabled={isLoading}
            rows={1}
            className="
              w-full px-4 py-3 
              border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              resize-none
              disabled:bg-gray-50 disabled:cursor-not-allowed
              transition-all
            "
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <p className="text-xs text-gray-400 mt-1 ml-1">
            Appuyez sur Ctrl+Entrée pour envoyer
          </p>
        </div>

        {/* Bouton envoyer */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="
            p-3 rounded-xl
            bg-blue-600 hover:bg-blue-700
            text-white
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center
            shadow-md hover:shadow-lg
          "
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;