export default function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #4f9cf9, transparent)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #a259ff, transparent)', filter: 'blur(60px)' }}
      />
    </div>
  );
}
