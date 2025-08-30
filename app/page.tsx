"use client";
import Image from "next/image";
import InputField from "@/app/_components/InputField";
import { useState } from "react";
import Button from "./_components/Button";
import Link from "next/link";
import GithubIcon from "@/app/_assets/svg/github.svg";
import { formatDate } from "date-fns";
import CalendarIcon from "@/app/_assets/svg/calendar.svg";
import ForkIcon from "@/app/_assets/svg/fork.svg";
import StarIcon from "@/app/_assets/svg/star.svg";
import LoaderIcon from "@/app/_assets/svg/loader.svg";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [githubUser, setGithubUser] = useState<TGithubUser | null>(null);
  const [repositories, setRepositories] = useState<TGithubRepo[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch github user by username
  const fetchGithubUser = async (username: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const result = await response.json();
      if (result.message === "Not Found") {
        setGithubUser(null);
        return;
      }

      console.log("github user", result);
      setGithubUser(result);

      // Fetch repositories after getting user data
      if (result?.public_repos > 0) {
        console.log("fetching repositories");
        await fetchRepositories(username);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch latest repositories
  const fetchRepositories = async (username: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      );
      const data = await response.json();
      if (data.message === "Not Found") {
        setRepositories([]);
        return;
      }
      console.log("repositories", data);
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
    <main className="bg-gray-900 text-gray-200  min-h-screen px-4 py-10 sm:px-10 md:px-16 lg:px-20 ">
      <nav className="mb-10 flex items-center justify-center">
        <GithubIcon className="size-8 inline-block" />
      </nav>
      <section className=" max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-center  flex items-center justify-center gap-2">
            Mini Github Explorer
          </h1>
        </div>
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
                <p className="text-gray-500 font-medium">{githubUser?.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 text-center py-10 mb-10 border-y border-gray-800">
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.following}
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  Following
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.followers}
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  Followers
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.public_repos}
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  Public Repos
                </p>
              </div>
            </div>
            <div>
              {repositories?.length > 0 ? (
                <>
                  <h2 className="text-lg font-bold mb-5">
                    Latest Repositories
                  </h2>
                  <ul className="space-y-3">
                    {repositories?.map((repo) => (
                      <li
                        key={repo.id}
                        className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col justify-between gap-2 h-28">
                            <div>
                              <Link
                                href={repo?.html_url}
                                target="_blank"
                                className="text-blue-400 block mb-2 transition-colors duration-150 md:text-lg hover:text-blue-300 hover:underline"
                              >
                                {repo?.name}
                              </Link>

                              <p className="text-gray-400 text-sm line-clamp-2">
                                {repo?.description || "No description"}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              {repo?.language && (
                                <span className="flex items-center gap-1">
                                  <span className="size-1.5 bg-gray-400 rounded-full"></span>
                                  {repo?.language}
                                </span>
                              )}
                              <Link
                                href={repo?.html_url + "/stargazers"}
                                target="_blank"
                                className="flex items-center gap-1 transition-colors duration-150 hover:text-gray-300"
                              >
                                <StarIcon className="size-4 inline-block" />
                                {repo?.stargazers_count}
                              </Link>
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="size-4 inline-block" />
                                {formatDate(repo?.updated_at, "MMM d, yyyy")}
                              </span>
                              {repo?.fork && (
                                <Link
                                  href={repo?.html_url + "/forks"}
                                  target="_blank"
                                  className="flex items-center gap-1 transition-colors duration-150 hover:text-gray-300"
                                >
                                  <ForkIcon className="size-4 inline-block" />
                                  Fork
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
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
      </section>
    </main>
  );
}
