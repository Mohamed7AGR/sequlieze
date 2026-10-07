import express from 'express';
import { PORT } from './config/config.service.js';
import { connectDB } from './database/connection.js';
import { userRouter, postRouter, commentRouter } from './module/index.js';
import { User } from './database/index.js';
import './database/model/association.js';

const app = express();
await connectDB();

app.use(express.json());
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.get('/', async (req, res) => {
  await User.sync();
  res.send('Sequelize is working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});