import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Привет! Я NOVA — твой интеллектуальный ассистент. Чем могу помочь?', time: '10:24' },
    { role: 'user', text: 'Открой браузер и найди прогноз погоды', time: '10:25' },
    { role: 'assistant', text: 'Выполняю команду: открываю браузер и ищу прогноз погоды для твоего местоположения. Готово! Браузер открыт на странице погоды.', time: '10:25' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
    setMessages(m => [...m,
      { role: 'user', text: input, time },
      { role: 'assistant', text: 'Обрабатываю запрос... Для полноценной работы подключите API-ключ GPT в настройках.', time },
    ]);
    setInput('');
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex flex-col animate-fade-in" style={{ height: 'calc(100vh - 140px)' }}>
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)' }}>
          <Icon name="Bot" size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">NOVA Assistant</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/40">онлайн</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={m.role === 'user'
                ? { background: 'linear-gradient(135deg, #4f9cf9, #a259ff)', color: '#fff', borderBottomRightRadius: '4px' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', borderBottomLeftRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }
              }>
              {m.text}
              <div className="text-xs mt-1 opacity-50">{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <div className="flex-1 flex items-center gap-2 glass rounded-2xl px-4 py-2.5">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Напиши команду или вопрос..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
          />
          <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)' }}>
            <Icon name="Mic" size={14} className="text-white" />
          </button>
        </div>
        <button onClick={send}
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-110 text-white"
          style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)', boxShadow: '0 4px 20px rgba(79,156,249,0.4)' }}>
          <Icon name="Send" size={18} />
        </button>
      </div>
    </div>
  );
}
