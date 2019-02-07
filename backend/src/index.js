const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());

// decode the JWT so we can get the userId on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future request to access
    req.userId = userId;
  }
  next();
});

// create a middleware that populates user on each request

server.express.use(async (req, res, next) => {
  // if they arent logged in, skip this
  if (!req.userId) {
    return next();
  }

  // TODO: Fix this. db doesnt exist!?
  const user = await db.query.user({ where: { id: req.userId }}, '{ id, permissions, email, name }');

  req.user = user;
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, ({ port }) => {
  console.log(`Server started, listening on port ${port} for incoming requests.`,)
});

