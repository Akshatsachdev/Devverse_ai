import { useState } from "react";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Feedback = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-feedback', {
        body: {
          name,
          age,
          gender,
          email,
          phone,
          feedback,
        },
      });

      if (error) throw error;

      toast({
        title: "Thank you for helping Devverse grow! 🙏",
        description: "Your feedback helps us serve the spiritual community better.",
      });
      
      // Reset form
      setName("");
      setAge("");
      setGender("");
      setEmail("");
      setPhone("");
      setFeedback("");
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast({
        title: "Error sending feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-lg font-spiritual font-medium">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-2"
                />
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-lg font-spiritual font-medium">
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  required
                  className="mt-2"
                />
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender" className="text-lg font-spiritual font-medium">
                  Gender *
                </Label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-lg font-spiritual font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-2"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-lg font-spiritual font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="mt-2"
                />
              </div>

              {/* Feedback Text */}
              <div>
                <Label htmlFor="feedback" className="text-lg font-spiritual font-medium">
                  Feedback *
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or how Devverse AI has helped you on your spiritual path..."
                  className="mt-2 min-h-[120px]"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim() || !name.trim() || !age || !gender || !email.trim() || !phone.trim()}
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