# Recro.com

A [Next.js](https://nextjs.org/) + [TinaCMS](https://tina.io/) project with MongoDB, authentication, and TailwindCSS.

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have these installed on your system:

- **Node.js** v22 or higher → [download here](https://nodejs.org/)
- **npm** (comes with Node)
- **Git** (to clone the repo and work with TinaCMS)

---

### 2. Install Dependencies

Run the following command in the root(my-app) of the project to install all required packages:

```bash
npm install
```

---

## 3. Fill Out a `.env` File

Create a `.env` file in the root of the project.

You can use the provided `.env.example` as a template — copy all of the variables listed there into your new `.env` file and fill them out with the correct values for your environment.

---

## 4. Running the Server

Use the following commands depending on what you need:

- **Development server (Next.JS + TinaCMS)**
  ```bash
  npm run dev
  ```
- **Production server (Next.JS + TinaCMS)**
  ```bash
  npm run production
  ```
- **Build server (Next.JS + TinaCMS)**
  ```bash
  npm run build
  ```

---

## 5. Playwright Test

- **Use the following command to run all test:**

  ```bash
  npm run test:e2e
  ```

- **Run Specific Test File:**

  ```bash
     cd playwright
     npx playwright test playwright/tests/solutions.spec.js
  ```

- **Test Credentials**

  Some tests require authentication. Make a `.env` file in the Playwright directory. Set these environment variables:

  ```bash
     TEST_USER_EMAIL=your@email.com
     TEST_PASSWORD=yourpassword
  ```

---

## 6. Content Editing with TinaCMS

For detailed instructions on editing content through TinaCMS, see [Quick Guide](quickGuide.md)

**Quick access**: Navigate to /admin to enter edit mode.

---

## 📁 Project Structure

```
RecroWebsite/
├── src/
│   ├── components/         # React components
│   │   ├── Cards/          # Card components with modals
│   │   ├── Jobs/           # Job listings and modals
│   │   ├── Leadership/     # Leadership section with cards
│   │   ├── Learn.jsx       # Learn more component
│   │   ├── Partners/       # Partner grids and priority partners
│   │   ├── PerformanceGrid/# Performance grid component
│   │   ├── SolutionPage/   # Solution page components (Cards, Landing, Performances, Statements)
│   │   ├── SolutionsGrid/  # Solutions grid with cards
│   │   ├── Testimonies/    # Testimonies cards and modals
│   │   ├── common/         # Shared components (Modal, Button, etc.)
│   │   └── utils/          # Utility functions and helpers
│   ├── context/            # React context providers
│   │   └── auth.js         # Authentication context
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Next.js pages and API routes
│   │   ├── api/            # API endpoints (auth, jobs, etc.)
│   │   ├── admin/          # TinaCMS admin interface
│   │   ├── solutions/      # Dynamic solution pages
│   │   └── [page].jsx      # Dynamic page routes
│   └── styles/             # Global CSS and component styles
│       ├── globals.css     # Global styles and animations
│       ├── cards.css       # Card animation styles
│       └── gears.css       # Gear animation styles
├── content/                # TinaCMS markdown content
│   ├── pages/              # Page content (home, about, careers, etc.)
│   ├── partners/           # Partner information
│   ├── performance/        # Past performance documents
│   ├── solutions/          # Solution page content
│   ├── posts/              # Blog posts
│   ├── categories/         # Content categories
│   ├── nav/                # Navigation configuration
│   └── footer/             # Footer content
├── playwright/             # End-to-end tests
│   ├── tests/              # Test files
│   │   ├── fixtures/       # Test fixtures (auth helper)
│   │   └── solutions-slug/ # Solution page tests
│   └── playwright.config.js
├── public/                 # Static assets (images, fonts, etc.)
├── tina/                   # TinaCMS configuration
│   ├── config.js           # TinaCMS schema and collections
│   └── database.js         # Database configuration
├── .env                    # Environment variables (not in repo)
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Dependencies and scripts
└── quickGuide.md           # TinaCMS content editing guide
```
