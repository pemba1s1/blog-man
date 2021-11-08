<p align="center">
<a href="https://blog-man.herokuapp.com/">
Blog Man
</a>
</p>



<p align="center">

<a href="https://github.com/pemba1s1/blog-man/blob/Main/LICENSE" target="_blank">
<img alt="License: MIT" src="https://img.shields.io/github/license/pemba1s1/blog-man" />
<img src="https://pyheroku-badge.herokuapp.com/?app=blog-man" alt="Heroku">
</a>
</p>

  <p align="center">
    <a href="https://blog-man.herokuapp.com/">View Demo</a>
  </p>

> ⚠️ _Website isn't mobile friendly and for best experience use Google Chrome._

## 💻 Tech Stack

- **Frontend** : Javascript, React.js
- **Styling** : Ant Design, Custom Css 
- **Backend** : Javaxcript, Node.js with Express framework
- **Database** : MongoDB

## 📺 Prerequisites

Before running app locally make sure that you install following things:

- Nodejs with npm or yarn with following version installed :
  _npm >= 6.14.15  with node >= 14.17.6_
- MongoDB Atlas as database.

## 🚀 Local Development

### Step 1: Clone the repo

```bash
$ https://github.com/pemba1s1/blog-man.git
```

### Step 2: Install dependencies

Install both client and server dependencies

```bash

# Install dependencies for server
$ npm install

# Install dependencies for client
$ npm run install-client

```

### Step 3: Configuration

1. Create `.env` file in project root dir

   ```bash
   $ touch .env
   ```

2. Enter your MongoDB Atlas Connection String in MONGO_URI

3. Enter your Secret Key in JWT_SECRET

4. Enter JWT_LIFELINE


### Step 4: Usage

Now you can run the application by :

```bash

# Run the Express server only
$ npm start

# Run the React client only
$ cd client && npm start

# Server runs on http://localhost:5000 and client on http://localhost:3000

```

## ⛵ Production Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page

## 📝 License

Copyright © 2021 [Pemba Norsang Sherpa](http://pemba1s1.netlify.app/).<br />
This project is [MIT](https://github.com/pemba1s1/blog-man/blob/Main/LICENSE) licensed.
