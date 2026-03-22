import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { VoiceEngine } from '@/lib/voiceEngine';

type Message = { role: string; text: string; time: string; offline?: boolean };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Добрый день, сэр. Все системы в норме. Говорите — я вас слушаю. Работаю офлайн без подключения к сети.', time: nowTime() },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const endRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VoiceEngine | null>(null);

  function nowTime() {
    return new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
  }

  const addMessage = useCallback((msg: Message) => {
    setMessages(m => [...m, msg]);
  }, []);

  useEffect(() => {
    engineRef.current = new VoiceEngine(
      (result) => {
        addMessage({ role: 'user', text: result.text, time: nowTime() });
        setTimeout(() => {
          addMessage({ role: 'assistant', text: result.response, time: nowTime(), offline: result.isOffline });
        }, 400);
      },
      setListening,
    );

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [addMessage]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const result = engineRef.current?.processText(input);
    addMessage({ role: 'user', text: input, time: nowTime() });
    if (result) {
      setTimeout(() => {
        addMessage({ role: 'assistant', text: result.response, time: nowTime(), offline: result.isOffline });
      }, 400);
    }
    setInput('');
  };

  const toggleMic = () => {
    engineRef.current?.toggle();
  };

  const supported = engineRef.current?.isSupported() ?? true;

  return (
    <div className="flex flex-col animate-fade-in" style={{ height: 'calc(100vh - 140px)' }}>
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)' }}>
          <Icon name="Bot" size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">NOVA — JARVIS Mode</p>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
            <span className="text-xs text-white/40">{isOnline ? 'онлайн' : 'офлайн-режим'}</span>
          </div>
        </div>
        {!isOnline && (
          <div className="glass px-2 py-1 rounded-lg flex items-center gap-1">
            <Icon name="WifiOff" size={12} style={{ color: '#f59e0b' }} />
            <span className="text-xs font-mono" style={{ color: '#f59e0b' }}>OFFLINE</span>
          </div>
        )}
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
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs opacity-50">{m.time}</span>
                {m.offline && (
                  <span className="text-xs font-mono" style={{ color: '#f59e0b', opacity: 0.7 }}>офлайн</span>
                )}
              </div>
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
            placeholder="Команда JARVIS..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
          />
          {supported && (
            <button
              onClick={toggleMic}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: listening
                  ? 'linear-gradient(135deg, #ff6b9d, #a259ff)'
                  : 'linear-gradient(135deg, #4f9cf9, #a259ff)',
              }}>
              <Icon name={listening ? 'MicOff' : 'Mic'} size={14} className="text-white" />
            </button>
          )}
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
