import { z } from 'zod'

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  employer: z.string(),
  wage: z.string(),          // "¥1,250/hour" など
  location: z.string(),
  type: z.string(),          // "Full-time" 等
})

export const HouseSchema = z.object({
  id: z.string(),
  name: z.string(),
  rent: z.string(),          // "¥65,000"
  station: z.string(),       // "徒歩5分" 等
  photo: z.string().url().optional(),
  tags: z.array(z.string()),
})

export const PairSchema = z.object({
  id: z.string(),
  job: JobSchema,
  house: HouseSchema,
})

export const UserProfileSchema = z.object({
  // Basic Info
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  nationality: z.string(),
  currentAddress: z.string().optional(),
  
  // Job-related Info
  japaneseLevel: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).optional(),
  languages: z.array(z.string()),
  workExperience: z.string().optional(),
  preferredJobTypes: z.array(z.string()),
  availableStartDate: z.string().optional(),
  
  // Housing-related Info
  preferredAreas: z.array(z.string()),
  budgetRange: z.string().optional(),
  moveInDate: z.string().optional(),
  emergencyContact: z.string().optional(),
  
  // Documents
  hasResidenceCard: z.boolean().default(false),
  hasWorkPermit: z.boolean().default(false),
  hasInsurance: z.boolean().default(false),
  
  // Credit Score (non-editable)
  creditScore: z.object({
    score: z.number(),
    maxScore: z.number().default(100),
    factors: z.array(z.string()),
  }),
})

export type Job = z.infer<typeof JobSchema>
export type House = z.infer<typeof HouseSchema>
export type Pair = z.infer<typeof PairSchema>
export type UserProfile = z.infer<typeof UserProfileSchema>
