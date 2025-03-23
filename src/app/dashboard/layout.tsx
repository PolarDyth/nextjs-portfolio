import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  )
}