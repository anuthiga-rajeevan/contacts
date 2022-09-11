import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { FilteredContact, User } from '../../types/types';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteContact as deleteContactAction, setGetContactsStatus } from '../../store/contactSlice';

const ContactList = ({ contacts, userInfo }: { contacts: FilteredContact[]; userInfo: User }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<FilteredContact | undefined>();

  if (contacts.length === 0) {
    return <Paper sx={{ p: 5, textAlign: 'center' }}>No Contacts added to your list</Paper>;
  }

  const deleteContact = () => {
    if (userInfo.token && selectedContact) {
      dispatch(
        deleteContactAction({ accessToken: userInfo.token, contactId: selectedContact?._id }),
      );
      setSelectedContact(undefined);
      setShowConfirm(false);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>First Name</TableCell>
              <TableCell align='left'>Last Name</TableCell>
              <TableCell align='left'>Phone</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={`${contact._id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left' component='th' scope='row'>
                  {contact.firstName}
                </TableCell>
                <TableCell align='left'>{contact.lastName}</TableCell>
                <TableCell align='left'>{contact.phoneNo}</TableCell>
                <TableCell align='left'>{contact.emailAddress}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    aria-label='edit'
                    component='label'
                    onClick={() => {dispatch(setGetContactsStatus());navigate(`/contacts/edit/${contact._id}`)}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    aria-label='edit'
                    component='label'
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowConfirm(true);
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        isOpen={showConfirm}
        handleClose={() => {
          setSelectedContact(undefined);
          setShowConfirm(false);
        }}
        handleConfirm={deleteContact}
        contact={selectedContact}
        handleCancel={() => {
          setSelectedContact(undefined);
          setShowConfirm(false);
        }}
      />
    </>
  );
};
export default ContactList;
