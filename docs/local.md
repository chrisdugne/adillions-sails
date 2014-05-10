# Local environment settings

Sails allow to set local development configurations.

The config/local.js file include any settings like ,db connection, passwords ...

## Local Disk db
 
> Development-only persistent adapter for Sails.js / Waterline 
 
``` js

module.exports = {

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  log: {
    level: 'info'
  },

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

  log: {
    level: 'info'
  },

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
git update-index --assume-unchanged
```
