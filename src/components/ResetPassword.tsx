/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Sparkle } from "lucide-react";
import { useParams } from "react-router";

const FormShema = z
  .object({
    password: z.string().min(1, {
      message: "New password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Nonfirm new password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const passwordResetForm = useForm<z.infer<typeof FormShema>>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { token } = useParams();

  console.log({ token });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resetPassword(token as string, data),
    onSettled: async (_, error: any) => {
      if (error) {
        return toast.error(error.response.data.message);
      }
      passwordResetForm.reset();
      toast.success("Password reset successfully");
    },
  });

  const onSubmit = (data: z.infer<typeof FormShema>) =>
    mutate(data as unknown as any);

  return (
    <>
      <div className="flex items-center p-4 sm:p-6">
        <Sparkle className="text-blue-500 w-10" />
        <p className="text-xl font-bold text-blue-500">AI Support</p>
      </div>
      <Card className="mx-auto max-w-md mt-20">
        <CardHeader>
          <CardTitle className="text-xl">Password Reset</CardTitle>
          <CardDescription className="text-base">
            Change your password here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordResetForm}>
            <form onSubmit={passwordResetForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 w-full sm:max-w-2xl">
                <FormField
                  control={passwordResetForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">New Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordResetForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-fit" size="lg" disabled={isPending}>
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
