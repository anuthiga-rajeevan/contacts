import asyncHandler from '../middlewares/asyncHandler';
import Contact from '../models/contact.model';
import ErrorResponse from '../utils/ErrorResponse';
import logger from '../common/logger';

/**
 * @route    POST api/contacts
 * @desc     Create a new contact in the contacts collection
 * @access   Private
 */
export const createContact = asyncHandler(async (req, res, next) => {
  const newJob = await Contact.create({ ...req.body });

  res.status(201).json({ success: true, data: newJob });
});

/**
 * @route    GET api/contacts/:contactId
 * @desc     Gets a contact based on contactId
 * @access   Private
 */
export const getContact = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    logger.error(`No contacts found with contact id ${contactId}`);
    return next(new ErrorResponse(`No contacts found with contact id ${contactId}`, 404));
  }

  res.status(200).json({ success: true, data: contact });
});

/**
 * @route    GET api/contacts
 * @desc     Get all contacts
 * @access   Private
 */
export const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json({ success: true, data: contacts });
});

/**
 * @route    DELETE api/contacts/:contactId
 * @desc     Deletes a contact based on contactId
 * @access   Private
 */
export const deleteContact = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
