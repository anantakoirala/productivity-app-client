"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import { restApi } from "@/api";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/User/userSlice";

export type AuthContextValue = {
  email: string;
  name: string;
  image: string | null;
  completeOnBoarding: boolean;
  username: string;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    AuthContextValue | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await restApi.get("/api/auth/me");

        if (response.data.user) {
          const userData: AuthContextValue = {
            email: response.data.user?.email || "",
            name: response.data.user?.name || "",
            image: response.data.user?.image || null,
            completeOnBoarding: response.data.user?.completeOnBoarding,
            username: response.data.user?.username,
          };

          dispatch(
            setUserData({
              email: response.data.user.email,
              name: response.data.user.name,
              image: response.data.user.image || null,
              completeOnBoarding: response.data.user.completeOnBoarding,
              username: response.data.user.username,
            })
          );
          setAuthenticatedUser(userData);
        }
      } catch (error: any) {
        console.log("error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const contextValue = useMemo(() => authenticatedUser, [authenticatedUser]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
        {/* Spinner */}
        Loading...
      </div>
    );
  }

  return (
    <>
      {authenticatedUser && (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default React.memo(AuthProvider);
