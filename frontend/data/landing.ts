export type DrinkItem = {
  title: string;
  subtitle?: string;
  image: string;
};

export type BlogItem = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const landingData = {
  nav: {
    brand: "CoffeeCafe",
    links: [
      { label: "HOME", href: "#home" },
      { label: "SERVICE", href: "#service" },
      { label: "MENU", href: "#menu" },
      { label: "BLOG", href: "#blog" },
      { label: "CONTACT", href: "#contact" },
    ],
  },

  hero: {
    title: "Coffee\nCaffeine",
    subtitle: "We Can Make Better",
    bannerImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
  },

  story: {
    title: "Our Story",
    body: "We serve coffee with personality — roasted with precision, brewed with care, and finished with a signature aroma that makes every sip feel special. From classic espresso to creative blends, everything is crafted to taste premium, warm and unforgettable.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    decor:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
  },

  drinks: {
    title: "Our Delight Drinks",
    desc: "Explore our signature drinks — crafted for comfort, flavor and that perfect caffeine kick.",
    bigImage:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        title: "Hot\nCoffee",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "CAPPUCCINO\nCUP",
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "Cold\nCoffee",
        image:
          "https://images.unsplash.com/photo-1523942839745-7848d68bd971?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "Americano\nCoffee",
        image:
          "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=700&q=80",
      },
    ] as DrinkItem[],
  },

  specialty: {
    title: "Our Specialty",
    desc: "A curated gallery of flavors, textures and moments — coffee done right.",
    images: [
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?auto=format&fit=crop&w=800&q=80",
    ],
    decor:
      "https://images.unsplash.com/photo-1528740096961-379f4c7b1cda?auto=format&fit=crop&w=700&q=80",
  },

  cta: {
    kicker: "Check Out Our Best",
    title: "Coffee Beans",
    button: "READ MORE",
    texture:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1400&q=80",
    decorLeft:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
    decorRight:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
  },

  blog: {
    title: "Our Delight Blog",
    desc: "Fresh stories, coffee tips and cozy moments — served weekly.",
    items: [
      {
        title: "Coffee Rituals",
        excerpt:
          "Small habits that upgrade your coffee routine — from grind to pour.",
        image:
          "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
      {
        title: "Brew Like a Pro",
        excerpt:
          "A simple guide to balance strength, aroma and crema in every cup.",
        image:
          "https://images.unsplash.com/photo-1504630083234-14187a9c8213?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
      {
        title: "Beans & Notes",
        excerpt:
          "Discover flavor notes and how roasting changes the final taste.",
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
    ] as BlogItem[],
  },

  footer: {
    brand: "CoffeeCafe",
    cols: [
      {
        title: "Primary",
        links: [
          { label: "Home", href: "#home" },
          { label: "Service", href: "#service" },
          { label: "Menu", href: "#menu" },
        ],
      },
      {
        title: "Menu",
        links: [
          { label: "Blog", href: "#blog" },
          { label: "Contact", href: "#contact" },
          { label: "Read More", href: "/" },
        ],
      },
    ],
  },
} as const;
