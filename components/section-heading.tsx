import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ eyebrow, title, description, link }: SectionHeadingProps) {
  return (
    <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-heading mt-3 text-[clamp(2.2rem,4vw,3.55rem)]">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>}
      </div>
      {link && (
        <Link className="focus-ring w-fit rounded-full border border-ink/15 px-5 py-3 text-sm font-bold transition hover:border-ink hover:bg-ink hover:text-white" href={link.href}>
          {link.label} <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}
