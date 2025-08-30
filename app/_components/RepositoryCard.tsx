import React from "react";
import Link from "next/link";
import StarIcon from "@/app/_assets/svg/star.svg";
import CalendarIcon from "@/app/_assets/svg/calendar.svg";
import ForkIcon from "@/app/_assets/svg/fork.svg";
import { formatDate } from "date-fns";

const RepositoryCard = ({ repo }: { repo: TGithubRepo }) => {
  return (
    <div
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
    </div>
  );
};

export default RepositoryCard;
