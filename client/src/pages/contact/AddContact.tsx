import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getContacts } from '../../store/contactSlice';
import { getUser } from '../../store/userSlice';
import { LoadingStatus } from '../../types/types';
import ContactList from '../../components/contact/ContactList';
import { Button, Paper } from '@mui/material';

const AddContact = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    useEffect(() => {
        if (getUserInfoStatus === LoadingStatus.idle) {
            dispatch(getUser());
        }
        if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
            navigate('/login');
        }
    }, [getUserInfoStatus, dispatch, navigate, userInfo]);
    return <Paper sx={{ width: '90%', mt: 5 }} elevation={0} >
        Add Contact</Paper>;
};

export default AddContact;
