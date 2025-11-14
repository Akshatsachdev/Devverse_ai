import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Feedback = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to submit feedback.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      setUserId(session.user.id);
      setEmail(session.user.email || "");

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileData) {
        setName(profileData.name || "");
        setAge(profileData.age?.toString() || "");
        setGender(profileData.gender || "");
        setPhone(profileData.phone || "");
      }
    };

    getUserData();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-feedback', {
        body: {
          userId,
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
              {/* User ID */}
              <div>
                <Label htmlFor="userId" className="text-lg font-spiritual font-medium">
                  User ID
                </Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  disabled
                  className="mt-2 bg-muted"
                />
              </div>

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
                <Select 
                  value={gender} 
                  onValueChange={setGender} 
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                  placeholder="your.email@example.com"
                  required
                  className="mt-2"
                />
              </div>

              {/* Phone */}
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

              {/* Feedback */}
              <div>
                <Label htmlFor="feedback" className="text-lg font-spiritual font-medium">
                  Your Feedback *
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or experiences with Devverse AI..."
                  required
                  rows={6}
                  className="mt-2 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !feedback}
                className="w-full btn-spiritual text-lg"
              >
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </Button>
            </form>
          </div>

          {/* Building Together Section */}
          <section className="mt-12 text-center pb-16">
            <div className="divine-card p-8">
              <h2 className="text-2xl font-spiritual font-bold text-primary mb-4">
                Building Together
              </h2>
              <p className="text-lg text-muted-foreground">
                Every piece of feedback helps us create a better spiritual experience. 
                Your voice matters in shaping the future of Devverse AI.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
