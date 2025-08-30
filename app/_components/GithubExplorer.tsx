"use client";
import React from "react";
import Button from "@/app/_components/Button";
import LoaderIcon from "@/app/_assets/svg/loader.svg";
import { useSession } from "next-auth/react";
import RepositoryCard from "@/app/_components/RepositoryCard";
import StatisticsCard from "@/app/_components/StatisticsCard";
import EmptySearchResultCard from "@/app/_components/EmptySearchResultCard";
import Authentication from "@/app/_components/Authentication";
import Image from "next/image";
import InputField from "@/app/_components/InputField";
import { useState } from "react";

const GithubExplorer = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [githubUser, setGithubUser] = useState<TGithubUser | null>(null);
  const [repositories, setRepositories] = useState<TGithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch github user by username
  const fetchGithubUser = async (username: string) => {
    setLoading(true);
    setError(null);
    setGithubUser(null);
    setRepositories([]);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const result = await response.json();

      if (result.message) {
        setError(`"${username}" not found on GitHub`);
        return;
      }
      //   set github user
      setGithubUser(result);

      // Fetch repositories after getting user data
      if (result?.public_repos > 0) {
        await fetchRepositories(username);
      }
    } catch (_) {
      // set error message if failed to connect to GitHub
      setError("Failed to connect to GitHub. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // fetch 5 latest repositories
  const fetchRepositories = async (username: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      );
      const data = await response.json();
      if (data.message) {
        setRepositories([]);
        return;
      }
      // set repositories
      setRepositories(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleGithubSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.trim()) {
      fetchGithubUser(searchText);
    }
  };

  return (
    <section className=" max-w-2xl mx-auto">
      {!session ? (
        <Authentication />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center  flex items-center justify-center gap-2 mb-3">
            Mini Github Explorer
          </h1>
          <p className="text-gray-400 text-center mb-6 max-w-sm mx-auto">
            Search for a GitHub username to explore user details and public
            repositories instantly
          </p>
          <form
            className="flex flex-col gap-4 mb-10 sm:flex-row"
            onSubmit={handleGithubSearch}
          >
            <div className="w-full h-12">
              <InputField
                type="text"
                placeholder="Enter Github Username"
                value={searchText}
                name="github-username"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="w-full h-12 sm:w-48">
              <Button disabled={loading || !searchText}>
                {loading ? (
                  <LoaderIcon className="size-4 inline-block animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </form>

          {error && <EmptySearchResultCard errorMessage={error} />}

          {githubUser && (
            <>
              <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-start">
                <Image
                  src={githubUser?.avatar_url || ""}
                  alt="Github User"
                  width={110}
                  height={110}
                  className="rounded-full md:shrink-0"
                />
                <div>
                  <h2 className="text-xl font-bold mb-3 md:mb-5">
                    {githubUser?.name}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {githubUser?.bio || "No bio"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 text-center py-10 mb-10 border-y border-gray-800">
                <StatisticsCard
                  count={githubUser?.following}
                  title="Following"
                />
                <StatisticsCard
                  count={githubUser?.followers}
                  title="Followers"
                />
                <StatisticsCard
                  count={githubUser?.public_repos}
                  title="Public Repos"
                />
              </div>
              <div>
                {repositories?.length > 0 ? (
                  <>
                    <h2 className="text-lg font-bold mb-5">
                      Latest Repositories
                    </h2>
                    <div className="space-y-3">
                      {repositories?.map((repo) => (
                        <RepositoryCard key={repo.id} repo={repo} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    {githubUser?.public_repos === 0
                      ? "No public repositories found"
                      : "Loading repositories..."}
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default GithubExplorer;
