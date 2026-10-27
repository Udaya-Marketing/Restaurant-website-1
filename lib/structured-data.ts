import { menu } from "@/data/menu";
import { absoluteUrl, site } from "@/lib/site";

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl("/images/og-goodfire.svg"),
    telephone: site.telephone,
    email: site.email,
    servesCuisine: ["American", "Burgers"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...site.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.2642,
      longitude: -97.7465,
    },
    openingHoursSpecification: site.hours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days.map((day) => `https://schema.org/${day}`),
      opens: hours.opens,
      closes: hours.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "487",
      bestRating: "5",
    },
    hasMenu: absoluteUrl("/menu"),
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} Menu`,
    url: absoluteUrl("/menu"),
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Good things to eat",
        hasMenuItem: menu.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          image: absoluteUrl(item.image),
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        })),
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
