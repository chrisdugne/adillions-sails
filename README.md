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

1. Clone the repository somewhere inside you Home directory: `git clone https://github.com/**/*.git`
2. `cd` to the created directory.
2. Get all Node dependencies through [npm](https://npmjs.org/): `npm install`
3. Get all client dependencies through [bower](http://bower.io/): `bower install`

## Start the server:

* Install or update dependencies : `bower install` ||  `bower update`.
* Run app : `sails lift`.
* Run app as production: `sails lift --prod`.

Visit [http://localhost:1337/](http://localhost:1337/) in your browser.

## Setup Postgresql server:

### Heroku

Get connection informations at [https://postgres.heroku.com/databases/](https://postgres.heroku.com/databases/)

1. `heroku config:set PG_DATABASE=*`
2. `heroku config:set PG_HOSTNAME=*`
3. `heroku config:set PG_PASSWORD=*`
4. `heroku config:set PG_PORT=*`
5. `heroku config:set PG_USER=*`

### Local

  Add local adaptaters config at : `/config/local.js`

    adapters: {
      'default': 'postgresql',
      postgresql: {
        module: 'sails-postgresql',
        host: 'localhost',
        user: *,
        password: *,
        database: *,
        port: *,
        ssl: false
      }

## Tutorials:

**[Sails screencasts](https://www.youtube.com/playlist?list=PLf8i4fc0zJBzLhOe6FwHpGhBDgqwInJWZ)**
