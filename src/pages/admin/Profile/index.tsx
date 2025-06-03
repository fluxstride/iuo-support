/* eslint-disable @typescript-eslint/no-explicit-any */
import { changePassword } from "@/api/auth";
import { updateUserProfile } from "@/api/profile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: "name is required.",
  }),
  email: z.string().min(1, {
    message: "email is required",
  }),
});

const passwordChangeFormShema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "current password is required.",
    }),
    newPassword: z.string().min(1, {
      message: "new password is required",
    }),
    confirmNewPassword: z.string().min(1, {
      message: "confirm new password is required",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "password don't match",
    path: ["confirmNewPassword"],
  });

const Profile = () => {
  return (
    <div>
      <h1 className="text-xl font-medium">Profile Information</h1>

      <Tabs defaultValue="account" className="mt-4">
        <TabsList className="sm:w-80">
          <TabsTrigger value="account" className="cursor-pointer">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="cursor-pointer">
            Password
          </TabsTrigger>
        </TabsList>

        <div className="mt-2">
          <TabsContent value="account">
            <h2 className="text-lg font-medium">Account</h2>

            <p className="mt-1">
              Make changes to your account here. Click save when you're done.
            </p>
            <ProfileUpdateForm />
          </TabsContent>

          <TabsContent value="password">
            <h2 className="text-lg font-medium">Password</h2>

            <p className="mt-1">
              Change your password here. After saving, you'll be logged out.
            </p>
            <PasswordChangeForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;

const ProfileUpdateForm = () => {
  const { user, setUser } = useAuth();

  const profileForm = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { mutate: updateProfile, isPending: isProfileUpdatePending } =
    useMutation({
      mutationFn: (data) => updateUserProfile(user.id, data),
      onSettled: async (data, error: any) => {
        if (error) {
          return toast.error(error.response.data.message);
        }
        toast.success("Profile updated successfully");
        setUser(data.profile);
      },
    });

  const onSubmitProfileUpdate = (data: z.infer<typeof ProfileFormSchema>) =>
    updateProfile(data as unknown as any);
  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmitProfileUpdate)}>
        <div className="flex flex-col gap-4 w-full sm:max-w-2xl mt-3">
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="role" className="text-base">
              Role
            </Label>
            <Input id="role" value={user.role} disabled />
          </div>

          <Button className="w-fit" size="lg" disabled={isProfileUpdatePending}>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

const PasswordChangeForm = () => {
  const passwordChangeForm = useForm<z.infer<typeof passwordChangeFormShema>>({
    resolver: zodResolver(passwordChangeFormShema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutate: changeProfilePassword, isPending: isPasswordResetPending } =
    useMutation({
      mutationFn: (data) => changePassword(data),
      onSettled: async (_, error: any) => {
        if (error) {
          return toast.error(error.response.data.message);
        }
        passwordChangeForm.reset();
        toast.success("Password changed successfully");
      },
    });

  const onSubmitPasswordReset = (
    data: z.infer<typeof passwordChangeFormShema>,
  ) => changeProfilePassword(data as unknown as any);

  return (
    <Form {...passwordChangeForm}>
      <form onSubmit={passwordChangeForm.handleSubmit(onSubmitPasswordReset)}>
        <div className="flex flex-col gap-4 w-full sm:max-w-2xl mt-3">
          <FormField
            control={passwordChangeForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Current Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={passwordChangeForm.control}
            name="newPassword"
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
            control={passwordChangeForm.control}
            name="confirmNewPassword"
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

          <Button
            className="w-fit cursor-pointer"
            size="lg"
            disabled={isPasswordResetPending}
          >
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};
