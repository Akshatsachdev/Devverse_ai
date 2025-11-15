import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<{[key: string]: string}>({});
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

      // Fetch all editable content
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .select('*')
        .order('category', { ascending: true });

      if (contentError) {
        toast({
          title: "Error fetching content",
          description: contentError.message,
          variant: "destructive",
        });
      } else {
        setContent(contentData || []);
        // Initialize editing state
        const initialEditing: {[key: string]: string} = {};
        contentData?.forEach((item) => {
          initialEditing[item.id] = item.value;
        });
        setEditingContent(initialEditing);
      }
      
      setLoading(false);
    };

    checkAdminAndFetchUsers();
  }, [navigate, toast]);

  const handleContentUpdate = async (id: string, key: string) => {
    const newValue = editingContent[id];
    
    const { error } = await supabase
      .from('content')
      .update({ value: newValue })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error updating content",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Content updated",
        description: `Successfully updated ${key}`,
      });
      // Update local state
      setContent(content.map(item => 
        item.id === id ? { ...item, value: newValue } : item
      ));
    }
  };

  const handleContentChange = (id: string, value: string) => {
    setEditingContent({
      ...editingContent,
      [id]: value
    });
  };

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
            ) : content.length === 0 ? (
              <p className="text-center text-muted-foreground">No content found.</p>
            ) : (
              <div className="space-y-6">
                {content.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-semibold text-primary">
                          {item.key}
                        </label>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description} • Category: {item.category}
                        </p>
                      </div>
                      
                      {item.value.length > 100 ? (
                        <Textarea
                          value={editingContent[item.id] || ''}
                          onChange={(e) => handleContentChange(item.id, e.target.value)}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <Input
                          value={editingContent[item.id] || ''}
                          onChange={(e) => handleContentChange(item.id, e.target.value)}
                        />
                      )}
                      
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleContentUpdate(item.id, item.key)}
                          disabled={editingContent[item.id] === item.value}
                          className="btn-spiritual"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
