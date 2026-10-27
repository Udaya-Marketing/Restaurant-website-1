"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { reservationSchema, type ReservationFormValues, type ReservationInput } from "@/lib/reservation-schema";

export function ReservationForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues, unknown, ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 },
  });

  async function onSubmit(values: ReservationInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "We couldn’t send your request.");
      setStatus(result.message ?? "Your request is in. We’ll be in touch soon.");
      reset({ guests: 2 });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const fields = "focus-ring mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm placeholder:text-muted/60";

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-name">Your name</label>
          <input aria-invalid={Boolean(errors.name)} className={fields} id="reservation-name" placeholder="First and last name" {...register("name")} />
          {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-email">Email address</label>
          <input aria-invalid={Boolean(errors.email)} className={fields} id="reservation-email" placeholder="you@example.com" type="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-phone">Phone number</label>
          <input aria-invalid={Boolean(errors.phone)} className={fields} id="reservation-phone" placeholder="(512) 555-0123" type="tel" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-sm text-red-700">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-guests">Number of guests</label>
          <select aria-invalid={Boolean(errors.guests)} className={fields} id="reservation-guests" {...register("guests", { valueAsNumber: true })}>
            {Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? "guest" : "guests"}</option>)}
          </select>
          {errors.guests && <p className="mt-1 text-sm text-red-700">{errors.guests.message}</p>}
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-date">Date</label>
          <input aria-invalid={Boolean(errors.date)} className={fields} id="reservation-date" type="date" {...register("date")} />
          {errors.date && <p className="mt-1 text-sm text-red-700">{errors.date.message}</p>}
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="reservation-time">Preferred time</label>
          <select aria-invalid={Boolean(errors.time)} className={fields} id="reservation-time" {...register("time")}>
            <option value="">Choose a time</option>
            {["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map((time) => <option key={time}>{time}</option>)}
          </select>
          {errors.time && <p className="mt-1 text-sm text-red-700">{errors.time.message}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-bold" htmlFor="reservation-message">Anything we should know? <span className="font-normal text-muted">(optional)</span></label>
        <textarea className={`${fields} min-h-28 resize-y`} id="reservation-message" placeholder="A birthday, a high chair, a favorite corner…" {...register("message")} />
        {errors.message && <p className="mt-1 text-sm text-red-700">{errors.message.message}</p>}
      </div>
      <button className="focus-ring rounded-full bg-ink px-7 py-4 text-sm font-bold text-white transition hover:bg-orange disabled:cursor-wait disabled:opacity-70" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending request…" : "Request a table"}
      </button>
      {status && <p aria-live="polite" className="rounded-xl bg-cream-deep p-4 text-sm font-medium">{status}</p>}
      <p className="text-xs leading-5 text-muted">We’ll confirm your reservation by email or phone. For groups larger than 12, please call us.</p>
    </form>
  );
}
