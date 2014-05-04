## Show Postgresql credentials:
``` bash
$ heroku pg:credentials DATABASE
```

## Setup Postgresql server:

Get connection informations at [https://postgres.heroku.com/databases/](https://postgres.heroku.com/databases/)

``` bash
$ heroku config:set POSTGRESQL_DATABASE_URL=*
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
