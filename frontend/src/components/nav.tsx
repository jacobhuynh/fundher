"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { SignedInNavigation } from "./signedInNavigation";

export default function Nav() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const userEmail = localStorage.getItem("userEmail");
      setIsSignedIn(!!userEmail);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <div>
      {isSignedIn ? (
        <SignedInNavigation setIsSignedIn={setIsSignedIn} />
      ) : (
        <Navigation />
      )}
    </div>
  );
}
