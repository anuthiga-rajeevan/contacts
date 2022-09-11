import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getUser } from '../../store/userSlice';
import { getContact, updateContact } from '../../store/contactSlice';
import { Contact, LoadingStatus, IEmail, IPhone } from '../../types/types';
import ContactForm from '../../components/contact/ContactForm';
import Spinner from '../../components/spinner/Spinner';

const EditContact = () => {
    const {contactId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
    const getContactsStatus = useSelector((state: RootState) => state.contact.getContactsStatus);
    const getContactStatus = useSelector((state: RootState) => state.contact.getContactStatus);
    const contact = useSelector((state: RootState) => state.contact.contact);
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
        if (userInfo.token && Object.keys(formData).length>0 && contactId) {
            dispatch(updateContact({ accessToken: userInfo.token, contactId, reqBody: formData }));
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
            const phoneData = [...formData.phone];
            phoneData[index] = updatedData;
            setFormData({ ...formData, phone: phoneData });
        }
        if (type === 'email') {
            const emailData = [...formData.email];
            emailData[index] = updatedData;
            setFormData({ ...formData, email: emailData });
        }
    };

    const addPhoneEmail = (type: String) => {
        if (type === 'phone') {
            const phoneData = [...formData.phone];
            phoneData.push({
                type: '',
                phoneNo: '',
                isPrimary: false,
            });
            setFormData({ ...formData, phone: phoneData });
        }
        if (type === 'email') {
            const emailData = [...formData.email];
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
            const phoneData = [...formData.phone];
            phoneData.splice(index, 1);
            setFormData({ ...formData, phone: phoneData });
        }
        if (type === 'email') {
            const emailData = [...formData.email];
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
        if (getContactStatus === LoadingStatus.success && contact) {
            setFormData({...contact})
        }
        if (getContactStatus === LoadingStatus.idle && contactId && userInfo.token) {
            dispatch(getContact({accessToken: userInfo.token, contactId}))
        }
    }, [getUserInfoStatus, dispatch, navigate, userInfo, getContactsStatus, getContactStatus, contactId, contact]);

    if (getContactsStatus === LoadingStatus.loading) {
        return <Spinner loadingStatus={getContactsStatus} />;
    }

    return (
        <ContactForm
            heading='Edit Contact'
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

export default EditContact;
