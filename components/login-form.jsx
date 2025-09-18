import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth } from "@/actions/auth-actions";

const FormSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();

  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data, event) {
    // Without event.preventDefault(), the form may submit in the traditional manner,
    // causing a page reload and preventing router.push() from executing
    event.preventDefault();

    console.log("CREATED A STUDY");
    console.log(data);
    console.log(JSON.stringify(data));

    router.push("/dashboard");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="auth-form" action={formAction} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            {formState.errors && (
              <ul id="form-errors">
                {Object.keys(formState.errors).map((error) => (
                  <li key={error}>{formState.errors[error]}</li>
                ))}
              </ul>
            )}
            <div className="mt-4 text-center text-sm">
              <p>
                {mode === "login" && (
                  <>
                    <p>Don&apos;t have an account? </p>
                    <Link
                      href="/?mode=signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {mode === "signup" && (
                  <Link href="/?mode=login">Login with existing account</Link>
                )}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
