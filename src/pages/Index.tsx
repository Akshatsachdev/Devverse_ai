import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import VerseCard from "@/components/VerseCard";

const Index = () => {
  const sampleQuestions = [
    "What is karma?",
    "How to overcome anxiety?",
    "What is detachment?",
    "How to find inner peace?",
    "What is dharma?",
    "How to handle difficult people?"
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 space-y-16">
          {/* Hero Section */}
          <section className="text-center py-16">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 enlightenment-glow rounded-full overflow-hidden animate-glow-pulse">
                <img 
                  src="/lovable-uploads/22626a1e-0548-4eb8-90fd-1a90afb3e3d8.png" 
                  alt="Devverse AI" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-spiritual font-bold text-primary mb-6">
              Devverse AI
            </h1>
            
            <p className="text-2xl md:text-3xl font-spiritual text-earth-dark mb-8 max-w-2xl mx-auto">
              "When life feels heavy, the Gita speaks"
            </p>
            
            <Link to="/chat" className="btn-spiritual text-lg">
              Start Your Journey
            </Link>
          </section>

          {/* About Section */}
          <section className="max-w-4xl mx-auto">
            <div className="divine-card p-8 text-center">
              <h2 className="text-3xl font-spiritual font-bold text-primary mb-6">
                What is Devverse AI?
              </h2>
              <p className="text-lg leading-relaxed text-foreground">
                Devverse AI is your spiritual companion, offering wisdom from the Bhagavad Gita 
                to help navigate life's challenges. Through modern AI technology, we bring ancient 
                teachings to your daily struggles, providing personalized guidance for stress relief, 
                self-discovery, and inner peace. Let the timeless wisdom of the Gita illuminate 
                your path to enlightenment.
              </p>
            </div>
          </section>

          {/* Sample Questions */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-spiritual font-bold text-center text-primary mb-8">
              Ask About Life's Deepest Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleQuestions.map((question, index) => (
                <Link
                  key={index}
                  to={`/chat?q=${encodeURIComponent(question)}`}
                  className="btn-peace text-center hover:scale-105 transition-transform"
                >
                  {question}
                </Link>
              ))}
            </div>
          </section>

          {/* Verse of the Day */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-spiritual font-bold text-center text-primary mb-8">
              Verse of the Day
            </h2>
            <VerseCard
              chapter={2}
              verse={47}
              sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
              english="You have a right to perform your prescribed duty, but not to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
            />
          </section>

          {/* Footer */}
          <footer className="divine-card p-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-spiritual font-bold text-primary mb-4">Connect</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                  <Link to="/feedback" className="block text-muted-foreground hover:text-primary transition-colors">Feedback</Link>
                </div>
              </div>
              <div>
                <h3 className="font-spiritual font-bold text-primary mb-4">Learn</h3>
                <div className="space-y-2">
                  <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">About</Link>
                  <Link to="/verses" className="block text-muted-foreground hover:text-primary transition-colors">Verse Library</Link>
                </div>
              </div>
              <div>
                <h3 className="font-spiritual font-bold text-primary mb-4">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
            
            <div className="spiritual-divider my-8"></div>
            
            <p className="text-muted-foreground">
              © 2024 Devverse AI. Bringing ancient wisdom to modern minds.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
