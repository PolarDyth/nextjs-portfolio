import { FileText, FolderPlus, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getUnreadMessagesCount } from "@/utils/supabase/user_messages/message.action.auth";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderPlus, label: "Projects", href: "/dashboard/projects" },
  { icon: FileText, label: "Blog Posts", href: "/dashboard/blog" },
  { icon: Users, label: "User Messages", href: "/dashboard/messages", notificationKey: "messages" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default async function AdminSidebar() {
  // Get the unread message count
  const unreadMessages = await getUnreadMessagesCount();
  
  // Create a notifications map
  const notifications: Record<string, number> = {
    messages: unreadMessages > 0 ? unreadMessages : 0
  };
  
  return (
    <div className="w-64 h-screen sticky my-6 top-0 border-r border-border p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8 px-2">
        <span className="text-primary text-xl font-bold">WILLIAMS</span>
        <span className="text-foreground text-xl font-bold">ADMIN</span>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item, index) => {
          const hasNotification = item.notificationKey && notifications[item.notificationKey] > 0;
          
          return (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md
                ${hasNotification ? 'bg-primary/5' : 'hover:bg-primary/10'} 
                text-muted-foreground hover:text-primary transition-colors
                relative
              `}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 ${hasNotification ? 'text-primary' : ''}`} />
                
                {hasNotification && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                )}
              </div>
              
              <span>{item.label}</span>
              
              {hasNotification && notifications[item.notificationKey] > 0 && (
                <Badge 
                  variant="default" 
                  className="ml-auto text-xs min-w-5 h-5 px-1.5 flex items-center justify-center"
                >
                  {notifications[item.notificationKey]}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}