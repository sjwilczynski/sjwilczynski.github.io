[![Deploy](https://github.com/sjwilczynski/sjwilczynski.github.io/actions/workflows/gh-pages-deploy.yml/badge.svg)](https://github.com/sjwilczynski/sjwilczynski.github.io/actions/workflows/gh-pages-deploy.yml)

# Responsive CV in React

The project is based on [startboootstrap-resume](https://github.com/BlackrockDigital/startbootstrap-resume).
I rewrote it in React using [CRA](https://create-react-app.dev/) and migrated to [Astro](https://docs.astro.build/en/getting-started/), removing 90% of my bundle, and improving Lighthouse performance score (for mobile variant) from 50% to 95%. In the end I would like to get rid React being a dependency but it stays for now until full migration is done

### Installation

To start using this for your own needs:

- clone the repository
- go to its directory and install all dependencies: `npm install`
- start the app using `npm start` and go to [http://localhost:3000/](http://localhost:3000/) to view your changes.

### Deploying to github pages

If you want just like me to publish your CV using [Github Pages](https://pages.github.com/) you should follow the steps
described [here](https://facebook.github.io/create-react-app/docs/deployment) and [here](https://dev.to/javascripterika/deploy-a-react-app-as-a-github-user-page-with-yarn-3fka).
Take caution as the steps depend on whether you use your [username.github.io]() repository or a different one.
