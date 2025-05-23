import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import useLogin from "../hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/Loader";
import iuoLogo from "@/assets/iuo-logo.png";

const FormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export default function Login() {
  const { login, isLoggingIn } = useLogin();
  const [showPassword, setshowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => login(data);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/admin");
    }
  }, [user, loading, navigate]);

  if (loading || (!loading && !!user)) {
    return <Loader />;
  }

  return (
    <div>
      <Form {...form}>
        <div className="flex items-center p-4 sm:p-6 gap-2">
          <div className="w-15 h-15 p-1 rounded-full bg-[#261a6d]">
            <img src={iuoLogo} />
          </div>
          <p className="text-xl font-bold">IUO Support</p>
        </div>
        <Card className="mx-auto max-w-md mt-20">
          <CardHeader>
            <CardTitle className="text-xl">Admin Login</CardTitle>
            <CardDescription className="text-base">
              Enter your email and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asChild>
                        <div className="flex items-center justify-between">
                          <p className="text-base">Password</p>
                          <Link to="/forgot-password">
                            <p className="hover:underline cursor-pointer">
                              Forgot your password?
                            </p>
                          </Link>
                        </div>
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          <button
                            className="absolute top-1 right-2 p-1"
                            type="button"
                            onClick={() => {
                              setshowPassword((prev) => !prev);
                            }}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="w-5" />
                            ) : (
                              <Eye className="w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
