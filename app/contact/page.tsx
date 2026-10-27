import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ReservationForm } from "@/components/reservation-form";
import { breadcrumbJsonLd, restaurantJsonLd } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations & Contact",
  description: "Save a seat at Goodfire Burger Co. in downtown Austin. Find our address, opening hours, phone number, and reservation form.",
  alternates: { canonical: "/contact" },
  openGraph: { title: `Reservations & Contact | ${site.name}`, description: site.description, url: absoluteUrl("/contact"), images: ["/images/og-goodfire.svg"] },
  twitter: { card: "summary_large_image", title: `Reservations & Contact | ${site.name}`, description: site.description, images: ["/images/og-goodfire.svg"] },
};

export default function ContactPage() {
  return (
    <main className="page-shell pb-24 pt-12 sm:pt-16">
      <JsonLd data={restaurantJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reservations & Contact", path: "/contact" }])} />
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">We saved you a seat</p>
        <h1 className="display-heading mt-3 text-[clamp(3rem,7vw,5.3rem)]">Let’s make <span className="text-orange">a night</span> of it.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Tell us when you’re coming by. We’ll get the table ready and the griddle hot.</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[28px] border border-ink/[0.07] bg-white/80 p-6 sm:p-9">
          <h2 className="display-heading mb-7 text-3xl">Request a reservation</h2>
          <ReservationForm />
        </div>
        <aside className="space-y-5">
          <div className="rounded-[24px] bg-ink p-7 text-white sm:p-8">
            <p className="eyebrow">Find us in the neighborhood</p>
            <h2 className="display-heading mt-3 text-3xl">Goodfire, downtown.</h2>
            <address className="mt-5 not-italic text-sm leading-6 text-white/75">{site.address.streetAddress}<br />{site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}</address>
            <a className="focus-ring mt-5 inline-flex rounded-full bg-orange px-5 py-3 text-sm font-bold text-white hover:bg-[#d9560c]" href="https://maps.google.com/?q=214+W+2nd+Street+Austin+TX+78701" rel="noreferrer" target="_blank">Get directions ↗</a>
          </div>
          <div className="rounded-[24px] border border-ink/[0.07] bg-white/80 p-7 sm:p-8">
            <h2 className="display-heading text-2xl">The little details</h2>
            <a className="mt-5 flex items-center gap-3 text-sm font-semibold hover:text-orange" href={`tel:${site.telephone}`}><Phone aria-hidden="true" className="text-orange" size={18} />{site.telephone}</a>
            <p className="mt-4 flex items-start gap-3 text-sm leading-6 text-muted"><Clock3 aria-hidden="true" className="mt-0.5 shrink-0 text-orange" size={18} /><span>Mon–Thu 11am–9pm<br />Fri–Sat 11am–10pm<br />Sunday 11am–8pm</span></p>
            <a className="mt-4 flex items-center gap-3 text-sm font-semibold hover:text-orange" href={`mailto:${site.email}`}><MapPin aria-hidden="true" className="text-orange" size={18} />{site.email}</a>
          </div>
          <iframe
            className="h-64 w-full rounded-[24px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=214%20W%202nd%20Street%2C%20Austin%2C%20TX%2078701&t=&z=14&ie=UTF8&iwloc=&output=embed"
            title="Map showing the Goodfire Burger Co. restaurant in Austin, Texas"
          />
        </aside>
      </div>
    </main>
  );
}
