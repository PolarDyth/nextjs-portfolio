import LoginForm from "@/components/ui/login-form";
import { Suspense } from "react";

export default function Page() {

  return (
    <Suspense fallback="Loading...">
      <LoginForm />
    </Suspense>
  );
}
