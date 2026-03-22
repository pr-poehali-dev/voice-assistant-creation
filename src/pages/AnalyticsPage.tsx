import Icon from '@/components/ui/icon';

export default function AnalyticsPage() {
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
                <Icon name={s.icon as never} size={18} style={{ color: s.color }} />
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
