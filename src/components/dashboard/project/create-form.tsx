"use client";

import type React from "react";

import type { z } from "zod";
import { projectFormSchema } from "./schema";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSubmitProject } from "./actions";
import { toast } from "sonner";
import {
  Loader2,
  PlusCircle,
  X,
  RefreshCw,
  Plus,
  Trash2,
  ChevronRight,
  Sparkles,
  Camera,
  BarChart,
  Clock,
  Lightbulb,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StringToIcon, { iconComponents, IconName } from "@/utils/string-to-icon";

type FormValues = z.infer<typeof projectFormSchema>;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectCreateForm() {
  // Simple inputs
  const [skillInput, setSkillInput] = useState<string>("");
  const [featureInput, setFeatureInput] = useState<string>("");
  const [challengeInput, setChallengeInput] = useState<string>("");
  const [learningInput, setLearningInput] = useState<string>("");

  // Form state
  const [autoSlug, setAutoSlug] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("basic");

  const form = useForm<FormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      data: {
        title: "",
        description: "",
        images: [{ src: "", alt: "", description: "" }],
        skills: [],
        github: "",
        liveLink: "",
        features: [],
        challenges: [],
        learnings: [],
        stats: [{ label: "", value: "", icon: { name: "lightbulb" } }],
        timeline: [{ title: "", date: "", description: "" }],
        testimonial: {
          quote: "",
          author: {
            name: "",
            role: "",
            avatar: "",
          },
        },
        insights: [{ title: "", content: "", icon: { name: "barChart" } }],
        overview: "",
        process: "",
      },
      slug: "",
    },
  });

  // Set up field arrays for repeatable sections
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control: form.control, name: "data.images" });

  const {
    fields: statFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({ control: form.control, name: "data.stats" });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({ control: form.control, name: "data.timeline" });

  const {
    fields: insightFields,
    append: appendInsight,
    remove: removeInsight,
  } = useFieldArray({ control: form.control, name: "data.insights" });

  const { watch, setValue, getValues, handleSubmit, control } = form;

  const title = watch("data.title");
  const skills = watch("data.skills");
  const features = watch("data.features");
  const challenges = watch("data.challenges");
  const learnings = watch("data.learnings");

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [title, autoSlug, setValue]);

  // Generate random slug
  const generateRandomSlug = () => {
    const randomStr = Math.random().toString(36).substring(2, 10);
    const prefix = getValues("data.title")
      ? getValues("data.title")
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 10)
      : "project";

    const newSlug = `${prefix}-${randomStr}`;
    setValue("slug", newSlug, { shouldValidate: true });

    // Show toast notification
    toast.success("Random slug generated!");
  };

  // Generic function to add items to simple array fields (strings)
  const addToArray = (
    arrayName:
      | "data.skills"
      | "data.features"
      | "data.challenges"
      | "data.learnings",
    input: string,
    watcher: string[],
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmedInput = input.trim();
    if (trimmedInput && !watcher.includes(trimmedInput)) {
      setValue(arrayName, [...(watcher || []), trimmedInput], {
        shouldValidate: true,
      });
      setInput("");
    }
  };

  // Helper functions for simple arrays
  const addSkill = () =>
    addToArray("data.skills", skillInput, skills, setSkillInput);
  const removeSkill = (skill: string) =>
    setValue(
      "data.skills",
      skills.filter((s) => s !== skill),
      { shouldValidate: true }
    );

  const addFeature = () =>
    addToArray("data.features", featureInput, features, setFeatureInput);
  const removeFeature = (feature: string) =>
    setValue(
      "data.features",
      features.filter((f) => f !== feature),
      { shouldValidate: true }
    );

  const addChallenge = () =>
    addToArray(
      "data.challenges",
      challengeInput,
      challenges,
      setChallengeInput
    );
  const removeChallenge = (challenge: string) =>
    setValue(
      "data.challenges",
      challenges.filter((c) => c !== challenge),
      { shouldValidate: true }
    );

  const addLearning = () =>
    addToArray("data.learnings", learningInput, learnings, setLearningInput);
  const removeLearning = (learning: string) =>
    setValue(
      "data.learnings",
      learnings.filter((l) => l !== learning),
      { shouldValidate: true }
    );

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting form with values:", values);

      // Make sure values has both data and slug
      if (!values.slug) {
        const randomStr = Math.random().toString(36).substring(2, 8);
        const prefix = values.data.title
          ? values.data.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .substring(0, 10)
          : "project";

        values.slug = `${prefix}-${randomStr}`;
      }

      // Call server action
      const result = await handleSubmitProject(values);
      console.log("Server response:", result);

      // Check if we have a result object
      if (result) {
        if (result.success) {
          toast.success(result.message);
          form.reset();
        } else {
          // We have an error response
          toast.error(result.message || "Failed to create project");

          // If there are field-specific errors, you could display them
          if (result.errors) {
            console.error("Form validation errors:", result.errors);
          }
        }
      } else {
        // No result object at all
        toast.error("No response from server");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(`Error: ${(error as Error).message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tab icon based on tab name
  const getTabIcon = (tabName: string) => {
    switch (tabName) {
      case "basic":
        return <Sparkles className="h-4 w-4 mr-2" />;
      case "content":
        return <ChevronRight className="h-4 w-4 mr-2" />;
      case "media":
        return <Camera className="h-4 w-4 mr-2" />;
      case "additional":
        return <BarChart className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl py-10 min-w-3xl min-h-screen mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Card className="border-border/40 shadow-xl bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
          <CardHeader className="pb-4 space-y-2">
            <motion.div variants={slideUp}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Create New Project
              </CardTitle>
            </motion.div>
            <motion.div variants={slideUp}>
              <CardDescription className="text-muted-foreground/90 text-base">
                Add a new project to your portfolio with complete details
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Tabs
                  defaultValue="basic"
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="mb-6 w-full justify-start overflow-auto p-1 bg-muted/50 rounded-lg">
                    {["basic", "content", "media", "additional"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`
                          data-[state=active]:bg-background 
                          data-[state=active]:text-foreground 
                          data-[state=active]:shadow-sm
                          transition-all duration-200 ease-in-out
                          flex items-center
                          ${
                            activeTab === tab
                              ? "font-medium"
                              : "text-muted-foreground"
                          }
                        `}
                      >
                        {getTabIcon(tab)}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* BASIC INFO TAB */}
                  <TabsContent value="basic" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormField
                        control={control}
                        name="data.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Project Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="My Awesome Project"
                                {...field}
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="auto-slug"
                            checked={autoSlug}
                            onCheckedChange={setAutoSlug}
                            className="data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor="auto-slug" className="font-medium">
                            Auto-generate slug from title
                          </Label>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateRandomSlug}
                          className="flex items-center text-xs hover:bg-muted/80 transition-all duration-200"
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Generate Random
                        </Button>
                      </div>

                      <FormField
                        control={control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              URL Slug
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="my-project-slug"
                                {...field}
                                disabled={autoSlug}
                                className={`
                                  focus-visible:ring-primary/50 h-11 transition-all duration-200
                                  ${
                                    autoSlug
                                      ? "bg-muted/50 text-muted-foreground"
                                      : ""
                                  }
                                `}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground/80">
                              This will be used in the URL:
                              example.com/projects/
                              <span className="font-mono text-primary/80">
                                {field.value || "my-project-slug"}
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <FormField
                        control={control}
                        name="data.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your project..."
                                {...field}
                                className="min-h-32 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <FormField
                        control={control}
                        name="data.github"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              GitHub URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://github.com/username/repo"
                                {...field}
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="data.liveLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Live Demo URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://my-project.com"
                                {...field}
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <FormField
                        control={control}
                        name="data.skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Skills Used
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Add a skill (e.g. React, TypeScript)"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addSkill())
                                }
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                              <Button
                                type="button"
                                onClick={addSkill}
                                size="icon"
                                variant="outline"
                                className="shrink-0 h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((skill) => (
                                  <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="gap-1 text-sm group py-1.5 px-3 bg-secondary/50 hover:bg-secondary/70 transition-all duration-200"
                                    >
                                      {skill}
                                      <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 rounded-full p-0.5 text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-muted-foreground text-sm italic">
                                  No skills added yet
                                </p>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* CONTENT TAB */}
                  <TabsContent value="content" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormField
                        control={control}
                        name="data.overview"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Project Overview
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Detailed overview of your project..."
                                {...field}
                                className="min-h-32 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <FormField
                        control={control}
                        name="data.process"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Development Process
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How you built the project..."
                                {...field}
                                className="min-h-32 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <FormField
                        control={control}
                        name="data.features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Key Features
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Add a feature"
                                value={featureInput}
                                onChange={(e) =>
                                  setFeatureInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addFeature())
                                }
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                              <Button
                                type="button"
                                onClick={addFeature}
                                size="icon"
                                variant="outline"
                                className="shrink-0 h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((feature) => (
                                  <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Badge
                                      variant="outline"
                                      className="gap-1 text-sm group py-1.5 px-3 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-200"
                                    >
                                      {feature}
                                      <button
                                        type="button"
                                        onClick={() => removeFeature(feature)}
                                        className="ml-1 rounded-full p-0.5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-muted-foreground text-sm italic">
                                  No features added yet
                                </p>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <FormField
                        control={control}
                        name="data.challenges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Challenges
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Add a challenge faced"
                                value={challengeInput}
                                onChange={(e) =>
                                  setChallengeInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addChallenge())
                                }
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                              <Button
                                type="button"
                                onClick={addChallenge}
                                size="icon"
                                variant="outline"
                                className="shrink-0 h-11 w-11 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((challenge) => (
                                  <motion.div
                                    key={challenge}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Badge
                                      variant="destructive"
                                      className="gap-1 text-sm group py-1.5 px-3 bg-destructive/80 hover:bg-destructive transition-all duration-200"
                                    >
                                      {challenge}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeChallenge(challenge)
                                        }
                                        className="ml-1 rounded-full p-0.5 hover:bg-destructive-foreground/10 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-muted-foreground text-sm italic">
                                  No challenges added yet
                                </p>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="data.learnings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Learnings
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Add what you learned"
                                value={learningInput}
                                onChange={(e) =>
                                  setLearningInput(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  (e.preventDefault(), addLearning())
                                }
                                className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                              />
                              <Button
                                type="button"
                                onClick={addLearning}
                                size="icon"
                                variant="outline"
                                className="shrink-0 h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((learning) => (
                                  <motion.div
                                    key={learning}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Badge
                                      variant="default"
                                      className="gap-1 text-sm group py-1.5 px-3 bg-primary/90 hover:bg-primary transition-all duration-200"
                                    >
                                      {learning}
                                      <button
                                        type="button"
                                        onClick={() => removeLearning(learning)}
                                        className="ml-1 rounded-full p-0.5 hover:bg-primary-foreground/10 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  </motion.div>
                                ))
                              ) : (
                                <p className="text-muted-foreground text-sm italic">
                                  No learnings added yet
                                </p>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </TabsContent>

                  {/* MEDIA TAB */}
                  <TabsContent value="media" className="space-y-6">
                    {/* Images Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Camera className="h-5 w-5 mr-2 text-primary/80" />
                        Project Images
                      </h3>
                      {imageFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="mb-6 p-5 border border-border/60 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={control}
                              name={`data.images.${index}.src`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Image URL
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://example.com/image.jpg"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name={`data.images.${index}.alt`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Alt Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Description of the image"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-5">
                            <FormField
                              control={control}
                              name={`data.images.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Image Description
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Detailed description of the image"
                                      {...field}
                                      className="min-h-20 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(index)}
                              disabled={imageFields.length <= 1}
                              className="opacity-90 hover:opacity-100 transition-opacity duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendImage({ src: "", alt: "", description: "" })
                        }
                        className="group hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />{" "}
                        Add Image
                      </Button>
                    </motion.div>

                    <Separator className="my-8" />

                    {/* Testimonial Section */}
                    <motion.div
                      className="space-y-5 border border-border/60 rounded-lg p-6 bg-gradient-to-b from-muted/10 to-muted/30 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="font-medium flex items-center text-lg">
                        <span className="inline-block mr-2 text-primary/80">
                          ❝
                        </span>
                        Testimonial
                      </h3>

                      <FormField
                        control={control}
                        name="data.testimonial.quote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Quote</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What someone said about this project..."
                                {...field}
                                className="min-h-24 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-5 md:grid-cols-3">
                        <FormField
                          control={control}
                          name="data.testimonial.author.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                Author Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Smith"
                                  {...field}
                                  className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="data.testimonial.author.role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                Author Role
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="CEO at Company"
                                  {...field}
                                  className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="data.testimonial.author.avatar"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                Author Avatar
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com/avatar.jpg"
                                  {...field}
                                  className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* ADDITIONAL DETAILS TAB */}
                  <TabsContent value="additional" className="space-y-8">
                    {/* Stats Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-primary/80" />
                        Project Stats
                      </h3>
                      {statFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="mb-6 p-5 border border-border/60 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={control}
                              name={`data.stats.${index}.label`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Label
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Users"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name={`data.stats.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Value
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="10,000+"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <FormField
                              control={control}
                              name={`data.stats.${index}.icon.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Icon
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-11 focus-visible:ring-primary/50 transition-all duration-200">
                                        <SelectValue placeholder="Select an icon">
                                          {field.value && (
                                            <div className="flex items-center gap-2">
                                              <StringToIcon
                                                name={field.value as IconName}
                                                styling="h-4 w-4"
                                              />
                                              <span className="capitalize">
                                                {field.value
                                                  .replace(/([A-Z])/g, " $1")
                                                  .trim()}
                                              </span>
                                            </div>
                                          )}
                                        </SelectValue>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-[320px]">
                                      {Object.entries(iconComponents)
                                        .filter(([name]) => name !== "null")
                                        .map(([iconName]) => (
                                          <SelectItem
                                            key={iconName}
                                            value={iconName}
                                            className="py-2.5"
                                          >
                                            <div className="flex items-center gap-2">
                                              <StringToIcon
                                                name={iconName as IconName}
                                                styling="h-4 w-4"
                                              />
                                              <span className="capitalize">
                                                {iconName
                                                  .replace(/([A-Z])/g, " $1")
                                                  .trim()}
                                              </span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name={`data.stats.${index}.icon.styling`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Icon Styling
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="text-blue-500"
                                      {...field}
                                      value={field.value || ""}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs">
                                    Optional CSS class for the icon
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeStat(index)}
                              disabled={insightFields.length <= 1}
                              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendStat({
                            label: "",
                            value: "",
                            icon: { name: "lightbulb", styling: "" },
                          })
                        }
                        className="group hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />{" "}
                        Add Stat
                      </Button>
                    </motion.div>

                    <Separator className="my-8" />

                    {/* Timeline Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary/80" />
                        Project Timeline
                      </h3>
                      {timelineFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="mb-6 p-5 border border-border/60 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={control}
                              name={`data.timeline.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Title
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Planning Phase"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name={`data.timeline.${index}.date`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Date
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="January 2023"
                                      {...field}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-5">
                            <FormField
                              control={control}
                              name={`data.timeline.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Description
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="What happened during this phase"
                                      {...field}
                                      className="min-h-20 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTimeline(index)}
                              disabled={timelineFields.length <= 1}
                              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendTimeline({
                            title: "",
                            date: "",
                            description: "",
                          })
                        }
                        className="group hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />{" "}
                        Add Timeline Item
                      </Button>
                    </motion.div>

                    <Separator className="my-8" />

                    {/* Insights Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-primary/80" />
                        Project Insights
                      </h3>
                      {insightFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="mb-6 p-5 border border-border/60 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <FormField
                            control={control}
                            name={`data.insights.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium">
                                  Title
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Key Insight"
                                    {...field}
                                    className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`data.insights.${index}.content`}
                            render={({ field }) => (
                              <FormItem className="mt-5">
                                <FormLabel className="font-medium">
                                  Content
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Detailed explanation of this insight"
                                    {...field}
                                    className="min-h-20 resize-none focus-visible:ring-primary/50 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <FormField
                              control={control}
                              name={`data.insights.${index}.icon.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Icon
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-11 focus-visible:ring-primary/50 transition-all duration-200">
                                        <SelectValue placeholder="Select an icon">
                                          {field.value && (
                                            <div className="flex items-center gap-2">
                                              <StringToIcon
                                                name={field.value as IconName}
                                                styling="h-4 w-4"
                                              />
                                              <span className="capitalize">
                                                {field.value
                                                  .replace(/([A-Z])/g, " $1")
                                                  .trim()}
                                              </span>
                                            </div>
                                          )}
                                        </SelectValue>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-[320px]">
                                      {Object.entries(iconComponents)
                                        .filter(([name]) => name !== "null")
                                        .map(([iconName]) => (
                                          <SelectItem
                                            key={iconName}
                                            value={iconName}
                                            className="py-2.5"
                                          >
                                            <div className="flex items-center gap-2">
                                              <StringToIcon
                                                name={iconName as IconName}
                                                styling="h-4 w-4"
                                              />
                                              <span className="capitalize">
                                                {iconName
                                                  .replace(/([A-Z])/g, " $1")
                                                  .trim()}
                                              </span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={control}
                              name={`data.insights.${index}.icon.styling`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium">
                                    Icon Styling
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="text-yellow-500"
                                      {...field}
                                      value={field.value || ""}
                                      className="focus-visible:ring-primary/50 h-11 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeInsight(index)}
                              disabled={insightFields.length <= 1}
                              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          appendInsight({
                            title: "",
                            content: "",
                            icon: { name: "lightbulb", styling: "" },
                          })
                        }
                        className="group hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />{" "}
                        Add Insight
                      </Button>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Project...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Create Project
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
