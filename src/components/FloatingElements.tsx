const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Om Symbols */}
      <div className="absolute top-20 left-10 text-primary/10 text-6xl animate-float-gentle">
        🕉️
      </div>
      <div className="absolute top-1/3 right-20 text-primary/10 text-4xl animate-float-petals">
        🪔
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-primary/10 text-5xl animate-float-gentle" style={{ animationDelay: '2s' }}>
        🕉️
      </div>
      
      {/* Lotus Petals */}
      <div className="absolute top-1/2 right-10 w-8 h-8 rounded-full bg-primary/10 animate-float-petals" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 left-16 w-6 h-6 rounded-full bg-primary/10 animate-float-gentle" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/4 left-1/2 w-4 h-4 rounded-full bg-primary/10 animate-float-petals" style={{ animationDelay: '4s' }}></div>
      
      {/* Mandala Circles */}
      <div className="absolute bottom-32 right-1/3 w-16 h-16 border border-primary/5 rounded-full animate-om-spin"></div>
      <div className="absolute top-40 left-1/3 w-12 h-12 border border-primary/5 rounded-full animate-om-spin" style={{ animationDirection: 'reverse' }}></div>
    </div>
  );
};

export default FloatingElements;