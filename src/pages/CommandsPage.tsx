import Icon from '@/components/ui/icon';

export default function CommandsPage() {
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
              <Icon name={cat.icon as never} size={16} style={{ color: cat.color }} />
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
