import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ContentEditor from "@/components/ContentEditor";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAndFetchUsers = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      // Check if user is admin
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      // Fetch all users
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('id, name, age, gender, phone, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Fetch emails from auth.users via a query
        const usersWithEmails = await Promise.all(
          (profilesData || []).map(async (profile) => {
            const { data: { user } } = await supabase.auth.admin.getUserById(profile.id);
            return {
              ...profile,
              email: user?.email || 'N/A',
            };
          })
        );
        setUsers(usersWithEmails);
      }
      
      setLoading(false);
    };

    checkAdminAndFetchUsers();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-spiritual font-bold text-center mb-8 text-primary">
          Admin Panel
        </h1>
        
        <Card className="divine-card">
          <CardHeader>
            <CardTitle className="text-2xl">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-center text-muted-foreground">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">User ID</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Gender</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Phone</th>
                      <th className="text-left p-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-accent/10">
                        <td className="p-3 font-mono text-xs">{user.id.substring(0, 8)}...</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.age}</td>
                        <td className="p-3">{user.gender}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.phone}</td>
                        <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="divine-card mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Content Editing</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center">Loading content...</p>
            ) : (
              <ContentEditor />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
