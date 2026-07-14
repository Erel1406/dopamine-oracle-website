import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-noir px-5 text-sm text-white/60">
        Sign-in is not configured yet (missing Clerk keys).
      </main>
    );
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-noir px-5">
      <SignIn />
    </main>
  );
}
