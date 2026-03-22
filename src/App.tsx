import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'commands' | 'chat' | 'analytics' | 'settings' | 'history';

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'commands', label: 'Команды', icon: 'Terminal' },
  { id: 'chat', label: 'Чат', icon: 'MessageSquare' },
  { id: 'analytics', label: 'Анализ', icon: 'BarChart3' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'history', label: 'История', icon: 'Clock' },
];

function VoiceOrb({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {active && (
        <>
          <div className="absolute w-48 h-48 rounded-full animate-pulse-ring2"
            style={{ background: 'radial-gradient(circle, rgba(162,89,255,0.15) 0%, transparent 70%)' }} />
          <div className="absolute w-40 h-40 rounded-full animate-pulse-ring"
            style={{ background: 'radial-gradient(circle, rgba(79,156,249,0.2) 0%, transparent 70%)' }} />
        </>
      )}
      <div
        className={`relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${active ? 'animate-glow-pulse' : ''}`}
        style={{
          background: active
            ? 'linear-gradient(135deg, #4f9cf9, #a259ff, #00d4ff)'
            : 'linear-gradient(135deg, rgba(79,156,249,0.3), rgba(162,89,255,0.3))',
          boxShadow: active
            ? '0 0 60px rgba(162,89,255,0.6), 0 0 30px rgba(79,156,249,0.4)'
            : '0 0 20px rgba(79,156,249,0.2)',
        }}
      >
        <Icon name="Mic" size={36} className="text-white" />
      </div>

      {active && (
        <div className="absolute flex items-end gap-1" style={{ bottom: '-20px' }}>
          {[0.3, 0.6, 1, 0.8, 0.5, 0.9, 0.4].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full animate-wave-bar"
              style={{
                height: `${h * 24}px`,
                background: 'linear-gradient(to top, #4f9cf9, #a259ff)',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HomePage() {
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
              <Icon name={f.icon as any} size={18} style={{ color: f.color }} />
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

function CommandsPage() {
  const categories = [
    {
      label: 'Системные', color: '#4f9cf9', icon: 'Monitor',
      commands: ['Открой браузер', 'Выключи компьютер', 'Сделай скриншот', 'Покажи рабочий стол'],
    },
    {
      label: 'Медиа', color: '#a259ff', icon: 'Music',
      commands: ['Воспроизведи музыку', 'Следующий трек', 'Увеличь громкость', 'Пауза'],
    },
    {
      label: 'Алгоритмы', color: '#00d4ff', icon: 'GitBranch',
      commands: ['Запусти алгоритм #1', 'Создай новый сценарий', 'Повтори последнее', 'Запланируй задачу'],
    },
    {
      label: 'Напоминания', color: '#ff6b9d', icon: 'Bell',
      commands: ['Напомни через 10 минут', 'Встреча в 15:00', 'Задача на завтра', 'Список дел'],
    },
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Команды</h2>
          <p className="text-white/40 text-sm">24 активных команды</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #4f9cf9, #a259ff)' }}>
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {categories.map((cat, ci) => (
        <div key={ci} className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${ci * 0.1}s` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${cat.color}22` }}>
              <Icon name={cat.icon as any} size={16} style={{ color: cat.color }} />
            </div>
            <span className="font-semibold text-sm text-white">{cat.label}</span>
            <span className="ml-auto text-xs text-white/30 font-mono">{cat.commands.length}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cat.commands.map((cmd, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all hover:scale-105"
                style={{ background: `${cat.color}11`, border: `1px solid ${cat.color}22` }}>
                <Icon name="Play" size={12} style={{ color: cat.color }} />
                <span className="text-xs text-white/70">{cmd}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatPage() {
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

function AnalyticsPage() {
  const stats = [
    { label: 'Команд выполнено', value: '1 247', change: '+12%', icon: 'Zap', color: '#4f9cf9' },
    { label: 'Часов работы', value: '48.5', change: '+8%', icon: 'Clock', color: '#a259ff' },
    { label: 'Точность распознавания', value: '97.3%', change: '+2.1%', icon: 'Target', color: '#00d4ff' },
    { label: 'Сохранено времени', value: '12ч 40м', change: '+5%', icon: 'TrendingUp', color: '#ff6b9d' },
  ];

  const topCommands = [
    { cmd: 'Открой браузер', count: 234, pct: 90 },
    { cmd: 'Поиск информации', count: 189, pct: 73 },
    { cmd: 'Воспроизведи музыку', count: 156, pct: 60 },
    { cmd: 'Сделай скриншот', count: 98, pct: 38 },
    { cmd: 'Запомни задачу', count: 76, pct: 29 },
  ];

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const bars = [45, 72, 38, 89, 65, 30, 55];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white">Аналитика</h2>
        <p className="text-white/40 text-sm">Статистика за последние 30 дней</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}22` }}>
                <Icon name={s.icon as any} size={18} style={{ color: s.color }} />
              </div>
              <span className="text-xs font-mono text-green-400">{s.change}</span>
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-sm font-semibold text-white mb-4">Активность по дням</p>
        <div className="flex items-end justify-between gap-2 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-md transition-all"
                style={{
                  height: `${h}%`,
                  background: i === 3 ? 'linear-gradient(to top, #4f9cf9, #a259ff)' : 'rgba(79,156,249,0.2)',
                }} />
              <span className="text-xs text-white/30">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-sm font-semibold text-white mb-4">Топ команды</p>
        <div className="space-y-3">
          {topCommands.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-white/30 font-mono w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">{c.cmd}</span>
                  <span className="text-xs text-white/40 font-mono">{c.count}</span>
                </div>
                <div className="h-1 rounded-full bg-white/5">
                  <div className="h-1 rounded-full"
                    style={{ width: `${c.pct}%`, background: 'linear-gradient(to right, #4f9cf9, #a259ff)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
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
              <Icon name={item.icon as any} size={16} style={{ color: '#4f9cf9' }} />
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
              <Icon name={item.icon as any} size={16} style={{ color: '#4f9cf9' }} />
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

function HistoryPage() {
  const dialogs = [
    { date: 'Сегодня, 10:24', preview: 'Открой браузер и найди погоду', commands: 3, duration: '2м 15с', icon: 'Globe' },
    { date: 'Сегодня, 09:10', preview: 'Создай напоминание о встрече', commands: 1, duration: '45с', icon: 'Calendar' },
    { date: 'Вчера, 18:33', preview: 'Запусти алгоритм резервного копирования', commands: 5, duration: '8м 02с', icon: 'HardDrive' },
    { date: 'Вчера, 14:20', preview: 'Воспроизведи плейлист и уменьши яркость', commands: 2, duration: '1м 30с', icon: 'Music' },
    { date: '20 марта, 11:05', preview: 'Поиск информации о Python', commands: 4, duration: '5м 44с', icon: 'Search' },
    { date: '19 марта, 20:15', preview: 'Управление умным домом', commands: 7, duration: '3м 20с', icon: 'Home' },
  ];

  return (
    <div className="p-4 space-y-3 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white">История</h2>
          <p className="text-white/40 text-sm">{dialogs.length} диалогов</p>
        </div>
        <button className="glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors">
          <Icon name="Trash2" size={13} />
          Очистить
        </button>
      </div>

      {dialogs.map((d, i) => (
        <div key={i}
          className="glass rounded-2xl p-4 flex items-start gap-3 cursor-pointer hover:scale-[1.02] transition-all duration-200 animate-fade-in"
          style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(79,156,249,0.1)' }}>
            <Icon name={d.icon as any} size={18} style={{ color: '#4f9cf9' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/80 truncate">{d.preview}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-white/30">{d.date}</span>
              <span className="text-xs text-white/30 font-mono">{d.commands} команд</span>
              <span className="text-xs text-white/30 font-mono">{d.duration}</span>
            </div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-white/20 flex-shrink-0 mt-1" />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'commands': return <CommandsPage />;
      case 'chat': return <ChatPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      case 'history': return <HistoryPage />;
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#070b14' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #4f9cf9, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a259ff, transparent)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-sm mx-auto min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20">
          {renderPage()}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4">
          <div className="glass-strong rounded-2xl px-2 py-2 flex items-center gap-1 w-full"
            style={{ maxWidth: '380px', boxShadow: '0 -4px 30px rgba(0,0,0,0.5)' }}>
            {NAV_ITEMS.map(item => {
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-200"
                  style={active ? { background: 'rgba(79,156,249,0.15)' } : {}}
                >
                  <Icon
                    name={item.icon as any}
                    size={20}
                    style={{ color: active ? '#4f9cf9' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
                  />
                  <span className="text-[10px] font-medium leading-none"
                    style={{ color: active ? '#4f9cf9' : 'rgba(255,255,255,0.3)' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
