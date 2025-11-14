import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";

const About = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Hero Section */}
          <section className="text-center py-8">
            <div className="w-24 h-24 enlightenment-glow rounded-full overflow-hidden mx-auto mb-6">
              <img 
                src="/lovable-uploads/22626a1e-0548-4eb8-90fd-1a90afb3e3d8.png" 
                alt="Devverse AI" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-spiritual font-bold text-primary mb-4">
              About Devverse AI
            </h1>
            <p className="text-xl text-muted-foreground">
              Where ancient wisdom meets modern technology
            </p>
          </section>

          {/* Mission */}
          <section className="divine-card p-8">
            <h2 className="text-3xl font-spiritual font-bold text-primary mb-6">Our Mission</h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                In today's fast-paced world, stress and anxiety have become constant companions. 
                We often find ourselves lost, seeking guidance and peace. Devverse AI was born 
                from a simple yet profound realization: the timeless wisdom of the Bhagavad Gita 
                holds answers to our modern struggles.
              </p>
              <p>
                Our mission is to make this ancient wisdom accessible to everyone, regardless of 
                their spiritual background or familiarity with Hindu scriptures. Through the power 
                of conversational AI, we provide personalized guidance that speaks to your unique 
                circumstances while staying true to the Gita's profound teachings.
              </p>
            </div>
          </section>

          {/* Why Devverse AI */}
          <section className="divine-card p-8">
            <h2 className="text-3xl font-spiritual font-bold text-primary mb-6">Why Devverse AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🧘‍♀️</span>
                  <div>
                    <h3 className="font-spiritual font-bold text-primary">Personalized Guidance</h3>
                    <p className="text-muted-foreground">
                      Receive wisdom tailored to your specific life situations and challenges.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🕉️</span>
                  <div>
                    <h3 className="font-spiritual font-bold text-primary">Authentic Wisdom</h3>
                    <p className="text-muted-foreground">
                      All responses are grounded in the authentic teachings of the Bhagavad Gita.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💭</span>
                  <div>
                    <h3 className="font-spiritual font-bold text-primary">Modern Relevance</h3>
                    <p className="text-muted-foreground">
                      Ancient teachings presented in a way that applies to contemporary life.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h3 className="font-spiritual font-bold text-primary">Continuous Growth</h3>
                    <p className="text-muted-foreground">
                      Evolving AI that learns to provide increasingly insightful guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="divine-card p-8">
            <h2 className="text-3xl font-spiritual font-bold text-primary mb-6">Technologies We Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⚛️</div>
                <h3 className="font-spiritual font-bold text-primary mb-2">React</h3>
                <p className="text-sm text-muted-foreground">
                  Modern, responsive user interface built with React and TypeScript
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-spiritual font-bold text-primary mb-2">AI Models</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced language models trained on Bhagavad Gita teachings
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-spiritual font-bold text-primary mb-2">Flask Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Robust Python backend powered by Flask and Transformers
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="divine-card p-8 border-l-4 border-primary">
            <h2 className="text-2xl font-spiritual font-bold text-primary mb-4">Important Disclaimer</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Devverse AI is designed for educational and spiritual guidance purposes. 
                While we strive to provide authentic interpretations of the Bhagavad Gita, 
                our AI responses should not be considered a substitute for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Professional spiritual counseling or guidance from qualified teachers</li>
                <li>Medical or psychological treatment for mental health conditions</li>
                <li>Traditional study of sacred texts with learned scholars</li>
                <li>Personal practice of yoga, meditation, or other spiritual disciplines</li>
              </ul>
              <p>
                We encourage users to complement their digital spiritual journey with 
                traditional learning methods and qualified guidance when seeking deeper 
                understanding.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="divine-card p-8 text-center">
            <h2 className="text-3xl font-spiritual font-bold text-primary mb-6">Connect With Us</h2>
            <p className="text-muted-foreground mb-6">
              We'd love to hear about your spiritual journey and how Devverse AI has helped you.
            </p>
            <div className="space-x-4">
              <a href="https://github.com/Akshatsachdev" target="_blank" rel="noopener noreferrer" className="btn-spiritual">
                View on GitHub
              </a>
              <a href="/feedback" className="btn-peace">
                Send Feedback
              </a>
            </div>
            
            <div className="spiritual-divider my-8"></div>
            
            <p className="text-sm text-muted-foreground">
              Created with 🙏 for spiritual seekers everywhere
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;