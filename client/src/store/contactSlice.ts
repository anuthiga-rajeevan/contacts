import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { LoadingStatus, ContactResponse, FilteredContact, Contact } from './../types/types';
import {
  getContacts as getContactsService,
  addContact as addContactService,
  deleteContact as deleteContactService,
  getContact as getContactService,
  updateContact as updateContactService,
} from './../service/contact';
import { setAlert } from './alertSlice';
import { filterContacts } from './../utils/contact.utils';
import { logout } from './userSlice';

// Types
interface ContactState {
  contacts: ContactResponse[] | [];
  getContactsStatus: LoadingStatus;
  filteredContacts: FilteredContact[] | [];
  contact: ContactResponse | null;
  getContactStatus: LoadingStatus;
}

interface AddRequestArgs {
  accessToken: String;
  reqBody: Contact;
}

interface UpdateRequestArgs {
  accessToken: String;
  contactId: String;
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
  contact: null,
  getContactStatus: LoadingStatus.idle,
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

export const getContact = createAsyncThunk(
  'contact/getContact',
  async (
    { accessToken, contactId }: { accessToken: String; contactId: String },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const getContactResponse = await getContactService(accessToken, contactId);
      dispatch(setAlert({ msg: 'Contact detail retrieved Successfully', type: 'success' }));
      return getContactResponse;
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

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async ({ accessToken, contactId, reqBody }: UpdateRequestArgs, { dispatch, rejectWithValue }) => {
    try {
      const updateContactResponse = await updateContactService(accessToken, contactId, reqBody);
      dispatch(setAlert({ msg: 'Contact updated Successfully', type: 'success' }));
      dispatch(getContacts(accessToken));
      return updateContactResponse;
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
      .addCase(getContact.fulfilled, (state, action) => {
        state.getContactStatus = LoadingStatus.success;
        state.contact = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.getContactsStatus = LoadingStatus.failed;
        state.contacts = [];
        state.filteredContacts = [];
      })
      .addCase(getContact.rejected, (state, action) => {
        state.contact = null;
        state.getContactStatus = LoadingStatus.failed;
      })
      .addCase(getContact.pending, (state, action) => {
        state.contact = null;
        state.getContactStatus = LoadingStatus.loading;
      })
      .addMatcher(
        isAnyOf(addContact.fulfilled, deleteContact.fulfilled, updateContact.fulfilled),
        (state, action) => {
          state.getContactsStatus = LoadingStatus.success;
        },
      )
      .addMatcher(
        isAnyOf(
          getContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending,
        ),
        (state, action) => {
          state.getContactsStatus = LoadingStatus.loading;
        },
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected,
        ),
        (state, action) => {
          state.getContactsStatus = LoadingStatus.failed;
        },
      );
  },
});

export const { setGetContactsStatus } = contactSlice.actions;
export default contactSlice.reducer;
