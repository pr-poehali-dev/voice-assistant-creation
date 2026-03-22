import Icon from '@/components/ui/icon';

export default function CommandsPage() {
  const categories = [
    {
      label: 'Броня & Системы', color: '#4f9cf9', icon: 'Shield',
      commands: ['Активировать броню', 'Режим боевой готовности', 'Диагностика систем', 'Запустить реактор'],
    },
    {
      label: 'Анализ & Сканирование', color: '#a259ff', icon: 'ScanLine',
      commands: ['Сканировать угрозы', 'Анализ противника', 'Карта местности', 'Идентифицировать цель'],
    },
    {
      label: 'Навигация & Полёт', color: '#00d4ff', icon: 'Navigation',
      commands: ['Проложить маршрут', 'Взлётный режим', 'Максимальная скорость', 'Посадка разрешена'],
    },
    {
      label: 'Коммуникация', color: '#ff6b9d', icon: 'Radio',
      commands: ['Связь с Пеппер', 'Зашифровать канал', 'Экстренный сигнал', 'Конференц-режим'],
    },
    {
      label: 'Энергия & Оружие', color: '#f59e0b', icon: 'Zap',
      commands: ['Заряд репульсоров', 'Протон-пушка готова', 'Режим экономии', 'Перегрузка систем'],
    },
    {
      label: 'Безопасность', color: '#10b981', icon: 'Lock',
      commands: ['Протокол Бастион', 'Самоуничтожение', 'Скрыть местоположение', 'Защитный купол'],
    },
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Команды</h2>
          <p className="text-white/40 text-sm">24 команды JARVIS</p>
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