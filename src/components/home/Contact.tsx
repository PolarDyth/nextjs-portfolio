"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitContactForm } from "./actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { contactInfo } from "@/constants/contact-info";

// Define contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  body: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contact = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      link: contactInfo.email,
      action: "mailto:",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      link: contactInfo.linkedin.replace(/^https?:\/\//i, ""),
    },
    {
      icon: <SiGithub className="h-5 w-5" />,
      title: "GitHub",
      link: contactInfo.github.replace(/^https?:\/\//i, ""),
    },
  ];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
        name: "",
        email: "",
        body: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      
      const result = await submitContactForm(values);
      
      if (result.success) {
        setIsSuccess(true);
        toast.success("Message sent successfully!");
        form.reset();
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("An error occurred while sending your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 my-8 sm:my-12 md:my-20 text-center px-4 sm:px-6"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Let&apos;s Work Together
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
        Have a project in mind or just want to connect? Feel free to reach out!
      </p>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center mx-auto gap-8 lg:gap-14 mt-8 max-w-3xl">
        {/* Contact Info */}
        <div className="space-y-4 sm:space-y-6 w-full lg:w-auto">
          {contact.map((prop, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 sm:gap-4 text-left">
                <Link
                  href={
                    prop.action
                      ? prop.action + prop.link
                      : prop.link.startsWith("http")
                      ? prop.link
                      : "https://" + prop.link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/20 p-3 sm:p-4 rounded-lg text-primary hover:bg-primary/50 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                >
                  {prop.icon}
                </Link>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">{prop.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm truncate max-w-[180px] sm:max-w-[220px]">
                    {prop.link}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-3 sm:space-y-4 w-full lg:w-1/2 mt-8 lg:mt-0"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      className="h-10 sm:h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-left" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="h-10 sm:h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-left" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      className="min-h-[100px] sm:min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-left" />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full cursor-pointer h-10 sm:h-11 mt-2"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Message Sent
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}