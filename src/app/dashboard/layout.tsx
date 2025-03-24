import AdminSidebar from "@/components/admin/sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex just-center">
      <AdminSidebar />
      {children}
    </div>
  )
}