import { useState } from 'react';
import Icon from '@/components/ui/icon';
import VoiceOrb from '@/components/VoiceOrb';

export default function HomePage() {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState('Готов к работе');

  const toggle = () => {
    const next = !listening;
    setListening(next);
    setStatus(next ? 'Слушаю...' : 'Готов к работе');
  };

  const features = [
    { icon: 'Zap', title: 'Мгновенный отклик', desc: 'Обработка голоса за <200мс', color: '#4f9cf9' },
    { icon: 'Brain', title: 'GPT-интеллект', desc: 'Понимает контекст разговора', color: '#a259ff' },
    { icon: 'Shield', title: 'Приватность', desc: 'Данные хранятся локально', color: '#00d4ff' },
    { icon: 'Cpu', title: 'Системные команды', desc: 'Управление ПК голосом', color: '#ff6b9d' },
  ];

  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="relative w-full flex flex-col items-center pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a259ff 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-3 glass px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/60 font-mono">NOVA v1.0</span>
          </div>

          <h1 className="text-5xl font-black text-center leading-tight">
            <span className="shimmer-text">Голосовой</span>
            <br />
            <span className="text-white">Ассистент</span>
          </h1>
          <p className="text-white/40 text-center max-w-md text-sm leading-relaxed px-4">
            Управляй компьютером, создавай алгоритмы и получай умные ответы
            силой своего голоса
          </p>

          <div className="my-6 animate-float" onClick={toggle}>
            <VoiceOrb active={listening} />
          </div>

          <div className="glass px-6 py-2 rounded-full">
            <span className="text-sm font-mono" style={{ color: listening ? '#00d4ff' : '#4f9cf9' }}>
              {status}
            </span>
          </div>

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
            {listening ? 'Остановить' : 'Начать слушать'}
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
