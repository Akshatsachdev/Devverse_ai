import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialQuestion = searchParams.get("q");
    if (initialQuestion) {
      setInputValue(initialQuestion);
    }
  }, [searchParams]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue("");
    addMessage(userMessage, false);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "According to the Bhagavad Gita (2.47), you have the right to perform your actions, but not to the fruits of the actions. Focus on your duty without attachment to results.",
        "Krishna teaches us in the Gita that the soul is eternal and indestructible. What troubles you in this moment is temporary, but your true self remains unchanged.",
        "The Gita speaks of three paths: Karma Yoga (path of action), Bhakti Yoga (path of devotion), and Jnana Yoga (path of knowledge). Which resonates with your current journey?",
        "Lord Krishna reminds us that when we surrender our worries to the divine and act with pure intention, we find peace even in the midst of chaos."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, true);
      setIsLoading(false);
    }, 1500);
  };

  const getRandomVerse = () => {
    const verses = [
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। (2.47) - You have the right to action, but not to its fruits.",
      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। (2.48) - Perform your duty with a balanced mind, O Arjuna.",
      "तस्मादसक्तः सततं कार्यं कर्म समाचर। (3.19) - Therefore, always perform your duties without attachment."
    ];
    
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setInputValue(randomVerse);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="divine-card p-6 h-[70vh] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 enlightenment-glow rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/22626a1e-0548-4eb8-90fd-1a90afb3e3d8.png" 
                    alt="AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-spiritual font-bold text-primary">Spiritual Guide</h2>
                  <p className="text-sm text-muted-foreground">Wisdom from the Bhagavad Gita</p>
                </div>
              </div>
              
              <div className="space-x-2">
                <button className="btn-peace text-sm">Clear Chat</button>
                <button 
                  onClick={getRandomVerse}
                  className="btn-peace text-sm"
                  title="Get Random Verse"
                >
                  🎲 Random Verse
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🕉️</div>
                  <p className="text-muted-foreground">
                    Welcome, seeker. How may the Gita guide you today?
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={message.isBot ? 'chat-bot' : 'chat-user'}>
                    {message.isBot && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-primary">🪶</span>
                        <span className="text-sm font-medium text-primary">Spiritual Guide</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.text}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="chat-bot">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-primary">🪶</span>
                      <span className="text-sm font-medium text-primary">Spiritual Guide</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about karma, peace, or the Gita..."
                className="flex-1 p-4 rounded-xl border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="btn-spiritual px-6"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;