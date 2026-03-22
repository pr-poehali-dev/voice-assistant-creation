import Icon from '@/components/ui/icon';
import { Page, NAV_ITEMS } from '@/types/navigation';

interface BottomNavProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function BottomNav({ page, setPage }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4">
      <div
        className="glass-strong rounded-2xl px-2 py-2 flex items-center gap-1 w-full"
        style={{ maxWidth: '380px', boxShadow: '0 -4px 30px rgba(0,0,0,0.5)' }}
      >
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
                name={item.icon as never}
                size={20}
                style={{ color: active ? '#4f9cf9' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
              />
              <span
                className="text-[10px] font-medium leading-none"
                style={{ color: active ? '#4f9cf9' : 'rgba(255,255,255,0.3)' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
