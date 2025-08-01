import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Floating Om Symbol */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-primary/20 text-8xl animate-om-spin">
        🕉️
      </div>
      
      <div className="divine-card p-12 text-center max-w-md mx-4 relative z-10">
        <div className="text-6xl mb-6 animate-float-gentle">🚪</div>
        
        <h1 className="text-4xl font-spiritual font-bold text-primary mb-4">
          Path Not Found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          "This path does not exist. <br />
          Try asking the Gita instead."
        </p>
        
        <div className="spiritual-divider mb-6"></div>
        
        <div className="space-y-3">
          <Link 
            to="/" 
            className="btn-spiritual w-full block"
          >
            Return to Wisdom
          </Link>
          
          <Link 
            to="/chat" 
            className="btn-peace w-full block"
          >
            Ask for Guidance
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground italic">
          "When lost, turn inward and seek the eternal truth within."
        </div>
      </div>
    </div>
  );
};

export default NotFound;