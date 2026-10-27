"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { newsletterSchema } from "@/lib/reservation-schema";

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    setStatus(null);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "We couldn’t sign you up just now.");
      setStatus("You’re on the list. Watch your inbox for the good stuff.");
      reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
        <input
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          className="focus-ring min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/50"
          id="newsletter-email"
          placeholder="Your email address"
          type="email"
          {...register("email")}
        />
        <button
          className="focus-ring rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d9560c] disabled:cursor-wait disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Joining…" : "Count me in"}
        </button>
      </div>
      {errors.email && <p className="mt-2 text-sm text-[#ffd3bd]" id="newsletter-error">{errors.email.message}</p>}
      {status && <p aria-live="polite" className="mt-3 text-sm text-white/80">{status}</p>}
    </form>
  );
}
