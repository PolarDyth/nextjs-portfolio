import { 
  Clock, Calendar, Users, User, Code, FileCode, 
  BarChart, BarChart2, Activity, TrendingUp, TrendingDown, 
  CheckCircle, Award, Star, ThumbsUp, Heart, ShieldCheck, 
  Percent, Zap, PieChart, Monitor, Cpu, Database, Globe, 
  DollarSign, Layers, Check, CircleHelp, Rocket, Briefcase,
  Github, Lightbulb
} from "lucide-react";
import { JSX } from "react";
import { SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNextdotjs, SiTailwindcss, SiFigma } from "@icons-pack/react-simple-icons";

// Create a mapping of string names to icon components
const iconComponents = {
  // Lucide icons
  clock: Clock,
  calendar: Calendar,
  users: Users,
  user: User,
  code: Code,
  fileCode: FileCode,
  barChart: BarChart,
  barChart2: BarChart2,
  activity: Activity,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  checkCircle: CheckCircle,
  award: Award,
  star: Star,
  thumbsUp: ThumbsUp,
  heart: Heart,
  shieldCheck: ShieldCheck,
  percent: Percent,
  zap: Zap,
  pieChart: PieChart,
  monitor: Monitor,
  cpu: Cpu,
  database: Database,
  globe: Globe,
  dollarSign: DollarSign,
  layers: Layers,
  check: Check,
  rocket: Rocket,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
  
  // Simple icons for tech logos
  github: Github,
  react: SiReact,
  nodejs: SiNodedotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss3,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  figma: SiFigma,
  null: "", // Fallback for null values
  
  // Add more mappings as needed
} as const;

// Export the type for use in validation schemas
export type IconName = keyof typeof iconComponents;

interface StringToIconProps {
  name: IconName;
  styling?: string;
}

export default function StringToIcon({ name, styling = "" }: StringToIconProps): JSX.Element {
  // Get the icon component by name
  const IconComponent = iconComponents[name];
  
  // If the icon name is not found in our mapping, return a fallback
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in StringToIcon component`);
    return <CircleHelp className={styling} />;
  }
  
  // Return the icon with the provided styling
  return <IconComponent className={styling} />;
}