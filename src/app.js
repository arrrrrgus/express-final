import express from 'express';
import 'dotenv/config.js';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notfound.middleware.js';
import { authRouter } from './router/auth.route.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = env.PORT;
app.listen(PORT, (error) => {
  if (error) console.error(error);
  else console.log(`server running on port : ${PORT}`);
});
