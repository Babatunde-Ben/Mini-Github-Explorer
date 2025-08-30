import React, { useState } from "react";
import Button from "@/app/_components/Button";
import { signIn } from "next-auth/react";
import GithubLogo from "@/app/_assets/svg/github-logo.svg";
import GoogleLogo from "@/app/_assets/svg/google-logo.svg";

const Authentication = () => {
  const [processingProvider, setProcessingProvider] = useState<string | null>(
    null
  );

  const handleSignIn = async (provider: string) => {
    setProcessingProvider(provider);
    try {
      await signIn(provider);
    } catch (_) {
      setProcessingProvider(null);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-8 max-w-lg mx-auto">
      <h1 className="text-xl text-gray-200 text-center font-semibold mb-2">
        Login to Mini Github Explorer
      </h1>
      <p className="text-gray-400 text-center mb-10">
        Please select a provider to login
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="w-full">
          <Button
            onClick={() => handleSignIn("github")}
            disabled={processingProvider !== null}
          >
            <GithubLogo className="size-4 inline-block" />
            {processingProvider === "github" ? "Redirecting..." : "Github"}
          </Button>
        </div>
        <div className="w-full">
          <Button
            onClick={() => handleSignIn("google")}
            disabled={processingProvider !== null}
          >
            <GoogleLogo className="size-4 inline-block" />
            {processingProvider === "google" ? "Redirecting..." : "Google"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
