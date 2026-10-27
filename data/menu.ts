export const categories = [
  "Burgers",
  "Fast Food",
  "Salad",
  "Drinks",
  "Dessert",
  "Snacks",
  "Soup",
] as const;

export type MenuCategory = (typeof categories)[number];

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: MenuCategory;
  image: string;
  imageAlt: string;
  featured?: boolean;
  ingredients: string[];
  prepTime: string;
  calories: number;
};

export const menu: MenuItem[] = [
  {
    slug: "the-goodfire",
    name: "The Goodfire",
    description: "Two smashed patties, sharp cheddar, and our signature ember sauce.",
    price: 14,
    rating: 4.9,
    reviewCount: 128,
    category: "Burgers",
    image: "/images/goodfire-double.svg",
    imageAlt: "Illustration of the Goodfire double cheeseburger",
    featured: true,
    ingredients: ["Dry-aged beef", "Aged cheddar", "Ember sauce", "Potato bun"],
    prepTime: "12 min",
    calories: 680,
  },
  {
    slug: "smokeshow",
    name: "The Smokeshow",
    description: "Peppery bacon, smoked gouda, and a little sweet heat.",
    price: 16,
    rating: 4.8,
    reviewCount: 94,
    category: "Burgers",
    image: "/images/smokeshow-burger.svg",
    imageAlt: "Illustration of a bacon and smoked gouda burger",
    ingredients: ["Smoked bacon", "Gouda", "Hot honey", "Beef patty"],
    prepTime: "14 min",
    calories: 740,
  },
  {
    slug: "garden-party",
    name: "Garden Party",
    description: "Crisp greens, pickled onion, and herby green goddess.",
    price: 13,
    rating: 4.7,
    reviewCount: 73,
    category: "Burgers",
    image: "/images/garden-party.svg",
    imageAlt: "Illustration of a fresh green veggie burger",
    ingredients: ["House veggie patty", "Baby greens", "Pickled onion", "Herb mayo"],
    prepTime: "11 min",
    calories: 520,
  },
  {
    slug: "truffle-fries",
    name: "Truffle Fries",
    description: "Hand-cut, twice-cooked, and showered in parmesan.",
    price: 8,
    rating: 4.9,
    reviewCount: 116,
    category: "Snacks",
    image: "/images/truffle-fries.svg",
    imageAlt: "Illustration of golden truffle parmesan fries",
    featured: true,
    ingredients: ["Hand-cut potatoes", "Truffle oil", "Parmesan", "Parsley"],
    prepTime: "8 min",
    calories: 390,
  },
  {
    slug: "peach-fizz",
    name: "Texas Peach Fizz",
    description: "Hill Country peaches, lemon, and a lively little sparkle.",
    price: 6,
    rating: 4.8,
    reviewCount: 61,
    category: "Drinks",
    image: "/images/peach-fizz.svg",
    imageAlt: "Illustration of a sparkling peach soda with citrus",
    ingredients: ["Texas peach", "Fresh lemon", "Soda water", "Mint"],
    prepTime: "3 min",
    calories: 120,
  },
  {
    slug: "brown-butter-cookie",
    name: "Brown Butter Cookie",
    description: "Warm, gooey-centered, and finished with flaky salt.",
    price: 5,
    rating: 4.9,
    reviewCount: 88,
    category: "Dessert",
    image: "/images/brown-butter-cookie.svg",
    imageAlt: "Illustration of a warm chocolate chip cookie",
    ingredients: ["Brown butter", "Dark chocolate", "Vanilla", "Flaky salt"],
    prepTime: "6 min",
    calories: 310,
  },
  {
    slug: "little-gem-salad",
    name: "Little Gem Salad",
    description: "Crisp lettuce, sweet corn, pepitas, and lime ranch.",
    price: 10,
    rating: 4.6,
    reviewCount: 47,
    category: "Salad",
    image: "/images/little-gem-salad.svg",
    imageAlt: "Illustration of a fresh little gem salad",
    ingredients: ["Little gem lettuce", "Sweet corn", "Pepitas", "Lime ranch"],
    prepTime: "7 min",
    calories: 280,
  },
  {
    slug: "tomato-bisque",
    name: "Roasted Tomato Bisque",
    description: "Slow-roasted tomatoes, a swirl of cream, warm sourdough.",
    price: 9,
    rating: 4.7,
    reviewCount: 39,
    category: "Soup",
    image: "/images/tomato-bisque.svg",
    imageAlt: "Illustration of creamy roasted tomato soup",
    ingredients: ["Roasted tomatoes", "Sweet basil", "Cream", "Sourdough"],
    prepTime: "9 min",
    calories: 330,
  },
];

export const topSellers = menu.filter((item) =>
  ["the-goodfire", "smokeshow", "truffle-fries"].includes(item.slug),
);

export function getMenuItem(slug: string): MenuItem | undefined {
  return menu.find((item) => item.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
