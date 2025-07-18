import { z } from "zod";

const HalalStatus = z.object({
  generalHalal: z.string().default("Pending Review"),
  handslaughtered: z.string().default("Pending Review"),
});

const StatusHistoryEntry = z.object({
  date: z.string(),
  status: z.string()
});

const GeoLocation = z.object({
  latitude: z.number(),
  longitude: z.number()
});

const Contact = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
});

export const FoodService = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Restaurant", "Butcher"]),
    address: z.string().optional(),
    contact: Contact.optional(),
    lastContact: z.string().optional(),
    notes: z.string().default(""),
    status: HalalStatus.default({
        generalHalal: "Pending Review",
        handslaughtered: "Pending Review"
    }),
    statusHistory: z.array(StatusHistoryEntry).default([]),
    geolocation: GeoLocation.optional(),
});

export const FoodServiceArray = z.array(FoodService);
export type FoodService = z.infer<typeof FoodService>;
export type FoodServiceArray = z.infer<typeof FoodServiceArray>;