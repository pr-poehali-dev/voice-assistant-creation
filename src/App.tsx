import { useState } from 'react';
import { Page } from '@/types/navigation';
import AppBackground from '@/components/AppBackground';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import CommandsPage from '@/pages/CommandsPage';
import ChatPage from '@/pages/ChatPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import SettingsPage from '@/pages/SettingsPage';
import HistoryPage from '@/pages/HistoryPage';

function renderPage(page: Page) {
  switch (page) {
    case 'home': return <HomePage />;
    case 'commands': return <CommandsPage />;
    case 'chat': return <ChatPage />;
    case 'analytics': return <AnalyticsPage />;
    case 'settings': return <SettingsPage />;
    case 'history': return <HistoryPage />;
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#070b14' }}>
      <AppBackground />

      <div className="relative z-10 max-w-sm mx-auto min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20">
          {renderPage(page)}
        </div>

        <BottomNav page={page} setPage={setPage} />
      </div>
    </div>
  );
}
