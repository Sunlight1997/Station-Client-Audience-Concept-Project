-- Create audiences table
CREATE TABLE audiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age_range VARCHAR(50) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  income VARCHAR(50) NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  location VARCHAR(255) NOT NULL,
  education VARCHAR(100) NOT NULL,
  lifestyle VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create concepts table
CREATE TABLE concepts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  audience_id UUID NOT NULL REFERENCES audiences(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
);

-- Create indexes for better performance
CREATE INDEX idx_concepts_audience_id ON concepts(audience_id);
CREATE INDEX idx_concepts_created_at ON concepts(created_at DESC);
CREATE INDEX idx_audiences_created_at ON audiences(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE audiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
-- In production, you would want more restrictive policies
CREATE POLICY "Allow public read access to audiences" ON audiences
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to audiences" ON audiences
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to concepts" ON concepts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to concepts" ON concepts
  FOR INSERT WITH CHECK (true);
