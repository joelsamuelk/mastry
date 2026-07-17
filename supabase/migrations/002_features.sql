-- Opportunities (jobs the user has saved or discovered)
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'GBP',
  remote_type TEXT CHECK (remote_type IN ('remote', 'hybrid', 'onsite')),
  description TEXT,
  url TEXT,
  source TEXT DEFAULT 'manual',
  -- Smart Matching fields
  match_score INTEGER,
  match_breakdown JSONB,
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('saved', 'applied', 'interviewing', 'offered', 'rejected', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own opportunities" ON opportunities FOR ALL USING (auth.uid() = user_id);

-- Application materials (cover letters, optimised CVs, answers)
CREATE TABLE IF NOT EXISTS application_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('cover_letter', 'cv_optimised', 'application_answer', 'outreach_message')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE application_materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own materials" ON application_materials FOR ALL USING (auth.uid() = user_id);

-- Interview prep sessions
CREATE TABLE IF NOT EXISTS interview_preps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  role_title TEXT NOT NULL,
  likely_questions JSONB NOT NULL DEFAULT '[]',
  star_examples JSONB NOT NULL DEFAULT '[]',
  company_research JSONB,
  questions_to_ask JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE interview_preps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own preps" ON interview_preps FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_user ON opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(user_id, status);
CREATE INDEX IF NOT EXISTS idx_application_materials_user ON application_materials(user_id);
CREATE INDEX IF NOT EXISTS idx_application_materials_opportunity ON application_materials(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_interview_preps_user ON interview_preps(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_preps_opportunity ON interview_preps(opportunity_id);
