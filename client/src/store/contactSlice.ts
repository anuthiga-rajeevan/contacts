import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { LoadingStatus, ContactResponse, FilteredContact } from './../types/types';
import { getContacts as getContactsService } from './../service/contact';
import { setAlert } from './alertSlice';
import { filterContacts } from './../utils/contact.utils';

// Types
interface ContactState {
  contacts: ContactResponse[] | [];
  getContactsStatus: LoadingStatus;
  filteredContacts: FilteredContact[] | [];
}

interface AddRequestArgs {
    accessToken: String;
    reqBody: ContactResponse;
}

const initialState: ContactState = {
  contacts: [],
  getContactsStatus: LoadingStatus.idle,
  filteredContacts: [],
};

export const getContacts = createAsyncThunk(
  'contact/getContacts',
  async (accessToken: string, { dispatch, rejectWithValue }) => {
    try {
      const getContactsResponse = await getContactsService(accessToken);
      dispatch(setAlert({ msg: 'Contacts retrieved Successfully', type: 'success' }));
      return getContactsResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      return rejectWithValue(error);
    }
  },
);

export const addContact = createAsyncThunk(
  'contact/addContact',
  async ({ accessToken, reqBody }: AddRequestArgs, { dispatch, rejectWithValue }) => {
    try {
      const getContactsResponse = await getContactsService(accessToken);
      dispatch(setAlert({ msg: 'Contacts retrieved Successfully', type: 'success' }));
      return getContactsResponse;
    } catch (err: any) {
      const error = err.response?.data?.error || 'Something went wrong';
      dispatch(setAlert({ msg: error, type: 'error' }));
      return rejectWithValue(error);
    }
  },
);

// Slice
const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getContacts.fulfilled), (state, action) => {
        state.getContactsStatus = LoadingStatus.success;
        state.contacts = action.payload;
        state.filteredContacts = filterContacts(action.payload);
      })
      .addMatcher(isAnyOf(getContacts.pending), (state, action) => {
        state.getContactsStatus = LoadingStatus.idle;
        state.contacts = [];
        state.filteredContacts = [];
      })
      .addMatcher(isAnyOf(getContacts.rejected), (state, action) => {
        state.getContactsStatus = LoadingStatus.failed;
        state.contacts = [];
        state.filteredContacts = [];
      });
  },
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
