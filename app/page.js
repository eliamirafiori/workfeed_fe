import AuthForm from "@/components/auth_form";
import { LoginForm } from "@/components/login-form";

export default async function Home({ searchParams }) {
  const formMode = searchParams.mode || "login";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm mode={formMode} />
      </div>
    </div>
  );

  return <AuthForm mode={formMode} />;
}
