import express from 'express';
import {
  createContact,
  getContact,
  getContacts,
  deleteContact,
  updateContact,
} from '../controllers/contacts.controller';
import authenticationRequired from '../middlewares/authenticationRequired';
import { validator } from '../middlewares/validator';

const Router = express.Router();

Router.route('/')
  .get(authenticationRequired, getContacts)
  .post(authenticationRequired, validator('contact'), createContact);

Router.route('/:contactId')
  .get(authenticationRequired, getContact)
  .put(authenticationRequired, validator('contact'), updateContact)
  .delete(authenticationRequired, deleteContact);

export default Router;
