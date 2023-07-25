"use client";

import React, { useState } from "react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Icons from "./Icons";
import { useToast } from "@/hooks/use-toast";

// this allows us to pass all the props divs typically have. The use case of this would be we can pass stuff from the parent into this div as props, and style the parent.
interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was a problem logging in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="w-4 h-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
