import Navbar from "@/app/_components/Navbar";
import GithubExplorer from "@/app/_components/GithubExplorer";

export default function Home() {
  return (
    <main className="bg-gray-900 text-gray-200  min-h-screen px-4 py-10 sm:px-10 md:px-16 lg:px-20 ">
      <Navbar />
      <GithubExplorer />
    </main>
  );
}
