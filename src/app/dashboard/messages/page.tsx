import { formatDistanceToNow } from "date-fns";
import { MailOpen, Trash2, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserMessages } from "@/utils/supabase/user_messages/message.data";
import { Message } from "@/utils/supabase/user_messages/definitions";
import EmptyState from "@/components/dashboard/messages/empty-state";
import {
  deleteMessage,
  markAsRead,
} from "@/utils/supabase/user_messages/message.action.auth";
import { Suspense } from "react";
import MessagesLoading from "@/components/dashboard/messages/messages-loading";

export default async function MessagesPage() {
  const messages = await getUserMessages();

  return (
    <main className="w-full flex flex-col items-center pt-20">
      <div className="container max-w-5xl py-8 space-y-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              View and manage messages from your contact form
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal px-2 py-1">
              {messages.length} Total
            </Badge>
            <Badge variant="secondary" className="font-normal px-2 py-1">
              {messages.filter((msg) => !msg.read).length} Unread
            </Badge>
          </div>
        </div>

        {messages.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No messages yet"
            description="When someone sends you a message through your contact form, it will appear here."
          />
        ) : (
          <div className="grid gap-6">
            
            <Suspense fallback={<MessagesLoading />}>
            {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
            ))}
            </Suspense>
          </div>
        )}
      </div>
    </main>
  );
}

function MessageCard({ message }: { message: Message }) {
  return (
    <Card
      className={`transition-all ${
        message.read ? "bg-card" : "bg-primary/5 border-primary/20"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {!message.read && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
              {message.data.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <a
                href={`mailto:${message.data.email}`}
                className="text-primary hover:underline"
              >
                {message.data.email}
              </a>
            </CardDescription>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {message.created_at
              ? formatDistanceToNow(new Date(message.created_at), {
                  addSuffix: true,
                })
              : "Unknown date"}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="whitespace-pre-wrap text-sm">{message.data.body}</div>
      </CardContent>

      <CardFooter className="flex justify-between pt-1 border-t">
        <form>
          <Button
            formAction={async () => {
              "use server";
              if (message.id) {
                await markAsRead(message.id);
              }
            }}
            variant="ghost"
            size="sm"
            disabled={message.read}
            className={message.read ? "text-muted-foreground" : "text-primary"}
          >
            <MailOpen className="mr-2 h-4 w-4" />
            {message.read ? "Read" : "Mark as Read"}
          </Button>
          <Button
            formAction={async () => {
              "use server";
              if (message.id) {
                await deleteMessage(message.id);
              }
            }}
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
