# Jonathan Zhu's Portfolio

This is Jonathan Zhu's portfolio and personal site, built with [Hugo](https://gohugo.io/) and the [Hugo Bear Blog theme](https://github.com/janraasch/hugo-bearblog).

## Project structure

```text
.
├── .github/workflows/ci.yml      # GitHub Pages deployment
├── site/
│   ├── hugo.toml                 # Hugo site configuration
│   ├── content/                  # Pages and posts
│   ├── layouts/                  # Site-specific template overrides
│   ├── static/                   # Files copied directly to the site
│   └── themes/hugo-bearblog/     # Bear Blog Git submodule
├── Justfile                      # Development commands
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

The GitHub activity calendar is refreshed during CI builds. Local builds use the
checked-in placeholder data in `site/data/github.json`. To refresh it locally, run:

```bash
GITHUB_ACTIVITY_TOKEN=your_token node scripts/fetch-github-contributions.mjs
```

The built-in Actions token includes public contribution activity. To include
private contribution counts, add a repository secret named `GH_ACTIVITY_TOKEN`
using a GitHub token with `read:user` access.

## Editing the site

The homepage is at `site/content/_index.md`. The Projects page is at `site/content/projects.md`.

Project entries accept separate optional `github` and `project` URLs. Each URL is
shown as its corresponding icon beside the project title:

```go-html-template
{{</* project title="Example" github="https://github.com/example/repo" project="https://example.com" technologies="Go" */>}}
Project description.
{{</* /project */>}}
```

Add images, PDFs, or other public files under `site/static/`. The resume is available at `site/static/resume.pdf`.

Site-specific styles are in `site/static/css/custom.css`. Bear Blog templates can be overridden by creating a file with the same path under `site/layouts/`. Avoid editing files directly inside `site/themes/hugo-bearblog/`, since it is a Git submodule.

## Deployment

Pushes to the `master` branch trigger `.github/workflows/ci.yml`. The workflow builds `site/` and deploys the generated output to GitHub Pages at:

<https://jiasunzhu613.github.io/porterfolio/>

The same workflow also refreshes and deploys the site nightly at 4:17 AM in the
`America/Toronto` time zone.

## Updating the theme

```bash
git submodule update --remote site/themes/hugo-bearblog
git add site/themes/hugo-bearblog
git commit -m "Update Bear Blog theme"
```
