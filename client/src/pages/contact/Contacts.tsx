import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getContacts, setGetContactsStatus } from '../../store/contactSlice';
import { getUser } from '../../store/userSlice';
import { LoadingStatus } from '../../types/types';
import ContactList from '../../components/contact/ContactList';
import Spinner from '../../components/spinner/Spinner';
import { Button, Paper } from '@mui/material';

const Contacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
  const getContactsStatus = useSelector((state: RootState) => state.contact.getContactsStatus);
  const filteredContacts = useSelector((state: RootState) => state.contact.filteredContacts);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const goToAddNewContact = () => {
    dispatch(setGetContactsStatus());
    navigate('/contacts/add');
  };

  useEffect(() => {
    if (getUserInfoStatus === LoadingStatus.idle) {
      dispatch(getUser());
    }
    if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
      navigate('/login');
    }
    if (
      getUserInfoStatus === LoadingStatus.success &&
      userInfo.token &&
      getContactsStatus === LoadingStatus.idle
    ) {
      dispatch(getContacts(userInfo.token));
    }
  }, [getUserInfoStatus, dispatch, navigate, userInfo, getContactsStatus]);
  return (
    <Paper sx={{ width: '90%', mt: 5 }} elevation={0}>
      <Button variant='contained' sx={{ p: 2, mb: 5 }} onClick={goToAddNewContact}>
        Add New Contact
      </Button>
      <Spinner loadingStatus={getContactsStatus} />
      <ContactList contacts={filteredContacts} userInfo={userInfo} />
    </Paper>
  );
};

export default Contacts;
