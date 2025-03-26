"use client";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useActionState } from "react";
import { handleSubmitProject, projectFormSchema } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

export default function ProjectCreateForm() {
  const [formSate, formAction, pending] = useActionState(handleSubmitProject, null);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
  });

  <Form {...form}>
    <form acion={formAction}></form>
  </Form>
}