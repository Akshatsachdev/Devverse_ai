import { useState } from "react";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      toast({
        title: "Thank you for helping Devverse grow! 🙏",
        description: "Your feedback helps us serve the spiritual community better.",
      });
      
      setFeedback("");
      setRating(null);
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const ratingOptions = [
    { value: 1, emoji: "😞", label: "Not helpful" },
    { value: 2, emoji: "😐", label: "Somewhat helpful" },
    { value: 3, emoji: "🙂", label: "Helpful" },
    { value: 4, emoji: "😊", label: "Very helpful" },
    { value: 5, emoji: "🤩", label: "Extremely helpful" }
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <Navigation />
        
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <section className="text-center mb-12">
            <div className="text-6xl mb-4">🙏</div>
            <h1 className="text-4xl font-spiritual font-bold text-primary mb-4">
              Share Your Experience
            </h1>
            <p className="text-xl text-muted-foreground">
              Your feedback helps us improve our spiritual guidance
            </p>
          </section>

          {/* Feedback Form */}
          <div className="divine-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-lg font-spiritual font-medium text-foreground mb-4">
                  How helpful was your experience?
                </label>
                <div className="flex justify-center space-x-4">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRating(option.value)}
                      className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                        rating === option.value
                          ? "bg-primary/20 text-primary scale-110"
                          : "bg-secondary/50 hover:bg-secondary/70"
                      }`}
                    >
                      <span className="text-2xl mb-1">{option.emoji}</span>
                      <span className="text-xs text-center">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label htmlFor="feedback" className="block text-lg font-spiritual font-medium text-foreground mb-3">
                  Tell us about your journey
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or how Devverse AI has helped you on your spiritual path..."
                  className="w-full h-32 p-4 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="email" className="block text-lg font-spiritual font-medium text-foreground mb-3">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full p-4 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Leave your email if you'd like us to follow up with you
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim()}
                  className="btn-spiritual text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    "Send Feedback"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Feedback Buttons */}
          <div className="mt-8">
            <h3 className="text-xl font-spiritual font-bold text-center text-primary mb-4">
              Quick Feedback
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  toast({
                    title: "Thank you! 👍",
                    description: "We're glad Devverse AI was helpful!",
                  });
                }}
                className="divine-card p-4 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-2">👍</div>
                <span className="font-medium">This response was helpful</span>
              </button>
              
              <button
                onClick={() => {
                  toast({
                    title: "Thank you for the feedback 👎",
                    description: "We'll work on improving our responses.",
                  });
                }}
                className="divine-card p-4 text-center hover:scale-105 transition-transform"
              >
                <div className="text-3xl mb-2">👎</div>
                <span className="font-medium">This response needs improvement</span>
              </button>
            </div>
          </div>

          {/* Community Note */}
          <div className="divine-card p-6 mt-8 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-spiritual font-bold text-primary mb-2">
              Building Together
            </h3>
            <p className="text-muted-foreground">
              Devverse AI grows stronger with each piece of feedback from our spiritual community. 
              Together, we're making ancient wisdom accessible to all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;