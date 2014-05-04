## Show Postgresql credentials:
``` bash
$ heroku pg:credentials DATABASE
Connection info string:
   "dbname=dee932clc3mg8h host=ec2-123-73-145-214.compute-1.amazonaws.com port=6212 user=user3121 password=98kd8a9 sslmode=require"
```

## Setup Postgresql server:

Get connection informations at [https://postgres.heroku.com/databases/](https://postgres.heroku.com/databases/)

### Setting up config vars for a deployed application

Use the Heroku CLI’s config, config:set, config:get and config:unset to manage your config vars:

``` bash
$ heroku config:set POSTGRESQL_DATABASE_URL=joesmith
Adding config var POSTGRESQL_DATABASE_URL
```

``` bash
$ heroku config
POSTGRESQL_DATABASE_URL: joesmith
OTHER_VAR:    production
```

``` bash
$ heroku config:get POSTGRESQL_DATABASE_URL
joesmith
```

``` bash
$ heroku config:unset POSTGRESQL_DATABASE_URL
Unsetting POSTGRESQL_DATABASE_URL
```

## Monitoring & logging

If your application/framework emits logs on database access, you will be able to retrieve them through Heroku’s log-stream:
``` bash
$ heroku logs -t
```

To see logs from the database service itself you can also use heroku logs but with the -p postgres flag indicating that you only wish to see the logs from PostgreSQL.
``` bash
$ heroku logs -p postgres -t
```
