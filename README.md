# Reelview -- React + TypeScript + Vite + vitest

### Movie Recommendation Application

+ Overview

- This is a frontend movie recommendation application built as part of the SIL Frontend Engineer Assessment. The application allow users to browse, search, and view details of movies using data from The Movie Database (TMDB) API. It includes user authentication, a responsive UI, state management, unit tests, and CI/CD pipelines for automated testing and deployment.

+ Features





[x] Data Fetching: Fetches movie data from the TMDB API with caching to optimize performance.



[x] Authentication: Simple authentication implemented using Firebase Authentication (or preferred auth provider).



[x] User Interface:





Movie List: Displays a list of movies with title, poster, and overview.



Movie Details: Shows detailed movie information, including cast, crew, and ratings.



Search Functionality: Allows users to search movies by title or keyword.



Loaders: Visual indicators for data fetching.



Pagination: Supports paginated movie lists for performance optimization.



State Management: Uses a lightweight state management solution (e.g., Redux or Context API) to manage movie data and search queries.



Testing: Unit tests for key components and services using Jest and React Testing Library.



Code Quality: Written in TypeScript with clean, maintainable code following best practices.



CI/CD: Automated linting, testing, and deployment pipelines using GitHub Actions.



Deployment: Hosted on a free-tier service (e.g., Netlify or Vercel).

Tech Stack





Frontend Framework: React (with TypeScript)



UI Library: Tailwind CSS for styling



State Management: Context API (or Redux, depending on implementation)



Authentication: Firebase Authentication



API: The Movie Database (TMDB) API



Testing: Jest and React Testing Library



CI/CD: GitHub Actions



Deployment: Netlify (or Vercel)



Version Control: Git (hosted on GitHub)

Setup Instructions

Prerequisites





Node.js (v18 or later)



npm or Yarn



A TMDB API key (sign up at TMDB)



A Firebase project (for authentication, optional)

Installation





Clone the Repository:

git clone https://github.com/your-username/movie-recommendation-app.git
cd movie-recommendation-app



Install Dependencies:

npm install



Set Up Environment Variables: Create a .env file in the root directory and add the following:

REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id



Run the Development Server:

npm start

The app will be available at http://localhost:3000.



Build for Production:

npm run build

Project Structure

movie-recommendation-app/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components (e.g., MovieList, MovieDetails)
│   ├── services/           # API and auth services
│   ├── context/            # State management (if using Context API)
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Tailwind CSS and custom styles
│   ├── tests/              # Unit tests
│   └── App.tsx             # Main app component
├── .github/                # GitHub Actions workflows for CI/CD
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # This file

Development and Production Environments





Development Branch: main (or dev) - Contains the latest development code.



Production Branch: prod - Contains stable, production-ready code.



Commit Messages: Follows conventional commits (e.g., feat: add movie search functionality, fix: resolve pagination bug).

CI/CD Pipeline





Linting and Testing: A GitHub Actions workflow runs ESLint and Jest tests on every push to the main branch.



Deployment: A separate workflow deploys the app to Netlify (or Vercel) when changes are pushed to the prod branch, after passing linting and tests.

Testing

Run unit tests with:

npm test

Tests cover key components (e.g., MovieList, MovieDetails) and services (e.g., API fetching, caching).

Bonus Features





Design Thinking: Wireframes created in Figma (link to designs: [Figma URL]).



Recommendation Algorithm: Basic collaborative filtering based on genre preferences (optional).



Animations: Smooth transitions for movie list and details using CSS animations.



Performance Optimization: Lazy loading for movie posters and memoization for components.

Deployment

The application is deployed at: [Insert deployment URL, e.g., https://movie-recommendation-app.netlify.app]

Notes





Ensure you have a valid TMDB API key to fetch movie data.



Authentication requires a Firebase project setup for full functionality.



The app is optimized for desktop and mobile devices using Tailwind CSS responsive classes.

Future Improvements





Enhance the recommendation algorithm with user-based filtering.



Add offline support using service workers.



Implement more advanced animations with libraries like Framer Motion.

Contact

For any questions, reach out to [your-email@example.com] or open an issue in the repository.