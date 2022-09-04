import express from 'express';
import {
  register as registerController,
  login as loginController,
} from '../controllers/users.controller';
import { validator } from '../middlewares/validator';

const Router = express.Router();

Router.post('/register', validator('register'), registerController);

Router.post('/login', validator('login'), loginController);

export default Router;
