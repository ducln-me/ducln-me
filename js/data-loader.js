// ===== DATA LOADER AND RENDERER =====
// This module handles loading JSON data and rendering it into HTML templates

const DataLoader = {
    // Cache for loaded data
    cache: {},

    // Load JSON data with caching
    async loadJSON(url) {
        if (this.cache[url]) {
            return this.cache[url];
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache[url] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            return null;
        }
    },

    // Load all data
    async loadProfile() {
        return await this.loadJSON('data/profile.json');
    },

    async loadProjects() {
        return await this.loadJSON('data/projects.json');
    },

    async loadPublications() {
        return await this.loadJSON('data/publications.json');
    },

    async loadBlog() {
        return await this.loadJSON('data/blog.json');
    }
};

// ===== TEMPLATE RENDERERS =====

const Templates = {
    // Render navbar and sidebar profile section
    renderProfile(profile) {
        if (!profile) return;

        // Update navbar logo
        const navbarLogo = document.querySelector('.navbar-logo a');
        if (navbarLogo) {
            navbarLogo.textContent = profile.name;
        }

        // Update all sidebar headers
        const sidebarHeaders = document.querySelectorAll('.sidebar-header');
        sidebarHeaders.forEach(header => {
            const avatar = header.querySelector('.sidebar-avatar img');
            const name = header.querySelector('h2');
            const title = header.querySelector('.sidebar-title');

            if (avatar) avatar.src = profile.avatar;
            if (name) name.textContent = profile.name;
            if (title) title.textContent = profile.title;
        });

        // Update social links
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${profile.contact.email}`;
        });

        const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
        linkedinLinks.forEach(link => {
            link.href = profile.contact.linkedin;
        });

        const githubLinks = document.querySelectorAll('a[href*="github"]');
        githubLinks.forEach(link => {
            link.href = profile.contact.github;
        });
    },

    // Render hero section (About page)
    renderHero(profile) {
        if (!profile) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        const avatar = hero.querySelector('.hero-avatar img');
        const greeting = hero.querySelector('.hero-greeting');
        const subtitle = hero.querySelector('.hero-subtitle');
        const description = hero.querySelector('.hero-description');

        if (avatar) avatar.src = profile.avatar;
        if (greeting) greeting.textContent = profile.intro.greeting;
        if (subtitle) subtitle.textContent = profile.intro.subtitle;
        if (description) description.textContent = profile.intro.description;
    },

    // Render experience timeline
    renderExperience(experiences) {
        const timeline = document.querySelector('.timeline');
        if (!timeline || !experiences) return;

        timeline.innerHTML = experiences.map(exp => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${exp.position}</h3>
                    <div class="company">${exp.company}</div>
                    <div class="period">
                        <i class="fas fa-calendar"></i> ${exp.period}
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                    </div>
                    <p>${exp.description}</p>
                    <div class="technologies">
                        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Render education cards
    renderEducation(education) {
        const container = document.querySelector('.education-grid');
        if (!container || !education) return;

        container.innerHTML = education.map(edu => `
            <div class="education-card">
                <div class="education-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>${edu.degree}</h3>
                <div class="school">${edu.school}</div>
                <div class="year"><i class="fas fa-calendar"></i> ${edu.year}</div>
                <div class="gpa">GPA: ${edu.gpa}</div>
                <p class="thesis"><strong>Thesis:</strong> ${edu.thesis}</p>
                ${edu.achievements && edu.achievements.length > 0 ? `
                    <ul class="achievements">
                        ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    },

    // Render contact section
    renderContact(contact) {
        const contactSection = document.querySelector('#contact .contact-grid');
        if (!contactSection || !contact) return;

        contactSection.innerHTML = `
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            </div>
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fab fa-linkedin"></i>
                </div>
                <h3>LinkedIn</h3>
                <p><a href="${contact.linkedin}" target="_blank">View Profile</a></p>
            </div>
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fab fa-github"></i>
                </div>
                <h3>GitHub</h3>
                <p><a href="${contact.github}" target="_blank">@ducln-me</a></p>
            </div>
            <div class="contact-item">
                <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3>Location</h3>
                <p>${contact.location}</p>
            </div>
        `;
    },

    // Render projects (Projects page)
    renderProjects(projects) {
        const container = document.querySelector('.projects-container');
        const sidebar = document.querySelector('#projectsList');

        if (!projects || !projects.projects) return;

        // Render sidebar navigation
        if (sidebar) {
            sidebar.innerHTML = projects.projects.map(project => `
                <li><a href="#${project.id}" class="nav-link">${project.title}</a></li>
            `).join('');
        }

        // Render project sections
        if (container) {
            container.innerHTML = projects.projects.map(project => `
                <section id="${project.id}" class="project-section">
                    <div class="project-header">
                        <div class="project-category">${project.category}</div>
                        <h2>${project.title}</h2>
                        <p class="project-intro">${project.fullDescription}</p>
                    </div>

                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>

                    <div class="project-details">
                        <!-- Two Column Layout: Tech Stack & Features (Left) | Results (Right) -->
                        <div class="two-column-layout">
                            <div class="left-column">
                                <div class="detail-section">
                                    <h3><i class="fas fa-layer-group"></i> Tech Stack</h3>
                                    <div class="tech-stack-grid">
                                        ${Object.entries(project.techStack).map(([key, value]) => `
                                            <div class="tech-stack-item">
                                                <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                                <span>${value}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div class="detail-section">
                                    <h3><i class="fas fa-star"></i> Key Features</h3>
                                    <ul class="feature-list">
                                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>

                            <div class="detail-section">
                                <h3><i class="fas fa-chart-line"></i> Results & Impact</h3>
                                <div class="results-grid">
                                    ${project.results.metrics.map(metric => `
                                        <div class="result-card">
                                            <h3>${metric.value}</h3>
                                            <p>${metric.label}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                <ul class="improvements-list">
                                    ${project.results.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>

                        <!-- Challenges Section -->
                        ${project.challenges && project.challenges.length > 0 ? `
                            <div class="detail-section challenges-section">
                                <h3><i class="fas fa-exclamation-triangle"></i> Technical Challenges & Solutions</h3>
                                <div class="challenges-list">
                                    ${project.challenges.map(challenge => `
                                        <div class="challenge-item">
                                            <div class="challenge-problem">
                                                <i class="fas fa-times-circle"></i>
                                                <strong>Problem:</strong> ${challenge.problem}
                                            </div>
                                            <div class="challenge-solution">
                                                <i class="fas fa-check-circle"></i>
                                                <strong>Solution:</strong> ${challenge.solution}
                                            </div>
                                            ${challenge.blogLink ? `
                                                <a href="${challenge.blogLink}" class="challenge-blog-link">
                                                    <i class="fas fa-arrow-right"></i> Read detailed blog post
                                                </a>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Project Links -->
                        <div class="project-links">
                            ${project.links.github ? `<a href="${project.links.github}" class="btn-primary" target="_blank"><i class="fab fa-github"></i> View Code</a>` : ''}
                            ${project.links.demo ? `<a href="${project.links.demo}" class="btn-primary" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        </div>
                    </div>
                </section>
                <hr class="project-separator">
            `).join('');
        }
    },

    // Render publications (Publications page)
    renderPublications(data) {
        const container = document.querySelector('.publications-container');
        if (!container || !data || !data.publications) return;

        container.innerHTML = data.publications.map(pub => `
            <div class="publication-detail" data-year="${pub.year}" data-topic="${pub.topic}">
                <div class="publication-header">
                    <h2>${pub.title}</h2>
                    <div class="publication-meta">
                        <span class="pub-type">${pub.type}</span>
                        <span class="pub-venue"><i class="fas fa-university"></i> ${pub.venue}</span>
                        <span class="pub-year"><i class="fas fa-calendar"></i> ${pub.year}</span>
                        <span class="pub-citations"><i class="fas fa-quote-right"></i> ${pub.citations} citations</span>
                    </div>
                </div>

                <div class="publication-authors">
                    <strong>Authors:</strong> ${pub.authors.join(', ')}
                </div>

                <div class="publication-abstract">
                    <h3>Abstract</h3>
                    <p>${pub.abstract}</p>
                </div>

                <div class="publication-keywords">
                    ${pub.keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>

                ${pub.awards && pub.awards.length > 0 ? `
                    <div class="publication-awards">
                        ${pub.awards.map(award => `<span class="award-badge"><i class="fas fa-trophy"></i> ${award}</span>`).join('')}
                    </div>
                ` : ''}

                <div class="publication-links">
                    ${pub.links.paper ? `<a href="${pub.links.paper}" class="btn-primary" target="_blank"><i class="fas fa-file-pdf"></i> Read Paper</a>` : ''}
                    ${pub.links.code ? `<a href="${pub.links.code}" class="btn-primary" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                    ${pub.links.slides ? `<a href="${pub.links.slides}" class="btn-secondary" target="_blank"><i class="fas fa-presentation"></i> Slides</a>` : ''}
                    <button class="btn-secondary cite-btn" data-citation="${pub.citation}"><i class="fas fa-quote-left"></i> Cite</button>
                </div>
            </div>
        `).join('');

        // Add citation copy functionality
        document.querySelectorAll('.cite-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const citation = btn.getAttribute('data-citation');
                navigator.clipboard.writeText(citation).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            });
        });
    },

    // Render publications sidebar (years and topics)
    renderPublicationsSidebar(data) {
        if (!data || !data.publications) return;

        // Render years
        const yearsContainer = document.querySelector('#publicationYears');
        if (yearsContainer) {
            const years = [...new Set(data.publications.map(pub => pub.year))].sort((a, b) => b - a);
            yearsContainer.innerHTML = `
                <li><a href="#filter-all" class="nav-link active" data-year="all"><i class="fas fa-list"></i> All Publications</a></li>
                ${years.map(year => `
                    <li><a href="#filter-${year}" class="nav-link" data-year="${year}"><i class="fas fa-calendar"></i> ${year}</a></li>
                `).join('')}
            `;
        }

        // Render topics
        const topicsContainer = document.querySelector('#publicationTopics');
        if (topicsContainer) {
            const topicsMap = {
                'ml': 'Machine Learning',
                'systems': 'Systems',
                'nlp': 'NLP'
            };
            const topicsIcons = {
                'ml': 'fa-brain',
                'systems': 'fa-server',
                'nlp': 'fa-language'
            };
            const topics = [...new Set(data.publications.map(pub => pub.topic))];
            topicsContainer.innerHTML = topics.map(topic => `
                <li><a href="#filter-${topic}" class="nav-link" data-topic="${topic}"><i class="fas ${topicsIcons[topic] || 'fa-tag'}"></i> ${topicsMap[topic] || topic}</a></li>
            `).join('');
        }
    },

    // Render publications stats
    renderPublicationsStats(data) {
        const statsContainer = document.querySelector('.publication-stats');
        if (!statsContainer || !data) return;

        const stats = data.stats || {};
        const totalCitations = stats.totalCitations || 0;
        const conferencePublications = stats.conferencePublications || 0;
        const journalPublications = stats.journalPublications || 0;
        const oralPresentations = stats.oralPresentations || 0;
        const spotlightPapers = stats.spotlightPapers || 0;
        const posterPresentations = stats.posterPresentations || 0;
        const bestPaperAwards = stats.bestPaperAwards || 0;

        statsContainer.innerHTML = `
            <div class="stats-row">
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>${conferencePublications}</h3>
                    <p>Conference Papers</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <h3>${journalPublications}</h3>
                    <p>Journal Papers</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-quote-right"></i>
                    <h3>${totalCitations}</h3>
                    <p>Citations</p>
                </div>
            </div>
            <div class="stats-row">
                <div class="stat-card">
                    <i class="fas fa-microphone"></i>
                    <h3>${oralPresentations}</h3>
                    <p>Oral Presentations</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-star"></i>
                    <h3>${spotlightPapers}</h3>
                    <p>Spotlight Papers</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-image"></i>
                    <h3>${posterPresentations}</h3>
                    <p>Poster Presentations</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-award"></i>
                    <h3>${bestPaperAwards}</h3>
                    <p>Best Paper Awards</p>
                </div>
            </div>
        `;
    },

    // Render blog posts (Blog page)
    renderBlogPosts(data) {
        const container = document.querySelector('.blog-grid, .blog-articles-grid');
        if (!container || !data || !data.posts) return;

        container.innerHTML = data.posts.map(post => `
            <article class="blog-article-card" data-category="${post.category}">
                <div class="blog-article-image">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="category-badge ${post.category}">${post.categoryLabel}</div>
                </div>
                <div class="blog-article-content">
                    <div class="blog-meta">
                        <span class="post-date"><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span class="read-time"><i class="fas fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h2>${post.title}</h2>
                    <p>${post.excerpt}</p>
                    <div class="article-tags">
                        ${post.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="blog-detail.html?post=${post.id}" class="read-more-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
    },

    // Render blog popular posts sidebar
    renderBlogPopularPosts(data) {
        const popularPostsList = document.querySelector('.popular-posts');
        if (!popularPostsList || !data || !data.posts) return;

        // Get featured posts or top 3 posts
        const popularPosts = data.posts.filter(post => post.featured).slice(0, 3);

        popularPostsList.innerHTML = popularPosts.map(post => `
            <li><a href="blog-detail.html?post=${post.id}"><i class="fas fa-fire"></i> ${post.title}</a></li>
        `).join('');
    },

    // Initialize blog filters
    initBlogFilters() {
        const filterLinks = document.querySelectorAll('.filter-link');
        const blogArticles = document.querySelectorAll('.blog-article-card');

        if (filterLinks.length === 0 || blogArticles.length === 0) return;

        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active state
                filterLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const filterValue = link.getAttribute('data-filter');

                // Filter articles with animation
                blogArticles.forEach(article => {
                    const category = article.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        article.style.display = 'block';
                        setTimeout(() => {
                            article.style.opacity = '1';
                            article.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            article.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    },

    // Render blog detail page
    renderBlogDetail(post) {
        if (!post) return;

        // Update page title
        document.title = `${post.title} - Duc Le`;

        // Update header
        const headerSection = document.querySelector('.blog-detail-header');
        if (headerSection) {
            headerSection.innerHTML = `
                <div class="category-badge ${post.category}">${post.categoryLabel}</div>
                <h1>${post.title}</h1>
                <div class="blog-detail-meta">
                    <span class="post-date"><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span class="read-time"><i class="fas fa-clock"></i> ${post.readTime}</span>
                </div>
                ${post.image ? `
                    <div class="blog-detail-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                ` : ''}
                <div class="article-tags">
                    ${post.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                </div>
            `;
        }

        // Render content sections
        const contentContainer = document.querySelector('.blog-detail-content');
        if (contentContainer && post.sections) {
            contentContainer.innerHTML = post.sections.map(section => {
                let sectionHTML = `<section id="${section.id}" class="content-section">`;
                sectionHTML += `<h2>${section.title}</h2>`;

                if (section.content) {
                    // Parse markdown to HTML
                    let contentHTML = section.content;

                    // Replace code blocks with proper HTML (must be done first)
                    contentHTML = contentHTML.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, language, code) => {
                        const lang = language || 'plaintext';
                        const escapedCode = code
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;');
                        return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
                    });

                    // Replace inline code (backticks)
                    contentHTML = contentHTML.replace(/`([^`]+)`/g, '<code>$1</code>');

                    // Replace bold text (**text** or __text__)
                    contentHTML = contentHTML.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    contentHTML = contentHTML.replace(/__(.+?)__/g, '<strong>$1</strong>');

                    // Replace italic text (*text* or _text_)
                    contentHTML = contentHTML.replace(/\*(.+?)\*/g, '<em>$1</em>');
                    contentHTML = contentHTML.replace(/_(.+?)_/g, '<em>$1</em>');

                    // Replace double newlines with paragraph breaks
                    contentHTML = contentHTML.replace(/\n\n/g, '</p><p>');

                    // Replace single newlines with <br> tags
                    contentHTML = contentHTML.replace(/\n/g, '<br>');

                    sectionHTML += `<p>${contentHTML}</p>`;
                }

                // Render table
                if (section.table) {
                    sectionHTML += `<div class="table-container"><table class="content-table">`;

                    // Table header
                    if (section.table.headers) {
                        sectionHTML += `<thead><tr>`;
                        section.table.headers.forEach(header => {
                            sectionHTML += `<th>${header}</th>`;
                        });
                        sectionHTML += `</tr></thead>`;
                    }

                    // Table body
                    if (section.table.rows) {
                        sectionHTML += `<tbody>`;
                        section.table.rows.forEach(row => {
                            sectionHTML += `<tr>`;
                            row.forEach(cell => {
                                sectionHTML += `<td>${cell}</td>`;
                            });
                            sectionHTML += `</tr>`;
                        });
                        sectionHTML += `</tbody>`;
                    }

                    sectionHTML += `</table></div>`;
                }

                // Render nested list (phân cấp đầu mục)
                if (section.nestedList) {
                    const renderNestedList = (items, level = 0) => {
                        let html = `<ul class="nested-list level-${level}">`;
                        items.forEach(item => {
                            if (typeof item === 'string') {
                                html += `<li>${item}</li>`;
                            } else if (item.text) {
                                html += `<li>${item.text}`;
                                if (item.children && item.children.length > 0) {
                                    html += renderNestedList(item.children, level + 1);
                                }
                                html += `</li>`;
                            }
                        });
                        html += `</ul>`;
                        return html;
                    };

                    sectionHTML += renderNestedList(section.nestedList);
                }

                // Render subsections (for architecture, approach sections)
                if (section.subsections) {
                    section.subsections.forEach(subsection => {
                        sectionHTML += `<h3>${subsection.title}</h3>`;
                        sectionHTML += `<ul class="feature-list">`;
                        subsection.items.forEach(item => {
                            sectionHTML += `<li>${item}</li>`;
                        });
                        sectionHTML += `</ul>`;
                    });
                }

                // Render items (for challenges, best practices sections)
                if (section.items) {
                    section.items.forEach(item => {
                        if (item.title && item.problem && item.solution) {
                            // Challenge format
                            sectionHTML += `
                                <div class="challenge-item">
                                    <h3>${item.title}</h3>
                                    <div class="problem">
                                        <strong>Problem:</strong> ${item.problem}
                                    </div>
                                    <div class="solution">
                                        <strong>Solution:</strong> ${item.solution}
                                    </div>
                                </div>
                            `;
                        } else if (item.title && item.description) {
                            // Generic item format
                            sectionHTML += `
                                <div class="content-item">
                                    <h3>${item.title}</h3>
                                    <p>${item.description}</p>
                                </div>
                            `;
                        }
                    });
                }

                // Render metrics (for results sections)
                if (section.metrics) {
                    sectionHTML += `<div class="results-grid">`;
                    section.metrics.forEach(metric => {
                        sectionHTML += `
                            <div class="result-card">
                                <h3>${metric.value}</h3>
                                <p>${metric.label}</p>
                            </div>
                        `;
                    });
                    sectionHTML += `</div>`;
                }

                // Render improvements list
                if (section.improvements) {
                    sectionHTML += `<ul class="improvements-list">`;
                    section.improvements.forEach(improvement => {
                        sectionHTML += `<li>${improvement}</li>`;
                    });
                    sectionHTML += `</ul>`;
                }

                sectionHTML += `</section>`;
                return sectionHTML;
            }).join('');
        }

        // Generate table of contents
        const tocContainer = document.querySelector('.table-of-contents ul');
        if (tocContainer && post.sections) {
            tocContainer.innerHTML = post.sections.map(section => `
                <li><a href="#${section.id}">${section.title}</a></li>
            `).join('');
        }

        // Trigger Prism.js syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
};

// ===== PAGE-SPECIFIC INITIALIZERS =====

const PageInit = {
    // Initialize About page (index.html)
    async initAboutPage() {
        const profile = await DataLoader.loadProfile();
        if (profile) {
            Templates.renderProfile(profile);
            Templates.renderHero(profile);
            Templates.renderExperience(profile.experience);
            Templates.renderEducation(profile.education);
            Templates.renderContact(profile.contact);
        }
    },

    // Initialize Projects page
    async initProjectsPage() {
        const [profile, projects] = await Promise.all([
            DataLoader.loadProfile(),
            DataLoader.loadProjects()
        ]);

        if (profile) Templates.renderProfile(profile);
        if (projects) Templates.renderProjects(projects);
    },

    // Initialize Publications page
    async initPublicationsPage() {
        const [profile, publications] = await Promise.all([
            DataLoader.loadProfile(),
            DataLoader.loadPublications()
        ]);

        if (profile) Templates.renderProfile(profile);
        if (publications) {
            Templates.renderPublications(publications);
            Templates.renderPublicationsSidebar(publications);
            Templates.renderPublicationsStats(publications);
        }
    },

    // Initialize Blog page
    async initBlogPage() {
        const [profile, blog] = await Promise.all([
            DataLoader.loadProfile(),
            DataLoader.loadBlog()
        ]);

        if (profile) Templates.renderProfile(profile);
        if (blog) {
            Templates.renderBlogPosts(blog);
            Templates.renderBlogPopularPosts(blog);
            // Initialize filters after rendering
            setTimeout(() => Templates.initBlogFilters(), 100);
        }
    },

    // Initialize Blog Detail page
    async initBlogDetailPage() {
        // Get post ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');

        const [profile, blog] = await Promise.all([
            DataLoader.loadProfile(),
            DataLoader.loadBlog()
        ]);

        if (profile) Templates.renderProfile(profile);

        if (blog && postId) {
            const post = blog.posts.find(p => p.id === postId);
            if (post) {
                Templates.renderBlogDetail(post);
            } else {
                // Post not found
                const contentContainer = document.querySelector('.blog-detail-content');
                if (contentContainer) {
                    contentContainer.innerHTML = '<p>Blog post not found.</p>';
                }
            }
        }
    }
};

// ===== AUTO-INITIALIZE BASED ON PAGE =====
document.addEventListener('DOMContentLoaded', async () => {
    // Detect current page
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    try {
        if (page === 'index.html' || page === '') {
            await PageInit.initAboutPage();
        } else if (page === 'projects.html') {
            await PageInit.initProjectsPage();
        } else if (page === 'publications.html') {
            await PageInit.initPublicationsPage();
        } else if (page === 'blog.html') {
            await PageInit.initBlogPage();
        } else if (page === 'blog-detail.html') {
            await PageInit.initBlogDetailPage();
        } else {
            // For other pages, just load profile
            const profile = await DataLoader.loadProfile();
            if (profile) Templates.renderProfile(profile);
        }
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});
