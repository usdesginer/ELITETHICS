
# Elitethics Forensic Database Schema

This document outlines the database structure and Row Level Security (RLS) policies required for the Elitethics Digital Asset Recovery platform.

## SQL Setup (Run this in Supabase SQL Editor)

To ensure the application functions correctly, execute the following SQL in your Supabase project:

```sql
-- 1. Create the cases table (For intake)
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text,
  case_type text,
  user_name text,
  user_email text,
  user_phone text,
  user_country text,
  risk_level text,
  evidence_integrity text,
  status text DEFAULT 'Review Pending',
  description text,
  result_data jsonb,
  form_values jsonb,
  evidence_files jsonb DEFAULT '[]', -- Store array of {name, path, url}
  is_blocked boolean DEFAULT false,
  has_access boolean DEFAULT true,
  best_contact_time text,
  preferred_method text,
  created_at timestamptz DEFAULT now()
);

-- 2. Create the success_stories table (Case Insights)
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text,
  case_type text, -- Division
  amount text,
  status text DEFAULT 'Resolved',
  challenge text, -- Technical Challenge
  focus text,     -- Investigative Focus
  outcome text,   -- Technical Outcome
  narrative text, -- General Summary
  icon_name text DEFAULT 'TrendingUp',
  created_at timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow Public Submissions (Insert)
DROP POLICY IF EXISTS "Allow public insert" ON cases;
CREATE POLICY "Allow public insert" ON cases 
FOR INSERT WITH CHECK (true);

-- 5. Policy: Restrict Read Access (Select)
DROP POLICY IF EXISTS "Allow authenticated select" ON cases;
CREATE POLICY "Allow authenticated select" ON cases 
FOR SELECT TO authenticated USING (true);

-- 6. Policy: Restrict Updates (Update)
DROP POLICY IF EXISTS "Allow authenticated update" ON cases;
CREATE POLICY "Allow authenticated update" ON cases 
FOR UPDATE TO authenticated USING (true);

-- 7. Policy: Restrict Deletion (Delete)
DROP POLICY IF EXISTS "Allow authenticated delete" ON cases;
CREATE POLICY "Allow authenticated delete" ON cases 
FOR DELETE TO authenticated USING (true);

-- 8. Policy: Public Read for Success Stories
DROP POLICY IF EXISTS "Allow public select stories" ON success_stories;
CREATE POLICY "Allow public select stories" ON success_stories 
FOR SELECT USING (true);

-- 9. Policy: Admin All for Success Stories
DROP POLICY IF EXISTS "Allow authenticated all stories" ON success_stories;
CREATE POLICY "Allow authenticated all stories" ON success_stories 
FOR ALL TO authenticated USING (true);
-- 10. Storage Buckets Setup & Policies
-- Create 'assets' bucket (Public for logo, team pictures)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('assets', 'assets', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create 'evidence' bucket (Private for confidential client files)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('evidence', 'evidence', false, 52428800)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public Read for Assets
DROP POLICY IF EXISTS "Public Assets Read" ON storage.objects;
CREATE POLICY "Public Assets Read" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');

-- Storage Policy: Allow Upload & Update to Assets
DROP POLICY IF EXISTS "Allow Upload to Assets" ON storage.objects;
CREATE POLICY "Allow Upload to Assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'assets');

DROP POLICY IF EXISTS "Allow Update Assets" ON storage.objects;
CREATE POLICY "Allow Update Assets" ON storage.objects
FOR UPDATE USING (bucket_id = 'assets');

-- Storage Policy: Allow Case Intake Evidence Uploads
DROP POLICY IF EXISTS "Allow Public Evidence Upload" ON storage.objects;
CREATE POLICY "Allow Public Evidence Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'evidence');

-- Storage Policy: Restrict Evidence Read to Authenticated Investigators
DROP POLICY IF EXISTS "Allow Authenticated Evidence Read" ON storage.objects;
CREATE POLICY "Allow Authenticated Evidence Read" ON storage.objects
FOR SELECT TO authenticated USING (bucket_id = 'evidence');
```

## Storage Buckets

### Automatic Setup (Recommended)
The SQL script above automatically creates both buckets and configures their Row Level Security (RLS) policies.

### Manual Setup (Supabase Dashboard)
If configuring manually via the UI:
1. Go to **Storage** in the Supabase Dashboard.
2. Click **New bucket**.
3. Name: `assets` (toggle **Public bucket** to **ON**).
4. Click **New bucket** again.
5. Name: `evidence` (keep **Public bucket** **OFF**).
