import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getUser } from '../../store/userSlice';
import { addContact } from '../../store/contactSlice';
import { Contact, LoadingStatus, IEmail, IPhone } from '../../types/types';
import ContactForm from '../../components/contact/ContactForm';
import Spinner from '../../components/spinner/Spinner';

const AddContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
  const getContactsStatus = useSelector((state: RootState) => state.contact.getContactsStatus);
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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handlePhoneEmailChange = (data: IPhone | IEmail) => {
    const { type, index, data: updatedData } = data;
    if (type === 'phone') {
      const phoneData = formData.phone;
      phoneData[index] = updatedData;
      setFormData({ ...formData, phone: phoneData });
    }
    if (type === 'email') {
      const emailData = formData.email;
      emailData[index] = updatedData;
      setFormData({ ...formData, email: emailData });
    }
  };

  const addPhoneEmail = (type: String) => {
    if (type === 'phone') {
      const phoneData = formData.phone;
      phoneData.push({
        type: '',
        phoneNo: '',
        isPrimary: false,
      });
      setFormData({ ...formData, phone: phoneData });
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

  const deletePhoneEmail = (type: String, index: number) => {
    if (type === 'phone') {
      const phoneData = formData.phone;
      phoneData.splice(index, 1);
      setFormData({ ...formData, phone: phoneData });
    }
    if (type === 'email') {
      const emailData = formData.email;
      emailData.splice(index, 1);
      setFormData({ ...formData, email: emailData });
    }
  };

  useEffect(() => {
    if (getUserInfoStatus === LoadingStatus.idle) {
      dispatch(getUser());
    }
    if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
      navigate('/login');
    }
    if (getContactsStatus === LoadingStatus.success) {
      navigate('/contacts');
    }
  }, [getUserInfoStatus, dispatch, navigate, userInfo, getContactsStatus]);

  if (getContactsStatus === LoadingStatus.loading) {
    return <Spinner loadingStatus={getContactsStatus} />;
  }

  return (
    <ContactForm
      formData={formData}
      handleSubmit={handleSave}
      handleCancel={handleCancel}
      handleChange={handleChange}
      addPhoneEmail={addPhoneEmail}
      deletePhoneEmail={deletePhoneEmail}
      handlePhoneEmailChange={handlePhoneEmailChange}
    />
  );
};

export default AddContact;
