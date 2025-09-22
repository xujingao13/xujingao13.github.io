# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an academic homepage built using the al-folio Jekyll theme, designed for researchers and academics to showcase their publications, projects, and professional information. The site belongs to Jingao Xu, a postdoctoral researcher at CMU's Living Edge Lab focusing on Edge Computing and Drone-based systems.

## Development Commands

### Local Development
- **Standard setup**: `bundle install && bundle exec jekyll serve --lsi`
- **Docker setup (recommended on Windows)**: `docker-compose up`
- **Custom Docker build**: `docker-compose -f docker-local.yml up`
- **Production build**: `bundle exec jekyll build --lsi`

### Key Development Notes
- The site uses Jekyll with Ruby and Bundler
- Development server runs on port 4000 (standard) or 8080 (Docker)
- The `--lsi` flag enables latent semantic indexing for better related posts
- Docker image `amirpourmand/al-folio` is used for containerized development

## Architecture and Structure

### Core Jekyll Structure
- `_config.yml`: Main configuration file with site settings, author info, and plugin configurations
- `_pages/`: Static pages including About, Publications, Awards, Services, etc.
- `_layouts/`: HTML templates for different page types (about, post, cv, etc.)
- `_includes/`: Reusable HTML components and partials
- `_sass/`: Sass stylesheets for theming and layout
- `_data/`: Data files (coauthors.yml, cv.yml, repositories.yml, venues.yml)

### Content Management
- `_bibliography/papers.bib`: BibTeX file for automatic publication generation
- `_news/`: Markdown files for news/announcement items
- `_projects/`: Project portfolio entries
- `_posts/`: Blog posts (standard Jekyll posts)
- `assets/`: Static assets including images, PDFs, CSS, JS

### Key Features
- **Publications**: Automatically generated from BibTeX with custom buttons (PDF, slides, code, etc.)
- **News section**: Academic announcements and updates
- **CV integration**: JSON-based resume data with multiple output formats
- **Repository showcase**: GitHub stats and repository display
- **Image optimization**: Responsive WebP image generation
- **Math support**: MathJax integration for mathematical expressions
- **Social media integration**: Multiple academic and social platforms

### Custom Plugins
- `cache-bust.rb`: Cache busting for assets
- `details.rb`: Custom details/summary HTML elements
- `external-posts.rb`: External blog post integration
- `file-exists.rb`: File existence checking utility
- `hideCustomBibtex.rb`: Custom BibTeX entry filtering

### Configuration Highlights
- **Author**: Jingao Xu (徐京傲) - Postdoctoral Researcher at CMU
- **Theme customization**: Purple theme with responsive design
- **Analytics**: Google Analytics integration (G-6HT0KWN8FY)
- **Scholar integration**: Google Scholar ID and publication management
- **Site deployment**: Configured for CMU personal pages (cs.cmu.edu/~jingaox)

### Important Directories
- Content is served from baseurl `/~jingaox` (CMU personal page structure)
- PDF files stored in `assets/pdf/` including CV and paper PDFs
- Images stored in `assets/img/` with WebP optimization enabled
- Site builds to `_site/` directory for deployment

### Development Workflow
- Make changes to source files
- Test locally with `bundle exec jekyll serve --lsi`
- Build for production with `bundle exec jekyll build --lsi`
- Deploy contents of `_site/` directory to web server