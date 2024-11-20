// ChatMessenger.tsx
import React from 'react';
import './Chat.css'; // Import CSS file

const Chat: React.FC = () => {
  return (
    <div className="echbay-sms-messenger style-for-position-br">
      {/* Messenger */}
      <div className="phonering-alo-alo">
        <a
          href="https://www.messenger.com/t/366526929875352"
          target="_blank"
          rel="nofollow"
          className="echbay-phonering-messenger-event"
        >
          .
        </a>
      </div>

      {/* Facebook Messenger */}
      <div className="phonering-alo-messenger">
        <a
          href="https://www.facebook.com/thegioisteak"
          target="_blank"
          rel="nofollow"
          className="echbay-phonering-messenger-event"
        >
          .
        </a>
      </div>

      {/* Zalo */}
      <div className="phonering-alo-zalo">
        <a
          href="https://zalo.me/0865448856"
          target="_blank"
          rel="nofollow"
          className="echbay-phonering-zalo-event"
        >
          .
        </a>
      </div>
    </div>
  );
};

export default Chat;
