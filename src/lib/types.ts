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

export type Job = z.infer<typeof JobSchema>
export type House = z.infer<typeof HouseSchema>
export type Pair = z.infer<typeof PairSchema>
