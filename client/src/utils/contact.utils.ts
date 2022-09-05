import { ContactResponse, Email, FilteredContact, PhoneNo } from '../types/types';

export const filterContacts = (contacts: ContactResponse[]): FilteredContact[] => {
  return contacts.map(({ _id, user_id, firstName, lastName, phone, email }) => {
    const primaryPhone: PhoneNo[] = phone.filter((phone) => phone.isPrimary);
    const primaryPhoneNo = primaryPhone ? primaryPhone[0].phoneNo : phone[0].phoneNo;
    const primaryEmail: Email[] = email.filter((anEmail) => anEmail.isPrimary);
    const primaryEmailAddress = primaryEmail ? primaryEmail[0].email : email[0].email;
    return {
      _id,
      user_id,
      firstName,
      lastName,
      phoneNo: primaryPhoneNo,
      emailAddress: primaryEmailAddress,
    };
  });
};
