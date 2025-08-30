# Mini GitHub Explorer

A modern, responsive web application built with Next.js that allows users to explore GitHub profiles and repositories. Search for any GitHub username to view their profile information, statistics, and latest repositories in a beautiful, dark-themed interface.

## ✨ Features

- **GitHub Profile Search**: Search for any GitHub user by username
- **Profile Information**: Display user avatar, bio, followers, following, and public repository count
- **Latest Repositories**: Show the 5 most recently updated repositories with detailed information
- **Repository Details**: View repository name, description, programming language, star count, last updated date, and fork status
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with smooth hover effects and transitions
- **Error Handling**: User-friendly error messages for invalid usernames and network issues
- **Authentication Ready**: Built-in authentication system with GitHub and Google OAuth support

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5.2 with App Router
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Authentication**: NextAuth.js
- **Icons**: Custom SVG icons
- **Date Formatting**: date-fns

## 📋 Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (version 18.17 or later)
- [npm](https://www.npmjs.com/)
- A GitHub account (for testing the search functionality)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Babatunde-Ben/Mini-Github-Explorer.git
   cd mini-github-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env

   # NextAuth.js
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # OAuth providers
   GITHUB_CLIENT_ID=your_github_oauth_app_id
   GITHUB_CLIENT_SECRET=your_github_oauth_app_secret
   GOOGLE_CLIENT_ID=your_google_oauth_app_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_app_secret
   ```

## 🏃‍♂️ Running the Project

1. **Development mode**

   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Start exploring!**

   Enter any GitHub username in the search field and click "Search" to view their profile and repositories.

## 📱 Usage

1. **Search for a GitHub user**: Enter a valid GitHub username in the search field
2. **View profile information**: See the user's avatar, bio, and statistics
3. **Explore repositories**: Browse through their latest 5 repositories
4. **Click repository links**: Visit repositories directly on GitHub
5. **Handle errors gracefully**: Get helpful messages for invalid usernames

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 API Endpoints Used

- `GET /api/users/{username}` - Fetch GitHub user information
- `GET /api/users/{username}/repos` - Fetch user repositories

## 🎨 Customization

The project uses Tailwind CSS for styling. You can customize:

- Colors in `global.css`
- Component styles in individual component files
- Layout and spacing in the main page component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various open source icon sets
- GitHub API for user and repository data

---

**Happy exploring! 🚀**
