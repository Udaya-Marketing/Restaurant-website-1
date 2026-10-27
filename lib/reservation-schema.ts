import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
  date: z.string().min(1, "Choose a date."),
  time: z.string().min(1, "Choose a time."),
  guests: z.coerce.number().int().min(1).max(12),
  message: z.string().trim().max(1000).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type ReservationFormValues = z.input<typeof reservationSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address."),
});
