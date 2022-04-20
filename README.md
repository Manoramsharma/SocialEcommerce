A [JavaScript](https://www.javascript.com/) Web App made using ReactJs framework.

- This APIs are built using [Express.js](https://expressjs.com/) web framework, and is using [JavaScript](https://www.javascript.com/) for the app's use.
- Many reausable web components are designed using [ReactJs](https://reactjs.org) and are optimized according to the web app for performing at its best.
- For storing custom constant configurations within the `process.env` - [DotEnv](https://github.com/motdotla/dotenv) package is used.
- For Database - Repo contains the use of [Mongoose](https://mongoosejs.com/) (ie. [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/)).
- For Routing - Repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes .
- For Route Auth Middleware - Web routes are configured with [CSRF Token](https://github.com/krakenjs/lusca) while the API routes are configured with [JSON Web Token](https://github.com/auth0/express-jwt).

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/Manoramsharma/SocialEcommerce.git
# Goto the cloned project folder.

```

```bash


# Note: It is assumed here that you have MongoDB running in the background and that you have created the database.

# Install NPM dependencies.
# Note: You can review the list of dependencies from the package.json folder.

npm install;


```

# Run Backend

npm run dev;

# Run Frontend

npm start
