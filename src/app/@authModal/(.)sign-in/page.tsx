import CloseModal from "@/components/CloseModal";
import SignIn from "@/components/SignIn";
import React from "react";

// intersects and renders out the sign-in modal

const page = () => {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20">
      <div className="container flex items-center h-full max-w-lg bg-gray-400">
        <div className="relative w-full px-2 py-20 rounded-lg bg-red h-fit ">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default page;
