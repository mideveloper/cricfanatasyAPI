# CricFantasy

CricFantasy back-end API.

## Prerequisites

1. docker and docker compose (lastest version) [Docker](https://www.docker.com/) & [Docker-Compose](https://docs.docker.com/compose/)

## Branching Strategy and Commit message

Please follow branching strategy as mentioned in [Contribution Guide](CONTRIBUTION.md)

## commands to get you started

1. git clone https://github.com/mideveloper/cricfanatasyAPI.git
2. create [.env](#sample-development) file in src/conf/env directory
3. run `docker-compose up --build`

### Migrations

1. `npm run migration:generate`: create a new migration.
2. `npm run migration:run`: run migrations.
3. `npm run migration:revert` : revert last migration.

### Sample development

```
NODE_ENV=development

#DataBase
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=db
TYPEORM_DATABASE=cricfantasy
TYPEORM_USERNAME=example
TYPEORM_PASSWORD=example
TYPEORM_PORT=5432
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/entity/**/*.ts
TYPEORM_MIGRATIONS=src/migration/migrations/**/*.ts
TYPEORM_SUBSCRIBERS=src/subscriber/**/*.ts

#postgres
POSTGRES_DB=cricfantasy
POSTGRES_USER=example
POSTGRES_PASSWORD=example
```

### debug

1. run `docker-compose -f docker-compose-dev.yml up`

2) create launch.json in .vscode folder, and copy following code

```
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node",
            "request": "attach",
            "name": "Attach",
            "address": "localhost",
            "sourceMaps": true,
            "port": 9229,
            "protocol": "inspector",
            "localRoot": "${workspaceFolder}/src",
            "remoteRoot": "/usr/app/src",
            "restart": true
        }
    ]
}
```
