import axios from 'axios';
import { ContactResponse } from '../types/types';

export async function getContacts(accessToken: String): Promise<ContactResponse[]> {
  const response = await axios.get('/api/contacts', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
}
