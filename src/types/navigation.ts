export type Page = 'home' | 'commands' | 'chat' | 'analytics' | 'settings' | 'history';

export const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'commands', label: 'Команды', icon: 'Terminal' },
  { id: 'chat', label: 'Чат', icon: 'MessageSquare' },
  { id: 'analytics', label: 'Анализ', icon: 'BarChart3' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'history', label: 'История', icon: 'Clock' },
];
