# Personal Portfolio - Duc Le

A modern, responsive personal portfolio website featuring a sticky navbar, sidebar navigation, and dynamic content sections.

## Features

- **Sticky Navbar**: Fixed top navigation with quick links and social icons
- **Sidebar Navigation**: Detailed navigation with subsections and active section highlighting
- **Responsive Design**: Mobile-first approach with hamburger menu for mobile devices
- **Smooth Scrolling**: Enhanced user experience with smooth scroll animations
- **Interactive Elements**:
  - Blog post filtering by category
  - Project cards with case study links
  - Scroll-to-top button
  - Animated card reveals on scroll
- **Modern UI**: Clean design with hover effects and subtle shadows

## Sections

1. **About** ([index.html](index.html)): Hero section with avatar, experience timeline, education, and contact info
2. **Projects** ([projects.html](projects.html)): Detailed project pages with tech stacks, features, and results
3. **Publications** ([publications.html](publications.html)): Academic papers and research publications
4. **Blog** ([blog.html](blog.html)): Articles and case studies with filtering by category

### Blog Categories

The blog page includes filtering by the following categories:

- **All Posts**: Shows all blog articles (default view)
- **Projects**: Case studies and detailed write-ups about specific projects you've built
  - Example: "Building a Scalable E-Commerce Platform" - deep dive into architecture and implementation
- **Tutorials**: Step-by-step guides and how-to articles
  - Example: "Complete Guide to CI/CD with GitHub Actions" - practical tutorial for developers
- **Research**: Articles about research findings, academic topics, or experimental work
  - Example: "Latest Trends in Deep Learning for NLP" - exploration of research advances
- **Opinion**: Personal thoughts, perspectives, and opinion pieces on technology and development
  - Example: "The Future of Web Development: Trends to Watch in 2024"

Each blog post is tagged with one primary category and can include multiple technology tags (React, Python, Docker, etc.).

## Setup & Deployment

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ducln-me/ducln-me.git
   cd ducln-me
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

### Deploy to GitHub Pages

1. **Enable GitHub Pages** in your repository:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"

2. **Push your code**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

3. **Automatic Deployment**:
   - The GitHub Actions workflow will automatically deploy your site
   - Visit `https://ducln-me.github.io/ducln-me/` after deployment completes

## Data Management

This portfolio uses a **data-driven architecture** where all content is stored in JSON files and dynamically loaded using JavaScript. This approach provides several benefits:

- **Easy Content Updates**: Edit JSON files without touching HTML
- **Consistency**: Centralized data ensures consistency across pages
- **Maintainability**: Separate content from presentation
- **Scalability**: Add new items by simply adding JSON entries

### JSON Data Files

All data files are located in the `data/` folder:

#### `data/profile.json`
Contains personal information, experience, education, and skills:
```json
{
  "name": "Duc Le",
  "title": "Software Engineer & Researcher",
  "contact": { "email": "...", "linkedin": "...", "github": "..." },
  "experience": [...],
  "education": [...],
  "skills": {...}
}
```

#### `data/projects.json`
Contains all project details:
```json
{
  "projects": [
    {
      "id": "project-slug",
      "title": "Project Name",
      "technologies": [...],
      "features": [...],
      "results": {...}
    }
  ]
}
```

#### `data/publications.json`
Contains research papers and publications:
```json
{
  "publications": [
    {
      "title": "Paper Title",
      "authors": [...],
      "venue": "Conference Name",
      "year": "2023",
      "links": {...}
    }
  ]
}
```

#### `data/blog.json`
Contains blog post metadata:
```json
{
  "posts": [
    {
      "id": "post-slug",
      "title": "Post Title",
      "category": "tutorial",
      "excerpt": "...",
      "url": "blog/post-slug.html"
    }
  ]
}
```

## Customization

### Update Personal Information

Simply edit the JSON files in the `data/` folder to update your content. The JavaScript will automatically render the changes when you reload the page.

### Update Styles

Edit `styles.css` to customize:

- **Colors**: Modify CSS variables in `:root` section
- **Fonts**: Change font-family in body styles
- **Layout**: Adjust spacing, sizing, and responsive breakpoints

### Update JavaScript

- **`js/data-loader.js`**: Handles loading JSON data and rendering templates
  - Modify `Templates` object to customize HTML rendering
  - Update `PageInit` methods to change page initialization logic
- **`script.js`**: UI interactions and animations
  - Modify scroll spy and smooth scrolling behavior
  - Adjust blog filtering logic
  - Customize intersection observer effects

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies with JSON-based data loading
- **Font Awesome**: Icon library
- **GitHub Actions**: Automated deployment
- **JSON**: Data-driven content management

## File Structure

```
ducln-me/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── blog/
│   └── ecommerce-platform.html # Blog post detail pages
├── data/
│   ├── profile.json            # Personal information and contact
│   ├── projects.json           # Projects data
│   ├── publications.json       # Publications and research papers
│   └── blog.json               # Blog posts metadata
├── js/
│   └── data-loader.js          # JSON data loading and rendering
├── index.html                   # About page
├── projects.html                # Projects page
├── publications.html            # Publications page
├── blog.html                    # Blog listing page
├── styles.css                   # Stylesheet
├── script.js                    # JavaScript functionality
└── README.md                    # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight: No heavy frameworks
- Fast loading: Minimal dependencies
- Optimized: Lazy loading for images
- Smooth animations: CSS transitions and transforms

## Responsive Breakpoints

- Desktop: > 1024px (Navbar + Sidebar visible)
- Tablet: 768px - 1024px (Collapsible sidebar)
- Mobile: < 768px (Hamburger menu)

## Contributing

Feel free to fork this repository and customize it for your own portfolio!

## License

MIT License - feel free to use this template for your personal portfolio.

## Contact

- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- GitHub: [ducln-me](https://github.com/ducln-me)

---

Built with care by Duc Le
