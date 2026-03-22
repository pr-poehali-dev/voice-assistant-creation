import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function SettingsPage() {
  const [switches, setSwitches] = useState({
    voice: true,
    notify: true,
    autostart: false,
  });

  const toggle = (key: keyof typeof switches) =>
    setSwitches(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white">Настройки</h2>
        <p className="text-white/40 text-sm">Конфигурация ассистента</p>
      </div>

      <div className="glass rounded-2xl p-4 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)' }}>
          <Icon name="Bot" size={28} className="text-white" />
        </div>
        <div className="text-center">
          <p className="font-bold text-white">NOVA</p>
          <p className="text-xs text-white/40">Версия 1.0.0 · Бесплатный план</p>
        </div>
        <div className="flex items-center gap-1.5 glass px-3 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Активен</span>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Ассистент</span>
        </div>
        {[
          { key: 'voice' as const, label: 'Голосовое управление', desc: 'Активировать микрофон', icon: 'Mic' },
          { key: 'notify' as const, label: 'Уведомления', desc: 'Звуковые подсказки', icon: 'Bell' },
          { key: 'autostart' as const, label: 'Автозапуск', desc: 'Запускать при старте системы', icon: 'Power' },
        ].map((item, ii, arr) => (
          <div key={ii} className={`flex items-center gap-3 px-4 py-3.5 ${ii < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(79,156,249,0.1)' }}>
              <Icon name={item.icon as never} size={16} style={{ color: '#4f9cf9' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">{item.label}</p>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
            <div
              onClick={() => toggle(item.key)}
              className="w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300"
              style={{ background: switches[item.key] ? 'linear-gradient(135deg, #4f9cf9, #a259ff)' : 'rgba(255,255,255,0.1)' }}>
              <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow"
                style={{ left: switches[item.key] ? '22px' : '2px' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5">
          <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">GPT Интеграция</span>
        </div>
        {[
          { label: 'API Ключ OpenAI', desc: 'Не настроен', icon: 'Key', action: 'Добавить' },
          { label: 'Модель', desc: 'GPT-4o', icon: 'Brain', action: 'Изменить' },
        ].map((item, ii, arr) => (
          <div key={ii} className={`flex items-center gap-3 px-4 py-3.5 ${ii < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(79,156,249,0.1)' }}>
              <Icon name={item.icon as never} size={16} style={{ color: '#4f9cf9' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">{item.label}</p>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: 'rgba(79,156,249,0.15)', color: '#4f9cf9' }}>
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
