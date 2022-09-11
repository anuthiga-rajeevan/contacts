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
  const newContact = await Contact.create({ ...req.body, user_id: req.user.user_id });
  res.status(201).json({ success: true, data: newContact });
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
  console.log(contact)
  console.log(contact.user_id)
  console.log(req.user.user_id)
  if (contact.user_id != req.user.user_id) {
    logger.error(`You don't own this contact`);
    return next(new ErrorResponse(`You don't own this contact`, 404));
  }

  res.status(200).json({ success: true, data: contact });
});

/**
 * @route    GET api/contacts
 * @desc     Get all contacts
 * @access   Private
 */
export const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({user_id: req.user.user_id});
  res.status(200).json({ success: true, data: contacts });
});

/**
 * @route    DELETE api/contacts/:contactId
 * @desc     Deletes a contact based on contactId
 * @access   Private
 */
export const deleteContact = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    logger.error(`No contacts found with contact id ${contactId}`);
    return next(new ErrorResponse(`No contacts found with contact id ${contactId}`, 404));
  }

  res.status(200).json({ success: true, data: contact });
});

/**
 * @route    PUT api/contacts/:contactId
 * @desc     Update a contact based on contactId
 * @access   Private
 */
export const updateContact = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    {
      ...req.body,
      $set: { phone: req.body.phone, email: req.body.email },
      user_id: req.user.user_id,
    },
    { new: true },
  );

  if (!contact) {
    logger.error(`No contacts found with contact id ${contactId}`);
    return next(new ErrorResponse(`No contacts found with contact id ${contactId}`, 404));
  }

  res.status(200).json({ success: true, data: contact });
});
