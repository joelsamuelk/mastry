-- Job Searches (AI-powered job discovery sessions)
CREATE TABLE IF NOT EXISTS job_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '[]',
  result_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'searching', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE job_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own searches" ON job_searches FOR ALL USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_job_searches_user ON job_searches(user_id);

-- Interview Schedules (calendar events for interviews)
CREATE TABLE IF NOT EXISTS interview_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  company TEXT NOT NULL,
  role_title TEXT NOT NULL,
  round TEXT NOT NULL DEFAULT 'Phone Screen',
  interview_type TEXT NOT NULL DEFAULT 'video' CHECK (interview_type IN ('phone', 'video', 'onsite', 'take_home')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  location TEXT,
  meeting_link TEXT,
  interviewer_names TEXT[] DEFAULT '{}',
  notes TEXT,
  calendar_event_id TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE interview_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own schedules" ON interview_schedules FOR ALL USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_interview_schedules_user ON interview_schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_schedules_date ON interview_schedules(user_id, scheduled_at);

-- Mock Interview Sessions (AI mock interview conversations)
CREATE TABLE IF NOT EXISTS mock_interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  company TEXT NOT NULL,
  role_title TEXT NOT NULL,
  interview_type TEXT NOT NULL DEFAULT 'behavioral' CHECK (interview_type IN ('behavioral', 'technical', 'case_study', 'mixed')),
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  messages JSONB NOT NULL DEFAULT '[]',
  feedback JSONB,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE mock_interviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own mock interviews" ON mock_interviews FOR ALL USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_mock_interviews_user ON mock_interviews(user_id);

-- Add application tracking fields to opportunities
ALTER TABLE opportunities
  ADD COLUMN IF NOT EXISTS applied_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS follow_up_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deadline TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS application_method TEXT CHECK (application_method IN ('website', 'email', 'linkedin', 'referral', 'recruiter', 'other'));
