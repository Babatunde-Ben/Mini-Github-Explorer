"use client";
import Image from "next/image";
import InputField from "@/app/_components/InputField";
import { useState } from "react";
import Button from "./_components/Button";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const handleGithubSearch = () => {
    console.log(searchText);
  };

  return (
    <main className="bg-gray-900 text-gray-200  min-h-screen px-4 py-16 sm:px-10 md:px-16 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-6">Explore Github</h1>
      <div className="flex gap-4">
        <div className="w-full h-12">
          <InputField
            type="text"
            placeholder="Enter Github Username"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="w-52 h-12">
          <Button onClick={handleGithubSearch}>Search</Button>
        </div>
      </div>
    </main>
  );
}
