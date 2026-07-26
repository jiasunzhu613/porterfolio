# Jonathan Zhu's Portfolio

This is Jonathan Zhu's portfolio and personal site, built with [Hugo](https://gohugo.io/) and the [Hugo Bear Blog theme](https://github.com/janraasch/hugo-bearblog).

## Project structure

```text
.
├── site/
│   ├── hugo.toml                 # Hugo site configuration
│   ├── content/                  # Pages and posts
│   ├── layouts/                  # Site-specific template overrides
│   ├── static/                   # Files copied directly to the site
│   └── themes/hugo-bearblog/     # Bear Blog Git submodule
├── Justfile                      # Development commands
└── .github/workflows/ci.yml      # GitHub Pages deployment
```

## Requirements

- [Hugo Extended](https://gohugo.io/installation/)
- [just](https://github.com/casey/just)
- Git, including submodule support

After cloning, initialize the theme with:

```bash
git submodule update --init --recursive
```

## Development

```bash
just preview  # Start the local server
just build    # Build the production site
just new name # Create a blog post
just clean    # Remove generated output
```

The local site is available at `http://localhost:1313/`.

## Editing the site

The homepage is at `site/content/_index.md`. The Projects page is at `site/content/projects.md`.

Add images, PDFs, or other public files under `site/static/`. The resume is available at `site/static/resume.pdf`.

Site-specific styles are in `site/static/css/custom.css`. Bear Blog templates can be overridden by creating a file with the same path under `site/layouts/`. Avoid editing files directly inside `site/themes/hugo-bearblog/`, since it is a Git submodule.

## Deployment

Pushes to the `master` branch trigger `.github/workflows/ci.yml`. The workflow builds `site/` and deploys the generated output to GitHub Pages at:

<https://jiasunzhu613.github.io/porterfolio/>

## Updating the theme

```bash
git submodule update --remote site/themes/hugo-bearblog
git add site/themes/hugo-bearblog
git commit -m "Update Bear Blog theme"
```
