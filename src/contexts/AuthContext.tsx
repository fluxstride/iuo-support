/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, ReactNode, useState } from "react";
import { getUserProfile } from "../api/profile";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { logoutUser } from "@/api/auth";

export type UserData = {
  id: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  firstName: string;
  lastName: string;
  dob: Date;
  schoolName: string;
  schoolDepartment: string;
};

export const authContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const { isLoading: loading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getUserProfile();
      setUser(response.profile);
      return response.profile;
    },

    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("logout failed");
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        loading,
        // error,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
