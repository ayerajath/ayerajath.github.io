# Personal Blog

A personal blog built with React, Vite, and React Router. Features markdown blog posts and a clean, modern interface.

## Features

- 📝 Markdown blog posts
- 🎨 Modern, responsive design
- ⚡ Fast loading with Vite
- 📱 Mobile-friendly
- 🔍 SEO optimized

## Development

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayerajath/ayerajath.github.io.git
cd ayerajath.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Deployment

This project is configured for deployment to GitHub Pages.

### Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. Push your changes to the main branch
2. The GitHub Action will automatically build and deploy to `https://ayerajath.github.io`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Project Structure

```
ayerajath.github.io/
├── src/
│   ├── components/     # React components
│   ├── posts/         # Markdown blog posts
│   ├── App.js         # Main app component
│   └── index.js       # Entry point
├── .github/workflows/ # GitHub Actions
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Adding New Blog Posts

1. Create a new markdown file in the `src/posts/` directory
2. Use the existing posts as templates for the frontmatter format
3. The post will automatically appear in the blog list

## Technologies Used

- React 18
- Vite
- React Router DOM
- React Markdown
- GitHub Pages

## License

MIT 