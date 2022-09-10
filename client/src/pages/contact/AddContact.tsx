import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getUser } from '../../store/userSlice';
import { addContact } from '../../store/contactSlice';
import { Contact, LoadingStatus } from '../../types/types';
import ContactForm from '../../components/contact/ContactForm';

const AddContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const initialData = {
    firstName: '',
    lastName: '',
    phone: [
      {
        type: '',
        phoneNo: '',
        isPrimary: false,
      },
    ],
    email: [
      {
        type: '',
        email: '',
        isPrimary: false,
      },
    ],
  };

  const [formData, setFormData] = useState<Contact>(initialData);

  const handleSave = () => {
    if (userInfo.token) {
      dispatch(addContact({ accessToken: userInfo.token, reqBody: formData }));
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  const handleChange = () => {};

  const addPhoneEmail = (type: String) => {
    console.log('addPhoneEmail called', type);
    if (type === 'phone') {
      const phoneData = formData.phone;
      console.log(phoneData);
      phoneData.push({
        type: '',
        phoneNo: '',
        isPrimary: false,
      });
      console.log(phoneData);
      setFormData({ ...formData, phone: phoneData });
      console.log(formData);
    }
    if (type === 'email') {
      const emailData = formData.email;
      emailData.push({
        type: '',
        email: '',
        isPrimary: false,
      });
      setFormData({ ...formData, email: emailData });
    }
  };

  const deletePhoneEmail = (type: String, index: Number) => {};

  useEffect(() => {
    if (getUserInfoStatus === LoadingStatus.idle) {
      dispatch(getUser());
    }
    if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
      navigate('/login');
    }
  }, [getUserInfoStatus, dispatch, navigate, userInfo]);
  return (
    <ContactForm
      formData={formData}
      handleSubmit={handleSave}
      handleCancel={handleCancel}
      handleChange={handleChange}
      addPhoneEmail={addPhoneEmail}
    />
  );
};

export default AddContact;
