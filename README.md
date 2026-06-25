[![Deploy](https://github.com/sjwilczynski/sjwilczynski.github.io/actions/workflows/gh-pages-deploy.yml/badge.svg)](https://github.com/sjwilczynski/sjwilczynski.github.io/actions/workflows/gh-pages-deploy.yml)

# Responsive CV in Astro

This is my personal CV — a single-page resume built with [Astro](https://astro.build/) and [Bun](https://bun.sh/). All of the content (experience, education, skills, projects, interests, ...) lives in [Astro content collections](https://docs.astro.build/en/guides/content-collections/), so keeping it up to date is just a matter of editing data files.

It originally started as a React app (bootstrapped with Create React App, based on [startbootstrap-resume](https://github.com/BlackrockDigital/startbootstrap-resume)), but I've since migrated it fully to Astro and removed React and Bootstrap entirely. The result is a tiny static site that ships almost no JavaScript and currently scores ~99/100 for performance on mobile in Lighthouse.

### Installation

To run it locally:

- clone the repository
- install dependencies: `bun install`
- start the dev server: `bun start` and open [http://localhost:4321/](http://localhost:4321/)

### Deployment

The site is deployed to [GitHub Pages](https://pages.github.com/). On every push to the `source` branch, the [`gh-pages-deploy.yml`](.github/workflows/gh-pages-deploy.yml) GitHub Actions workflow installs dependencies with Bun, builds the site, generates the CV PDF, and publishes the `dist/` output to Pages — so there's nothing to deploy by hand. The deploy badge at the top of this README shows the status of the latest run.
