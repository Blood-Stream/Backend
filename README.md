# Blood-Stream Backend

This is the backend for the project BloodStream to create the communication between Backend and Frontend & Datascience.

contributors for backend:

* Carlos Gutierrez [ingecarlos.gutierrez@gmail.com](mailto:ingecarlos.gutierrez@gmail.com)
* Stiven Mosquera [moquera012@gmail.com](mailto:moquera012@gmail.com)

license used: 
* MIT


---
## Instalation

1. Fork this repository
2. Create a directory in your computer
3. Clone the repository from your github to your computer
4. Install the dependencies with ``` npm install ```


![NpmInstall.mp4](./Readme%20images/Installing%20dependencies.gif)

5. Run the test in the folder Blood-Stream-db/ with ``` npm run test ```

![NpmRunTest.mp4](./Readme%20images/Run%20test%20in%20the%20databases.gif)

6. Run ``` npm run start ``` if you want run as **production** 

![NpmRunTest.mp4](./Readme%20images/NpmRunStart.gif)

or 

run ``` npm run dev ``` to run as **developer**

![NpmRunTest.mp4](./Readme%20images/NpmRunDev.gif)

## Configuration

### Usage


The file config recieve 1 parameter, if this parameter is **true**, the database will be created from scratch.

![configFalse.png](./Readme%20images/configTrue.png)

![InstallingDataBases.gif](./Readme%20images/Installing%20databases.gif)

if the parameter is **false** the database just create the communication between controller and database

![configFalse.png](./Readme%20images/configFalse.png)

``` js
module.exports = function config (configExtra) {
  let config = null

  if (configExtra) {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'bloodstream',
      password: process.env.DB_PASS || 'password',
      hostname: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      loggin: s => debug(s),
      setup: true
    }
  } else {
    config = {
      database: process.env.DB_NAME || 'bloodstreamdb',
      username: process.env.DB_USER || 'bloodstream',
      password: process.env.DB_PASS || 'password',
      hostname: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      loggin: s => debug(s)
    }
  }

  return config
}
```


---
## DataBase

### Usage

Create a file to get the tables from Databases, the database have 16 tables an the relation between each other are in the image below

``` js
const setupDataBase = require('Blood-Stream-db')

setupDataBase(config).then(db => {
  const {
    Message,
    Password,
    Users,
    GamesCollection,
    Contact,
    AccessRol,
    Platform,
    PlatformGames,
    Lenguages,
    LenguagesGames,
    Genres,
    GenresGames,
    Games,
    UserRating,
    GamesRating,
    GameRating
  } = db
}).catch(err => console.error(err))

```
![database.jpg](./Readme%20images/DATABASE.jpg)


---

## Apis

The services for the api is supported by [Heroku](https://dashboard.heroku.com/apps)

### Get 

> ### to list all users the URl is ==> 

``` js
METHOD: GET

http://dry-mesa-48732.herokuapp.com/user/

```

`Response:`

```JSON
{
  "error": false,
  "status": 200,
  "body": [
    {
      "id": 3,
      "uuid": "zldd0Rfxp8k__ExtAFf1T",
      "Nickname": "Test2123",
      "Country": "Mexico",
      "Postal_Code": "20208",
      "Birthday": "1989-09-15T00:00:00.000Z",
      "Status": true,
      "createdAt": "2020-09-24T03:50:20.933Z",
      "updatedAt": "2020-09-24T03:50:20.933Z",
      "platformId": 3,
      "contactId": 3,
      "accessRolId": 3,
      "passwordId": 3
    },
    {
      "id": 7,
      "uuid": "MuESAzUEckOMX952pa-zg",
      "Nickname": "",
      "Country": "Mexico",
      "Postal_Code": "20208",
      "Birthday": "1989-09-15T00:00:00.000Z",
      "Status": true,
      "createdAt": "2020-09-24T15:55:08.607Z",
      "updatedAt": "2020-09-24T15:55:08.607Z",
      "platformId": 7,
      "contactId": 7,
      "accessRolId": 7,
      "passwordId": 9
    },
    {
      "id": 6,
      "uuid": "E2N3xuu6U1Za-DGDQKfc4",
      "Nickname": "Test4",
      "Country": "Mexico",
      "Postal_Code": "20208",
      "Birthday": "1989-09-15T00:00:00.000Z",
      "Status": true,
      "createdAt": "2020-09-24T04:41:07.846Z",
      "updatedAt": "2020-09-24T17:03:31.076Z",
      "platformId": 6,
      "contactId": 6,
      "accessRolId": 6,
      "passwordId": 10
    }
  ]
}

```

> ### To list 1 user the URL is ==>

```js
METHOD: GET

http://dry-mesa-48732.herokuapp.com/user/{USER}

```

`Response:`

``` JSON

{
  "error": false,
  "status": 200,
  "body": {
    "id": 3,
    "uuid": "zldd0Rfxp8k__ExtAFf1T",
    "Nickname": "Test2123",
    "Country": "Mexico",
    "Postal_Code": "20208",
    "Birthday": "1989-09-15T00:00:00.000Z",
    "Status": true,
    "createdAt": "2020-09-24T03:50:20.933Z",
    "updatedAt": "2020-09-24T03:50:20.933Z",
    "platformId": 3,
    "contactId": 3,
    "accessRolId": 3,
    "passwordId": 3
  }
}

```

> ### To create 1 user the URL is ==>

``` js
METHOD: POST

http://dry-mesa-48732.herokuapp.com/user/
```
`Parameters:`

```JSON
{
	"nickname": "USER",
	"country": "COUNTRY",
	"postal_Code": "CP",
	"birthday": "YYYY-MM-DD",
	"status": BOOLEAN,
	"platform": "PLATFORM",
	"email": "EMAIL@SERVICES.COM",
	"phone": "PHONE",
	"rol": "ROL-USER",
  "level": LEVEL AS 1,
	"password": "PASSWORD"
}

```

`Response:`

```JSON
{
  "error": false,
  "status": 201,
  "body": {
    "id": 9,
    "Nickname": "Test5",
    "Country": "Mexico",
    "Postal_Code": "20208",
    "Birthday": "1989-09-15T00:00:00.000Z",
    "Status": true,
    "uuid": "frWim59R15IVDr-9ewcKx",
    "platformId": 9,
    "contactId": 9,
    "accessRolId": 9,
    "passwordId": 13,
    "updatedAt": "2020-09-25T03:25:35.104Z",
    "createdAt": "2020-09-25T03:25:35.104Z"
  }
}

```

> ### To login the URL is ==>

```js
METHOD: POST

http://dry-mesa-48732.herokuapp.com/user/login

```
`Parameters:`

```JSON
{
	"nickname": "USER",
	"password": "NEW-PASSWORD"
}

```

`Response:`

```JSON
{
  "error": false,
  "status": 200,
  "body": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInV1aWQiOiJoaVJGZTM5bmtINENxczRGWGdacFIiLCJKV1RfUGFzc3dvcmQiOiIkMmIkMDUkVnV6SE01Yko4M1BabnZtMlpPNXNRZWRZNmhtd2pFNkk5d0FuakJmaUZKMzJ1NlduaFlsL1ciLCJjcmVhdGVkQXQiOiIyMDIwLTA5LTI0VDE3OjAzOjMxLjAyMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA5LTI0VDE3OjAzOjMxLjAyMFoiLCJpYXQiOjE2MDA5NjcwMTV9.iMP2cRbPO5o6QwV1ku2RuBY8clXDy73EhLBOf1thGYc"
}

```

> ### To change your password the URL is ==>

```js
METHOD: POST

http://dry-mesa-48732.herokuapp.com/user/pass-retrieve

```
`Parameters:`

```JSON
{
	"nickname": "USER",
	"password": "NEW-PASSWORD"
}

```

`Response:`

```JSON

{
  "error": false,
  "status": 201,
  "body": "The password for the user Test4 was changed successfull"
}

```

> ### To delete a user the URL is ==> 

```js
METHOD: DELETE

http://dry-mesa-48732.herokuapp.com/user/{USER}

```

```JSON
{
  "error": false,
  "status": 200,
  "body": "The user Test2 was erased"
}
```

---
