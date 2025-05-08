import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const client = await createClient();

  const { data, error } = await client.from("projects").select("*");
  if (error) {
    throw error;
  }

  if (!data) {
    return new Response("No projects found", { status: 404 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
