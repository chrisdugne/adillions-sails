# Adillions node.js Webapp

## Prerequisites

First make sure that you have correctly installed the __latest__ versions of the following libraries

* **[Node.JS](http://www.nodejs.org)**
* **[Npm](https://npmjs.org/)**
* **[Git](https://help.github.com/articles/set-up-git)**
* **[Grunt](http://gruntjs.com/)** (run the command `npm install -g grunt-cli`)
* **[Bower](http://bower.io)** (run the command `npm install -g bower`)
* **[Sails](https://github.com/balderdashy/sails)** (run the command `npm install -g sails@0.10.0-rc5`)

## Installation

1. Clone the repository somewhere inside you Home directory: `git clone https://github.com/LukeParis/adillions-next.git`
2. `cd` to the created directory.
3. Get all Node dependencies through [npm](https://npmjs.org/): `npm install`
4. Get all client dependencies through [bower](http://bower.io/): `bower install`

During the bcrypt installation, if an error occured relating to node-gyp, please refers to [node-gyp#installation](https://github.com/TooTallNate/node-gyp/#installation)

## Start the server

* Run app : `sails lift`.
* Run app as production: `sails lift --prod`.

Visit [http://localhost:1337/](http://localhost:1337/) in your browser.

## Docs

Get informations : [Code and development doctrine](https://github.com/LukeParis/adillions-next/tree/master/docs)

## Tutorials

**[Sails screencasts](https://www.youtube.com/playlist?list=PLf8i4fc0zJBzLhOe6FwHpGhBDgqwInJWZ)**

## TODO

Handlebars helpers:
- [x] __routeUrl__: route app url (about, press...)
- [x] __extUrl__: external url (facebook, twhitter, blog...)
- [ ] __setLangUrl__: Generates an url containing the setLng (i18n) parameter without affecting other query string parameters

Database:
- [ ] __postgresql__ : set heroku postgresql (env variables, aka `heroku config:set PG_URL=*`)

