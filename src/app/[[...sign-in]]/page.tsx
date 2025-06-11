"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log('User data:', user);
  const router = useRouter();

  useEffect(() => {
    console.log('isLoaded:', isLoaded);
    console.log('isSignedIn:', isSignedIn);
    console.log('user:', user);
    console.log('publicMetadata:', user?.publicMetadata);
    console.log('role:', user?.publicMetadata?.role);
  
    if (isLoaded && isSignedIn && user) {
      const role = user.publicMetadata.role;
      
      if (role) {
        console.log('Redirecting to:', `/${role}`);
        router.push(`/${role}`);
      } else {
        console.log('No role found in publicMetadata');
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-skyLight dark:bg-gray-900">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white dark:bg-gray-800 p-12 rounded-md shadow-2xl dark:shadow-gray-900/50 flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Image src="/logo.png" alt="" width={24} height={24} />
            Boardroom
          </h1>
          <h2 className="text-gray-400 dark:text-gray-300">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400 dark:text-red-300" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500 dark:text-gray-400">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              value="admin"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
            />
            <Clerk.FieldError className="text-xs text-red-400 dark:text-red-300" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500 dark:text-gray-400">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              value="admin"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
            />
            <Clerk.FieldError className="text-xs text-red-400 dark:text-red-300" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white my-1 rounded-md text-sm p-[10px] transition-colors cursor-pointer"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;