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
    <main className="bg-gray-900 text-gray-200  min-h-screen px-4 py-16 sm:px-10 md:px-16 lg:px-20 ">
      <section className=" max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <GithubIcon className="size-8 inline-block" />

          <h1 className="text-4xl font-bold text-center  flex items-center justify-center gap-2">
            Explore Github
          </h1>
        </div>
        <form className="flex gap-4" onSubmit={handleGithubSearch}>
          <div className="w-full h-20">
            <InputField
              type="text"
              placeholder="Enter Github Username"
              value={searchText}
              name="github-username"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="w-52 h-12">
            <Button disabled={loading || !searchText}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {githubUser && (
          <>
            <div className="mb-5 flex flex-col justify-centerf gap-5 md:flex-row md:items-start md:justify-start">
              <Image
                src={githubUser?.avatar_url || ""}
                alt="Github User"
                width={150}
                height={150}
                className="rounded-full md:shrink-0"
              />
              <div>
                <h2 className="text-xl font-bold mb-5 md:text-2xl">
                  {githubUser?.name}
                </h2>
                <p className="text-gray-500 font-medium">{githubUser?.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 text-center py-6 mb-5 border-y border-gray-800 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.following}
                </h3>
                <p className="text-gray-500 font-medium">Following</p>
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.followers}
                </h3>
                <p className="text-gray-500 font-medium">Followers</p>
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  {githubUser?.public_repos}
                </h3>
                <p className="text-gray-500 font-medium">Public Repositories</p>
              </div>
            </div>
            <div>
              {repositories?.length > 0 ? (
                <>
                  <h2 className="text-xl font-bold mb-5 md:text-2xl">
                    Latest Repositories
                  </h2>
                  <ul className="space-y-3">
                    {repositories?.map((repo) => (
                      <li
                        key={repo.id}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Link
                              href={repo?.html_url}
                              target="_blank"
                              className="text-blue-400 font-medium text-lg block mb-2 transition-colors duration-150 hover:text-blue-300 hover:underline"
                            >
                              {repo?.name}
                            </Link>
                            {repo?.description && (
                              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                                {repo?.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              {repo?.language && (
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
