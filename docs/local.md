# Local environment settings

Sails allow to set local development configurations.

The `config/local.js` file include any settings like **level of logs**, **db connection**, **passwords** ...

## Log
 
> Logger configuration
 
``` js

module.exports = {

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  // 'error'	: Display calls to `.error()`
  // 'warn'	: Display calls from `.error()` to `.warn()`
  // 'debug'	: Display calls from `.error()`, `.warn()` to `.debug()`
  // 'info'	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
  // 'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`

  log: {
    level: 'info'
  }

};

```

## Local Disk db
 
> Development-only persistent adapter for Sails.js / Waterline 
 
``` js

module.exports = {

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  models: {
    connection: 'localDiskDb'
  }

};

```


## Local Postgresql

> PostgreSQL adapter for Sails.js
 
``` js

module.exports = {

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  connections: {
    Postgresql: {
      adapter: 'sails-postgresql',
      host: 'localhost',
      port: 5432,
      user: '***',
      password: '***',
      database: '***'
    }
  },

  models: {
    connection: 'Postgresql'
  }

};

```

## Ignore any changes:
 
Any local changes to the config/local.js, must not to be pushed to the repo.
To do not tracking it anymore, do :
 
``` shell
git update-index --assume-unchanged config/local.js
```
