import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DiciBot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      // Hier könnte die Logik für die Bot-Antwort implementiert werden.
      // Fürs Erste simulieren wir eine einfache Antwort.
      setTimeout(() => {
        setChatLog((prev) => [...prev, { sender: 'bot', text: t('dicibot.greeting') + ' ' + t('dicibot.placeholder') }]);
      }, 500);
      setMessage('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '300px',
      zIndex: 1000,
    }}>
      <div
        onClick={toggleChat}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '10px 10px 0 0',
          textAlign: 'center',
        }}
      >
        {t('dicibot.greeting')}
      </div>

      {isOpen && (
        <div style={{ padding: '10px' }}>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '5px', marginBottom: '10px' }}>
            {chatLog.map((msg, index) => (
              <p key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                <strong>{msg.sender === 'user' ? 'You' : 'DiciBot'}:</strong> {msg.text}
              </p>
            ))}
            {chatLog.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888' }}>
                    {t('dicibot.greeting')} {t('dicibot.placeholder')}
                </p>
            )}
          </div>
          <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('dicibot.placeholder')}
              style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiciBot;
