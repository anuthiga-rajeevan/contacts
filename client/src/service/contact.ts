import axios from 'axios';
import { Contact, ContactResponse } from '../types/types';

export async function getContacts(accessToken: String): Promise<ContactResponse[]> {
  const response = await axios.get('/api/contacts', {
    headers: {
      authorization: `${accessToken}`,
    },
  });

  return response.data.data;
}

export async function getContact(accessToken: String, contactId: String): Promise<ContactResponse> {
  const response = await axios.get(`/api/contacts/${contactId}`, {
    headers: {
      authorization: `${accessToken}`,
    },
  });

  return response.data.data;
}

export async function addContact(accessToken: String, reqBody: Contact): Promise<ContactResponse> {
  const response = await axios.post(
    '/api/contacts',
    { ...reqBody },
    {
      headers: {
        authorization: `${accessToken}`,
      },
    },
  );

  return response.data.data;
}

export async function updateContact(accessToken: String, contactId: String, reqBody: Contact): Promise<ContactResponse> {
  const response = await axios.put(
    `/api/contacts/${contactId}`,
    { ...reqBody },
    {
      headers: {
        authorization: `${accessToken}`,
      },
    },
  );

  return response.data.data;
}

export async function deleteContact(
  accessToken: String,
  contactId: String,
): Promise<ContactResponse> {
  const response = await axios.delete(`/api/contacts/${contactId}`, {
    headers: {
      authorization: `${accessToken}`,
    },
  });

  return response.data.data;
}
