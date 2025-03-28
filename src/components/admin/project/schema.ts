import { z } from "zod";

const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
});

const statSchema = z.object({
  label: z.string().max(50),
  value: z.string().max(50),
  icon: z.object({
    name: z.string().max(50),
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
    name: z.string().max(50),
    styling: z.string().optional(),
  }),
});

const dataSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  images: z.array(imageSchema),
  skills: z.array(z.object({
    skill: z.string().max(50),})),
  github: z.string().url(),
  liveLink: z.string().url(),
  features: z.array(z.object({
    feature: z.string().max(50),})),
  challenges: z.array(z.object({
    challenge: z.string().max(50),})),
  learnings: z.array(z.object({
    learning: z.string().max(50),})),
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

export type State = {
  errors?: {
    [key: string]: string[] | null;
  }
  message?: string | null;
}