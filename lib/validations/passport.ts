import { z } from "zod";

export const seniorityLevels = [
  "junior", "mid", "senior", "lead", "principal", "director", "vp", "c_level",
] as const;

export const evidenceTypes = [
  "publication", "talk", "project", "award", "patent", "other",
] as const;

export const passportSchema = z.object({
  career_summary: z.string().max(2000).nullable(),
  current_role_title: z.string().max(200).nullable(),
  current_company: z.string().max(200).nullable(),
  years_experience: z.number().min(0).max(60).nullable(),
  seniority_level: z.enum(seniorityLevels).nullable(),
  skills: z.array(z.string().max(100)),
  languages: z.array(z.string().max(100)),
});

export const employerSchema = z.object({
  company_name: z.string().min(1).max(200),
  role_title: z.string().min(1).max(200),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  is_current: z.boolean(),
  description: z.string().max(2000).nullable(),
  achievements: z.array(z.string().max(500)),
  technologies: z.array(z.string().max(100)),
  people_managed: z.number().min(0).nullable(),
});

export const educationSchema = z.object({
  institution: z.string().min(1).max(200),
  degree: z.string().max(200).nullable(),
  field_of_study: z.string().max(200).nullable(),
  start_year: z.number().min(1950).max(2030).nullable(),
  end_year: z.number().min(1950).max(2030).nullable(),
});

export const certificationSchema = z.object({
  name: z.string().min(1).max(200),
  issuer: z.string().max(200).nullable(),
  date_obtained: z.string().nullable(),
  expiry_date: z.string().nullable(),
  credential_url: z.string().url().nullable().or(z.literal("")),
});

export const evidenceSchema = z.object({
  type: z.enum(evidenceTypes),
  title: z.string().min(1).max(300),
  description: z.string().max(1000).nullable(),
  url: z.string().url().nullable().or(z.literal("")),
  date: z.string().nullable(),
});

export type PassportFormData = z.infer<typeof passportSchema>;
export type EmployerFormData = z.infer<typeof employerSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type EvidenceFormData = z.infer<typeof evidenceSchema>;
