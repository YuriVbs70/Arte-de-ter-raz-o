/*
# Create leads table for sales page lead capture

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `name` (text, not null) — name of the interested buyer
  - `email` (text, not null) — email of the interested buyer
  - `phone` (text, nullable) — optional phone number
  - `source` (text, default 'sales_page') — where the lead came from
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `leads`.
- Allow anon + authenticated INSERT only (so the sales page can submit leads without login).
- No SELECT/UPDATE/DELETE for anon — only the project owner can read leads via the Supabase dashboard (service role).
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  source text NOT NULL DEFAULT 'sales_page',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);
