import axios from 'axios';
import { ContactResponse } from '../types/types';

export async function getContacts(accessToken: String): Promise<ContactResponse[]> {
  const response = await axios.get('/api/contacts', {
    headers: {
      authorization: `${accessToken}`,
    },
  });

  return response.data.data;
}

export async function addContact(
  accessToken: String,
  reqBody: ContactResponse,
): Promise<ContactResponse[]> {
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
