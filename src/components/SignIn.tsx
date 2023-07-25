import React from "react";
import Icons from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container flex flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="w-6 h-6 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="max-w-xs mx-auto text-sm">
          By continuing, you are setting up a Breadit account and agreeing to
          our User Agreement and Privacy Policy.
        </p>
        <UserAuthForm />
        <p className="p-8 text-sm text-center text-zinc-700">
          New to Breadit?{" "}
          <Link
            href={"/sign-up"}
            className="text-sm underline hover:text-zinc-800 underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
