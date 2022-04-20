require('dotenv').config({ path: './.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./configs/db');
const app = express();
const l = require('./common/logger');
const PORT = process.env.PORT || 8000;
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('./models/product');

const origin =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.FRONTEND;

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use(
    cors({
      origin,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use('/api', require('./routes/authRouter'));
  app.use('/api', require('./routes/user'));
  app.use('/api', require('./routes/product'));
  app.use('/api', require('./routes/cart'));

  app.use((err, _, res, __) => {
    res.status(err.status || 500).json({
      message: err.message || 'Something went wrong, please try again.',
    });
  });

  const path = require('path');
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    l.info(`up and running in ${process.env.NODE_ENV} on port ${PORT}`);
    l.info(`gql path is ${apolloServer.graphqlPath}`);
  });
}
startServer();
connectDB();
