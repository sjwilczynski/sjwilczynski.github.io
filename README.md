[![Build Status](https://travis-ci.org/sjwilczynski/sjwilczynski.github.io.svg?branch=source)](https://travis-ci.org/sjwilczynski/sjwilczynski.github.io) 
[![dependencies Status](https://david-dm.org/sjwilczynski/sjwilczynski.github.io/status.svg)](https://david-dm.org/sjwilczynski/sjwilczynski.github.io)

# Responsive CV in React

The project is based on [startboootstrap-resume](https://github.com/BlackrockDigital/startbootstrap-resume).
I rewrote it in React to follow the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) rule: reduce amount of HTML and CSS code by using of React's reusable components. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

To start using this for your own needs:

* clone the repository
* go to its directory and install all dependencies: `npm install --no-optional`
* start the app using `npm start` and go to [http://localhost:3000/](http://localhost:3000/) to view your changes.

### Deploying to github pages

If you want just like me to publish your CV using [Github Pages](https://pages.github.com/) you should follow the steps 
described [here](https://facebook.github.io/create-react-app/docs/deployment) and [here](https://dev.to/javascripterika/deploy-a-react-app-as-a-github-user-page-with-yarn-3fka).
Take caution as the steps depend on whether you use your [username.github.io]() repository or a different one.

## Usage

### Replacing data

To change the data presented by the app you have to change all the files in the [data](src/data) directory and the 
[Interest.js](src/components/sections/interests/Interests.tsx) file. In the latter you just replace the code within <> and </> 
with your custom JSX.

* [about.json](src/data/about.json) - replace the self explanatory entries with your own data
* [achievements.json](src/data/achievements.json), [projects.json](src/data/projects.json) - in these files you can store 
a list of your achievements/projects. Each entry in the data section consists of _id_ which should be unique for every 
entry, _icon_ which is the name of the [FontAwesome](https://fontawesome.com/icons?d=gallery) icon you want to put before 
description, _iconStyle_ - css class for styling your icon (e.g some color) and _description_. Before data section you can 
also specify _listStyle_ - name of css class which will be applied to the whole list.
* [skills.json](src/data/skills.json) - this file represents the data in Skills section. It consists of a lists of json 
objects structured as described in _achievements.json_ section. Each list represents one subsection of skills and has few additional properties: _listStyle_ - style of the list, _title_ - title of subsection, _columns_ - number of columns you want to have in your list.
* [education.json](src/data/education.json), [experience.json](src/data/experience.json), [research.json](src/data/reasearch.json) - these 3 files share the same format - they aim to present your experience.
Each file contains a list. Each of the elements in the list consists of unique _id_, _headings_ list containing main information about your entry: position in experience/research section,
university in education section. The next element is _subheading_ - secondary information displayed just below headings. 
_extraInfos_ is also a list containing elements displayed on the right of your headings. In my case those are mostly dates. The last element is _description_.
* [social-media.json](src/data/social-media.json) -  in this file you can define links to your social media accounts which will be displayed in the About section. It contains a list of your profile entries. Each entry consists of unique _id_, _link_ - url to your profile/website, _icon_ - name of FontAwesome icon you want to use, _iconPackage_ - prefix defining from which package your icon is from (default is `fas`). For more info check [React FontAwesome Readme](https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently). 

### Favicon

You can replace my favicon with yours simply by replacing [favicon.ico](public/img/favicon.ico) file.

### FontAwesome icons

In order to use different FontAwesome icons go to [fontawesome.js](src/fontawesome/fontawesome.js) and add/delete imports. 
More info can be found [here](https://github.com/FortAwesome/react-fontawesome).
