import React from 'react';
import { FilteredContact } from '../../types/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IProps {
  isOpen: boolean;
  handleConfirm: () => void;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  contact: FilteredContact | undefined;
  handleCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  handleConfirm,
  handleClose,
  contact,
  handleCancel,
}: IProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      {contact && (
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the contact of {contact.firstName} {contact.lastName}?
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
