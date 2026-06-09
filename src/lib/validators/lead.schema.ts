import { z } from "zod";

export const leadCreateSchema = z.object({
  customer_name: z.string().min(1),
  phone_number: z.string().min(10),
  email: z.string().optional(),
  city: z.string().optional(),
  meta_lead_id: z.string().optional(),
  ad_id: z.string().optional(),
  lead_status: z.string().default("New Lead"),
});

export type CreateLeadInput = z.infer<typeof leadCreateSchema>;