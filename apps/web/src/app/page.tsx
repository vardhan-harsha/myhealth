import { getSession } from "@helix/auth/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not logged in, redirect to login page
  redirect("/login");
}
