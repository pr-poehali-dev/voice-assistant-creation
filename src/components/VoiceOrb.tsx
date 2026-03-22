import Icon from '@/components/ui/icon';

interface VoiceOrbProps {
  active: boolean;
}

export default function VoiceOrb({ active }: VoiceOrbProps) {
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
