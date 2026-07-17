import { z } from "zod";
import { seniorityLevels } from "./passport";

export const remotePreferences = ["remote", "hybrid", "onsite", "any"] as const;

export const goalsSchema = z.object({
  target_role_title: z.string().max(200).nullable(),
  target_seniority: z.enum(seniorityLevels).nullable(),
  preferred_industries: z.array(z.string().max(100)),
  preferred_locations: z.array(z.string().max(100)),
  remote_preference: z.enum(remotePreferences),
  salary_min: z.number().min(0).nullable(),
  salary_currency: z.string().max(10).nullable(),
  requires_sponsorship: z.boolean(),
  is_actively_looking: z.boolean(),
});

export type GoalsFormData = z.infer<typeof goalsSchema>;
