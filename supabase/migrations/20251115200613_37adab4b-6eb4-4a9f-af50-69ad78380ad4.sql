-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create content table for editable website content
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Everyone can read content
CREATE POLICY "Anyone can view content" 
ON public.content 
FOR SELECT 
USING (true);

-- Only admins can update content
CREATE POLICY "Admins can update content" 
ON public.content 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert content
CREATE POLICY "Admins can insert content" 
ON public.content 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON public.content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default content
INSERT INTO public.content (key, value, category, description) VALUES
  ('home_title', 'Devverse AI', 'homepage', 'Main title on homepage'),
  ('home_subtitle', 'Your AI-Powered Spiritual Companion', 'homepage', 'Subtitle on homepage'),
  ('home_description', 'Discover the timeless wisdom of the Bhagavad Gita through conversations with our AI companion. Get personalized spiritual guidance and insights.', 'homepage', 'Main description on homepage'),
  ('about_title', 'About Devverse AI', 'about', 'About page title'),
  ('about_description', 'We bring ancient wisdom to modern life through AI technology.', 'about', 'About page description');