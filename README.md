# Adillions node.js Webapp

## Continous integration

[ ![Codeship Status for LukeParis/adillions-next](https://www.codeship.io/projects/54273b90-e3fc-0131-ac19-1a224a6206b8/status)](https://www.codeship.io/projects/25514)

## Prerequisites

First make sure that you have correctly installed the __latest__ versions of the following libraries

* **[Node.JS](http://www.nodejs.org)**
* **[Npm](https://npmjs.org/)**
* **[Git](https://help.github.com/articles/set-up-git)**
* **[Grunt](http://gruntjs.com/)** (run the command `npm install -g grunt-cli`)
* **[Bower](http://bower.io)** (run the command `npm install -g bower`)
* **[Sails](https://github.com/balderdashy/sails)** (run the command `npm install -g sails@0.10.0-rc7`)

## Installation

1. Clone the repository somewhere inside you Home directory: `git clone https://github.com/LukeParis/adillions-next.git`
2. `cd` to the created directory.
3. Get all Node dependencies through [npm](https://npmjs.org/): `npm install`
4. Get all client dependencies through [bower](http://bower.io/): `bower install`

> During the bcrypt installation, if an error occured relating to node-gyp, please refers to [node-gyp#installation](https://github.com/TooTallNate/node-gyp/#installation)

## Start the server
 
Run app :
```shell
grunt
```
Run app as production:
```shell
grunt prod && grunt concurrent:prod
```

`grunt prod`: build prod packages; `grunt concurrent:prod`: launch server as production environment

---

Visit [http://localhost:1337/](http://localhost:1337/) in your browser.

## Docs

Get informations : [Code and development doctrine](https://github.com/LukeParis/adillions-next/tree/master/docs)

## Tutorials

**[Sails screencasts](https://www.youtube.com/playlist?list=PLf8i4fc0zJBzLhOe6FwHpGhBDgqwInJWZ)**

