import AdminSidebar from "@/components/admin/sidebar"
import { Toaster } from 'sonner';

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex just-center">
      <AdminSidebar />
      {children}
      <Toaster />
    </div>
  )
}