import AdminSidebar from "@/components/dashboard/sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row min-h-screen pt-16">  {/* Add pt-16 to account for navbar height */}
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  )
}