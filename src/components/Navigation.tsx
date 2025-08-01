import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/chat", label: "Chat" },
    { path: "/verses", label: "Verses" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="divine-card p-4 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 enlightenment-glow rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/22626a1e-0548-4eb8-90fd-1a90afb3e3d8.png" 
              alt="Devverse AI" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h1 className="text-2xl font-spiritual font-bold text-primary">
            Devverse AI
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button className="btn-peace">Menu</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;