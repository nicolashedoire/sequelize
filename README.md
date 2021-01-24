# Sequelize

<p>Ce projet à pour but de mettre en place un setup avec sequelize et docker.</p>

## prérequis

- installer Docker

- installer Docker-compose

## Installer Sequelize CLI

<p>Vous pouvez installer le CLI (Command line interface) de sequelize afin de pouvoir générer les fichiers</p>

```
npm i -g sequelize-cli
```

## Dépendences

<p>Notre exemple concerne le setup d'une base de données POSTGRES.</p>

<p>Ces librairies sont donc nécessaires pour travailler.</p>

```
npm install sequelize pg pg-hstore --save
```

## .sequelizerc

<p>mettre cette config dans le fichier</p>

```
const path = require('path')

module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}
```

## initialiser la configuration

```
sequelize init
```

## config/config.js

<p>vous pouvez remplacer ce contenu avec ce code.</p>

```
require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}
```

## Générer l'url de connexion

<p>Prenez les informations disponibles dans le setup docker-compose.</p>

<ul>
  <li>db_user: postgres</li>
  <li>db_password: postgres</li>
  <li>db: test</li>
</ul>

```
postgres://<db_user>:<db_password>@127.0.0.1:5432/db
```

## Création du fichier .env

```
VERSION=1
PORT=5000
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/test
DEV_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/test
TEST_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/test
```

## accéder à PG ADMIN 4

http://localhost:8080/

<p>username: admin@admin.com</p>
<p>password: admin</p>

## Configuration

créer un nouveau serveur en prenant comme host "pgsql-server" qui se situe dans la configuration docker-compose

```
    links:
      - "db:pgsql-server"
```

vous pouvez utiliser les identifants suivants:

- DB : test
- user : postgres
- password: postgres

## Création models et migrations

```
sequelize model:generate --name User --attributes name:string,email:string

sequelize model:generate --name Post --attributes title:string,content:text,userId:integer

sequelize model:generate --name Comment --attributes postId:integer,comment:text,userId:integer
```

## Update fichiers de migrations

<p>Ajouter cette propriété sur les clés étrangères.</p>

```
allowNull: false,
```

<p>Exemple</p>

```
userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

```

## models/index.js

<p>Mettre cette configuration dans le fichier models/index.js</p>

```
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs =  require('../config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

## Lancer les migrations

<p>Cette commande va permettre de jouer les migrations et ainsi créer les tables dans notre base de données.</p>

```
sequelize db:migrate
```

## Générer les fichiers pour les données factices


```
sequelize seed:generate --name User

sequelize seed:generate --name Post

sequelize seed:generate --name Comment
```

## Edition du seed User

```
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jon Doe",
          email: "jondoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

```

## Edition du seed Post

```
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          userId: 1,
          title: "hispotan de nu",
          content:
            "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "some dummy title",
          content:
            "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};


```


## Edition du seed Comment

```
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          userId: 1,
          postId: 2,
          comment:
            "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          postId: 1,
          comment:
            "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};

```

## Hydrater la base avec des données

````
sequelize db:seed:all
````


## Sources

https://linuxhint.com/postgresql_docker/
