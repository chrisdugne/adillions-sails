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

  // Your app's default connection.
  // i.e. the name of one of your app's connections (see `config/connections.js`)

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

  // Each model must have a `connection` property (a string) which is references the name of one
  // of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
  // will be applied.  Of course, a connection can (and usually is) shared by multiple models.
    
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

  // Your app's default connection.
  // i.e. the name of one of your app's connections (see `config/connections.js`)

  models: {
    connection: 'Postgresql'
  }

};

```

## Ignore config/local.js
 
Any local changes to the config/local.js, **must not to be pushed to the repo**.
To do not tracking it anymore, do :
 
``` shell
git update-index --assume-unchanged config/local.js
```
