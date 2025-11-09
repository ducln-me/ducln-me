# Personal Portfolio - Duc Le Nguyen

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

1. **About**: Hero section with avatar, experience timeline, education, and contact info
2. **Projects**: Card-based layout showcasing projects with tech stacks and results
3. **Publications**: Academic papers and research publications
4. **Blog**: Filterable articles and case studies

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

## Customization

### Update Personal Information

Edit `index.html` to customize:

- **Name & Title**: Update in navbar logo, sidebar header, and hero section
- **Avatar Images**: Replace placeholder images with your photos
- **Social Links**: Update email, LinkedIn, and GitHub links
- **Experience**: Modify the timeline section with your work history
- **Education**: Update education cards with your degrees
- **Projects**: Add/remove project cards with your work
- **Publications**: Update with your research papers
- **Blog Posts**: Add your articles and case studies

### Update Styles

Edit `styles.css` to customize:

- **Colors**: Modify CSS variables in `:root` section
- **Fonts**: Change font-family in body styles
- **Layout**: Adjust spacing, sizing, and responsive breakpoints

### Update JavaScript

Edit `script.js` to customize:

- **Navigation behavior**: Modify scroll spy and smooth scrolling
- **Filters**: Adjust blog filtering logic
- **Animations**: Customize intersection observer effects

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icon library
- **GitHub Actions**: Automated deployment

## File Structure

```
ducln-me/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── index.html                   # Main HTML file
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

Built with care by Duc Le Nguyen
