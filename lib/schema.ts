import { z } from "zod";

export const observationSchema = z.object({
  machineName: z.string().min(2, { 
    message: "Le nom doit faire au moins 2 caractères." 
  }),
  type: z.enum(["rocket", "satellite", "plane", "iss", "other"] as const, {
    message: "Veuillez sélectionner un type d'appareil valide.",
  }),
  date: z.string().min(1, { 
    message: "La date est requise." 
  }),
  location: z.string().min(2, { 
    message: "Le lieu doit faire au moins 2 caractères." 
  }),
  notes: z.string().optional(),
});

export type ObservationFormData = z.infer<typeof observationSchema>;
