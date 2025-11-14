import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setProfile(profileData);
    };

    getUser();
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-spiritual font-bold text-center mb-8 text-primary">
            Welcome to Your Dashboard
          </h1>
          
          <div className="divine-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            {profile && (
              <div className="space-y-2">
                <p><strong>User ID:</strong> {user?.id}</p>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="divine-card p-6">
              <h3 className="text-xl font-bold mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/chat')}
                  className="w-full btn-spiritual"
                >
                  Start Chat
                </Button>
                <Button 
                  onClick={() => navigate('/verses')}
                  className="w-full btn-peace"
                >
                  Explore Verses
                </Button>
                <Button 
                  onClick={() => navigate('/feedback')}
                  className="w-full"
                  variant="outline"
                >
                  Give Feedback
                </Button>
              </div>
            </div>

            <div className="divine-card p-6">
              <h3 className="text-xl font-bold mb-3">Your Journey</h3>
              <p className="text-muted-foreground">
                Explore the wisdom of the Bhagavad Gita through AI-powered conversations 
                and discover personalized spiritual guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
