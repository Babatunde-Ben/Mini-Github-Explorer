type TGithubUser = {
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  name: string;
  bio: string | null;
};

type TGithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};
