import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { LoadingStatus, ContactResponse, FilteredContact, Contact } from './../types/types';
import {
  getContacts as getContactsService,
  addContact as addContactService,
  deleteContact as deleteContactService,
} from './../service/contact';
import { setAlert } from './alertSlice';
import { filterContacts } from './../utils/contact.utils';
import { logout } from './userSlice';

// Types
interface ContactState {
  contacts: ContactResponse[] | [];
  getContactsStatus: LoadingStatus;
  filteredContacts: FilteredContact[] | [];
}

interface AddRequestArgs {
  accessToken: String;
  reqBody: Contact;
}

interface DeleteRequestArgs {
  accessToken: String;
  contactId: String;
}

const initialState: ContactState = {
  contacts: [],
  getContactsStatus: LoadingStatus.idle,
  filteredContacts: [],
};

export const getContacts = createAsyncThunk(
  'contact/getContacts',
  async (accessToken: String, { dispatch, rejectWithValue }) => {
    try {
      const getContactsResponse = await getContactsService(accessToken);
      dispatch(setAlert({ msg: 'Contacts retrieved Successfully', type: 'success' }));
      return getContactsResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      if (err.response?.data?.error === 'jwt expired') {
        dispatch(logout());
      }

      return rejectWithValue(error);
    }
  },
);

export const addContact = createAsyncThunk(
  'contact/addContact',
  async ({ accessToken, reqBody }: AddRequestArgs, { dispatch, rejectWithValue }) => {
    try {
      const addContactResponse = await addContactService(accessToken, reqBody);
      dispatch(setAlert({ msg: 'Contact added Successfully', type: 'success' }));
      dispatch(getContacts(accessToken));
      return addContactResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      if (err.response?.data?.error === 'jwt expired') {
        dispatch(logout());
      }
      return rejectWithValue(error);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async ({ accessToken, contactId }: DeleteRequestArgs, { dispatch, rejectWithValue }) => {
    try {
      const deleteContactResponse = await deleteContactService(accessToken, contactId);
      dispatch(setAlert({ msg: 'Contact deleted Successfully', type: 'success' }));
      return deleteContactResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      if (err.response?.data?.error === 'jwt expired') {
        dispatch(logout());
      }
      return rejectWithValue(error);
    }
  },
);

// Slice
const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    setGetContactsStatus(state) {
      state.getContactsStatus = LoadingStatus.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.getContactsStatus = LoadingStatus.success;
        state.contacts = action.payload;
        state.filteredContacts = filterContacts(action.payload);
      })
      .addMatcher(isAnyOf(addContact.fulfilled, deleteContact.fulfilled), (state, action) => {
        state.getContactsStatus = LoadingStatus.success;
      })
      .addMatcher(
        isAnyOf(getContacts.pending, addContact.pending, deleteContact.pending),
        (state, action) => {
          state.getContactsStatus = LoadingStatus.idle;
          state.contacts = [];
          state.filteredContacts = [];
        },
      )
      .addMatcher(
        isAnyOf(getContacts.rejected, addContact.rejected, deleteContact.rejected),
        (state, action) => {
          state.getContactsStatus = LoadingStatus.failed;
          state.contacts = [];
          state.filteredContacts = [];
        },
      );
  },
});

export const { setGetContactsStatus } = contactSlice.actions;
export default contactSlice.reducer;
