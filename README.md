# Blood-Stream Backend

This is the backend for the project BloodStream to create the communication between Backend and Frontend & Datascience.

## Page 💻

- [Blood-stream.xyz](http://blood-stream.xyz/#/)

## Built with 🛠️

- [JavaScript](https://www.javascript.com/) - Programming Language
- [NodeJs](https://nodejs.org/en/) - Web Framework
- [NPM](https://www.npmjs.com/) - Dependency manager
- [Heroku](https://www.heroku.com/#) - Platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud
- [AWS](https://aws.amazon.com/) - Amazon Web Services (AWS) is a platform in a cloud more complete around the world, offer more than 175 services.

## Authors ✒️

- **Carlos Gutierrez** - _Backend Developer_ - [CarGDev](https://github.com/CarGDev)
- **Stiven Mosquera** - _Backend Developer_ - [MosqueraSt3](https://github.com/MosqueraSt3)

## License 📄

This project is under the License (MIT)




---
## Instalation 📲

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

## Configuration 🖱

### Usage


The file config recieve 1 parameter, if this parameter is **true**, the database will be created from scratch.

![configFalse.png](./Readme%20images/configTrue.png)

![InstallingDataBases.gif](./Readme%20images/Installing%20databases.gif)

if the parameter is **false** the database just create the communication between controller and database

![configFalse.png](./Readme%20images/configFalse.png)


---
## DataBase 💾

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

## Apis 📋

The services for the api is supported by [Heroku](https://dashboard.heroku.com/apps)

Check the endpoints in [Our application](https://dry-mesa-48732.herokuapp.com/api-doc)

---


## Acknowledgements 🎁

- We greatly appreciate [Lina Castro](https://github.com/lirrumscode), Coach of our team at Platzi Master who was aware of us, promoting and motivating us with the project. providing us with tools and their knowledge for our professional growth📢