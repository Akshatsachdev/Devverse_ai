import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface ContentItem {
  id: string;
  key: string;
  value: string;
  category: string;
  description: string | null;
}

const ContentEditor = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      toast({
        title: "Error fetching content",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setContent(data || []);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditValue(item.value);
  };

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from("content")
      .update({ value: editValue })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating content",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      setEditingId(null);
      fetchContent();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-primary">{item.key}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Category: {item.category}</p>
              </div>
              {editingId !== item.id && (
                <Button onClick={() => handleEdit(item)} size="sm">
                  Edit
                </Button>
              )}
            </div>

            {editingId === item.id ? (
              <div className="space-y-2">
                {item.value.length > 100 ? (
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                ) : (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full"
                  />
                )}
                <div className="flex gap-2">
                  <Button onClick={() => handleSave(item.id)} size="sm">
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm bg-accent/10 p-3 rounded">{item.value}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ContentEditor;