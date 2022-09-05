import express from 'express';
import {
  createContact,
  getContact,
  getContacts,
  deleteContact,
} from '../controllers/contacts.controller';
import authenticationRequired from '../middlewares/authenticationRequired';

const Router = express.Router();

Router.route('/')
  .get(authenticationRequired, getContacts)
  .post(authenticationRequired, createContact);

Router.route('/:contactId')
  .get(authenticationRequired, getContact)
  .delete(authenticationRequired, deleteContact);

export default Router;
