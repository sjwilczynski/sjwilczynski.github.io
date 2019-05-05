# Responsive CV in React

The project is based on [boootstrap-resume](https://github.com/BlackrockDigital/startbootstrap-resume).
I rewrote it in React to follow the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) rule and make use
of React's reusable components. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

To start using this for your own needs:

* clone the repository
* go to its directory and install all dependencies: `npm install --no-optional`
* start the app using `npm start`

### Deploying to github pages

If you want just like me to publish your CV using [Github Pages](https://pages.github.com/) you should follow the steps 
described [here](https://facebook.github.io/create-react-app/docs/deployment) and [here](https://dev.to/javascripterika/deploy-a-react-app-as-a-github-user-page-with-yarn-3fka).
Take caution as the steps depend on whether you use your [username.github.io]() repository or a different one.


## Usage

### Replacing data

To change the data presented by the app you have to change all the files in the [data](src/data) directory and the 
[Interest.js](src/components/sections/interests/Interests.js) file. In the latter you just replace the within <> and </> 
with your custom html.

* [basic-data.json](src/data/basic-data.json) - replace the self explanatory entries with your own data
* [achievements.json](src/data/achievements.json), [projects.json](src/data/projects.json) - in these files you can store 
a list of your achievements/projects. Each entry in the data section consists of _id_ which should be unique for every 
entry, _icon_ which is the name of the [FontAwesome](https://fontawesome.com/icons?d=gallery) icon you want to put before 
description, _iconStyle_ - css class for styling your icon (e.g some color) and _description_. Before data section you can 
also specify _listStyle_ - name of css class which will be applied to the whole list.
* [skills.json](src/data/skills.json) - this file represents the data in Skills section. It consists of a lists of json 
objects structured as described in _acievements.json_ section.
* [education.json](src/data/education.json), [experience.json](src/data/experience.json), [research.json](src/data/reasearch.json) -
* [social-media.json](src/data/social-media.json) -  