import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import VoiceOrb from '@/components/VoiceOrb';
import { VoiceEngine } from '@/lib/voiceEngine';

export default function HomePage() {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState('Готов к работе, сэр');
  const [lastResponse, setLastResponse] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const engineRef = useRef<VoiceEngine | null>(null);

  const handleResult = useCallback((result: { text: string; response: string }) => {
    setStatus(`"${result.text}"`);
    setLastResponse(result.response);
    setTimeout(() => setStatus('Готов к работе, сэр'), 5000);
  }, []);

  useEffect(() => {
    engineRef.current = new VoiceEngine(handleResult, setListening);
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [handleResult]);

  const toggle = () => {
    engineRef.current?.toggle();
  };

  const features = [
    { icon: 'Wifi', title: isOnline ? 'Онлайн' : 'Офлайн', desc: isOnline ? 'GPT доступен' : 'Локальный режим', color: isOnline ? '#10b981' : '#f59e0b' },
    { icon: 'Brain', title: 'JARVIS команды', desc: '20+ команд без сети', color: '#a259ff' },
    { icon: 'Volume2', title: 'Голосовые ответы', desc: 'Синтез речи на устройстве', color: '#00d4ff' },
    { icon: 'Cpu', title: 'Web Speech API', desc: 'Распознавание офлайн', color: '#ff6b9d' },
  ];

  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="relative w-full flex flex-col items-center pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a259ff 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-3 glass px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`} />
            <span className="text-sm text-white/60 font-mono">
              NOVA v1.0 · {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <h1 className="text-5xl font-black text-center leading-tight">
            <span className="shimmer-text">Голосовой</span>
            <br />
            <span className="text-white">Ассистент</span>
          </h1>
          <p className="text-white/40 text-center max-w-md text-sm leading-relaxed px-4">
            Работает без интернета — голос, команды и ответы
            полностью на вашем устройстве
          </p>

          <div className="my-6 animate-float" onClick={toggle}>
            <VoiceOrb active={listening} />
          </div>

          <div className="glass px-6 py-2 rounded-full max-w-xs text-center">
            <span className="text-sm font-mono" style={{ color: listening ? '#00d4ff' : '#4f9cf9' }}>
              {listening ? 'Слушаю...' : status}
            </span>
          </div>

          {lastResponse && !listening && (
            <div className="glass px-4 py-3 rounded-2xl max-w-xs text-center animate-fade-in"
              style={{ border: '1px solid rgba(162,89,255,0.2)' }}>
              <span className="text-xs text-white/60 italic leading-relaxed">{lastResponse}</span>
            </div>
          )}

          <button
            onClick={toggle}
            className="mt-2 px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 text-white"
            style={{
              background: listening
                ? 'linear-gradient(135deg, #ff6b9d, #a259ff)'
                : 'linear-gradient(135deg, #4f9cf9, #a259ff)',
              boxShadow: '0 8px 30px rgba(79,156,249,0.3)',
            }}
          >
            <span className="flex items-center gap-2">
              <Icon name={listening ? 'MicOff' : 'Mic'} size={16} />
              {listening ? 'Остановить' : 'Начать слушать'}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xl px-4 pb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-4 flex flex-col gap-2 animate-fade-in hover:scale-105 transition-transform duration-300 cursor-default"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${f.color}22` }}>
              <Icon name={f.icon as never} size={18} style={{ color: f.color }} />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">{f.title}</p>
              <p className="text-xs text-white/40 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
