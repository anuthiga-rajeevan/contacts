import express from 'express';
import { createContact, getContact, getContacts, deleteContact } from '../controllers/contacts.controller';
// import advancedResults from '../middlewares/advancedResults';
// import { authorize } from '../middlewares/auth';
// import authenticationRequired from '../middlewares/authentication';
import Contact from '../models/contact.model';

const Router = express.Router();

Router.route('/')
  .get(
    // authenticationRequired,
    // authorize(process.env.OMT_ROLE_SUPER_ADMIN, process.env.OMT_ROLE_ADMIN),
    // advancedResults({ model: Contact }),
    getContacts,
  )
  .post(
    // authenticationRequired,
    // authorize(process.env.OMT_ROLE_SUPER_ADMIN, process.env.OMT_ROLE_ADMIN),
    createContact,
  );

Router.get(
  '/:contactId',
//   authenticationRequired,
//   authorize(process.env.OMT_ROLE_SUPER_ADMIN, process.env.OMT_ROLE_ADMIN),
  getContact,
);

Router.delete(
  '/:contactId',
//   authenticationRequired,
//   authorize(process.env.OMT_ROLE_SUPER_ADMIN, process.env.OMT_ROLE_ADMIN),
  deleteContact,
);

export default Router;
