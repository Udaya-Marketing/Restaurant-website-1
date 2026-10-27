import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="page-shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        <div>
          <Link aria-label="Goodfire Burger Co. home" className="inline-flex items-center gap-2" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/10 text-lg text-orange">✳</span>
            <span className="font-display text-2xl font-bold tracking-[-0.06em]">
              goodfire<span className="block font-body text-[0.58rem] font-bold tracking-[0.2em] text-orange">BURGER CO.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Austin-made smash burgers, hand-cut sides, and good things around the table.
          </p>
          <a
            aria-label="Visit Goodfire Burger Co. on Instagram"
            className="focus-ring mt-5 inline-flex rounded-full border border-white/20 p-3 text-white transition hover:border-orange hover:text-orange"
            href="https://www.instagram.com/"
            rel="noreferrer"
            target="_blank"
          >
            <Instagram aria-hidden="true" size={19} />
          </a>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Come hungry</h2>
          <address className="mt-5 not-italic text-sm leading-7 text-white/75">
            {site.address.streetAddress}<br />
            {site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}
          </address>
          <a
            className="focus-ring mt-3 inline-flex items-center gap-2 text-sm font-semibold hover:text-orange"
            href="https://maps.google.com/?q=214+W+2nd+Street+Austin+TX+78701"
            rel="noreferrer"
            target="_blank"
          >
            Get directions <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Find your way</h2>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/75">
            <Link className="hover:text-orange" href="/menu">Our menu</Link>
            <Link className="hover:text-orange" href="/about">Our story</Link>
            <Link className="hover:text-orange" href="/offers">Goodfire offers</Link>
            <Link className="hover:text-orange" href="/contact">Reservations & contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">The details</h2>
          <a className="mt-5 flex items-center gap-3 text-sm text-white/75 hover:text-orange" href={`tel:${site.telephone}`}>
            <Phone aria-hidden="true" size={16} /> {site.telephone}
          </a>
          <a className="mt-3 flex items-center gap-3 text-sm text-white/75 hover:text-orange" href={`mailto:${site.email}`}>
            <MapPin aria-hidden="true" size={16} /> {site.email}
          </a>
          <p className="mt-5 text-xs leading-5 text-white/50">
            Mon–Thu 11am–9pm · Fri–Sat 11am–10pm<br />Sunday 11am–8pm
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Goodfire Burger Co. Made with a little fire in Austin, TX.</p>
          <p>Good food. Good neighbors. Goodfire.</p>
        </div>
      </div>
    </footer>
  );
}
