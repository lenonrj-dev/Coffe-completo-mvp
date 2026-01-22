import { posts } from "../../data/posts";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dateISO: string;
  category: string;
  readTime: string;
  content: string[];
};

function calcReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 180));
  return `${minutes} min`;
}

export const blogPosts: BlogPost[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  image: p.coverImage,
  dateISO: p.dateISO,
  category: p.category,
  readTime: calcReadTime(p.content),
  content: p.content.split("\n\n").filter(Boolean),
}));
