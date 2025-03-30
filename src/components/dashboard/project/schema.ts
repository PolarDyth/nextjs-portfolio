import { z } from "zod";
import { iconComponents, IconName } from "@/utils/string-to-icon";

const validIconNames = Object.keys(iconComponents) as [IconName, ...IconName[]];

// Create a zod schema for icon names
const iconNameSchema = z.enum(validIconNames);

const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
});

const statSchema = z.object({
  label: z.string().max(50),
  value: z.string().max(50),
  icon: z.object({
    name: iconNameSchema,
    styling: z.string().optional(),
  }),
});

const timelineSchema = z.object({
  title: z.string().max(50),
  date: z.string().max(50),
  description: z.string().max(1000),
});

const testimonialSchema = z.object({
  quote: z.string().max(1000),
  author: z.object({
    name: z.string().max(50),
    role: z.string().max(50),
    avatar: z.string().url(),
  }),
});

const insightsSchema = z.object({
  title: z.string().max(50),
  content: z.string().max(1000),
  icon: z.object({
    name: iconNameSchema,
    styling: z.string().optional(),
  }),
});

const dataSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  images: z.array(imageSchema),
  skills: z.array(z.string().max(50)),
  github: z.string().url(),
  liveLink: z.string().url(),
  features: z.array(z.string().max(50)),
  challenges: z.array(z.string().max(50)),
  learnings: z.array(z.string().max(50)),
  stats: z.array(statSchema),
  timeline: z.array(timelineSchema),
  testimonial: testimonialSchema,
  insights: z.array(insightsSchema),
  overview: z.string().max(1000),
  process: z.string().max(1000),
});

export const projectFormSchema = z.object({
  data: dataSchema,
  slug: z.string().min(3).max(100),
});