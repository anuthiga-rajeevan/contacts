import React from 'react';
import { Contact, IEmail, IPhone } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  styled,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Divider,
  SelectChangeEvent,
} from '@mui/material';

interface IProps {
  formData: Contact;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  addPhoneEmail: (type: String) => void;
  deletePhoneEmail: (type: String, index: number) => void;
  handlePhoneEmailChange: (data: IPhone | IEmail) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const InnerItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.disabled,
}));

const ContactForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  addPhoneEmail,
  deletePhoneEmail,
  handlePhoneEmailChange,
}: IProps) => {
  const phoneNoTypes = ['home', 'mobile', 'work', 'business'];
  const emailTypes = ['personal', 'work', 'business'];

  const handlePhoneChange = (
    evt: SelectChangeEvent<String> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    handlePhoneEmailChange({
      type: 'phone',
      index,
      data: { ...formData.phone[index], [evt.target.name]: evt.target.value },
    });
  };

  const handleEmailChange = (
    evt: SelectChangeEvent<String> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    handlePhoneEmailChange({
      type: 'email',
      index,
      data: { ...formData.email[index], [evt.target.name]: evt.target.value },
    });
  };

  return (
    <Box
      component='form'
      sx={{
        mt: 5,
        width: '85%',
        '& .MuiTextField-root': { ml: 2, mb: 2, width: '46%' },
      }}
      autoComplete='off'
    >
      <Item>
        <Typography
          variant='h2'
          noWrap
          sx={{
            ml: 2,
            mt: 1,
            mb: 2,
            fontWeight: 200,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Add Contact
        </Typography>
        <TextField
          required
          id='firstName'
          label='First Name'
          name='firstName'
          value={formData.firstName}
          onChange={(evt) => handleChange(evt)}
        />
        <TextField
          required
          id='lastName'
          label='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={(evt) => handleChange(evt)}
        />
        <InnerItem variant='outlined' sx={{ ml: 2, width: '93%', mb: 2 }}>
          <Typography
            variant='h6'
            noWrap
            sx={{
              ml: 2,
              mt: 1,
              mb: 2,
              fontWeight: 200,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Phone
          </Typography>
          {formData.phone.map((phone, index) => (
            <Paper elevation={0} sx={{ mt: 2 }} key={`phone${index}`}>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={phone.type}
                name='type'
                label='Type'
                onChange={(evt) => handlePhoneChange(evt, index)}
                sx={{ ml: 2, width: '15%' }}
              >
                {phoneNoTypes.map((phoneNoType) => (
                  <MenuItem key={`phone${phoneNoType}`} value={phoneNoType}>
                    {phoneNoType}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                id='phoneNo'
                label='Phone No'
                name='phoneNo'
                value={phone.phoneNo}
                onChange={(evt) => handlePhoneChange(evt, index)}
                sx={{ ml: 2 }}
              />
              <Checkbox
                checked={phone.isPrimary}
                sx={{ ml: 2 }}
                onChange={(evt) =>
                  handlePhoneEmailChange({
                    type: 'phone',
                    index,
                    data: { ...formData.phone[index], isPrimary: evt.target.checked },
                  })
                }
              />
              <IconButton
                aria-label='delete'
                size='large'
                color='error'
                sx={{ ml: 5 }}
                onClick={() => deletePhoneEmail('phone', index)}
              >
                <DeleteIcon fontSize='large' />
              </IconButton>
              <Divider />
            </Paper>
          ))}
          <IconButton
            aria-label='add'
            size='large'
            color='primary'
            sx={{ textAlign: 'right' }}
            onClick={() => addPhoneEmail('phone')}
          >
            <AddBoxIcon fontSize='large' />
          </IconButton>
        </InnerItem>
        <InnerItem variant='outlined' sx={{ ml: 2, width: '93%' }}>
          <Typography
            variant='h6'
            noWrap
            sx={{
              ml: 2,
              mt: 1,
              mb: 2,
              fontWeight: 200,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Email
          </Typography>
          {formData.email.map((email, index) => (
            <Paper elevation={0} sx={{ mt: 2 }} key={`email${index}`}>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={email.type}
                label='Type'
                name='type'
                onChange={(evt) => handleEmailChange(evt, index)}
                sx={{ ml: 2, width: '15%' }}
              >
                {emailTypes.map((emailType) => (
                  <MenuItem key={`email${emailType}`} value={emailType}>
                    {emailType}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                id='email'
                label='Email Address'
                name='email'
                value={email.email}
                onChange={(evt) => handleEmailChange(evt, index)}
                sx={{ ml: 2 }}
              />
              <Checkbox
                checked={email.isPrimary}
                sx={{ ml: 2 }}
                onChange={(evt) =>
                  handlePhoneEmailChange({
                    type: 'email',
                    index,
                    data: { ...formData.email[index], isPrimary: evt.target.checked },
                  })
                }
              />
              <IconButton
                aria-label='delete'
                size='large'
                color='error'
                sx={{ ml: 5 }}
                onClick={() => deletePhoneEmail('email', index)}
              >
                <DeleteIcon fontSize='large' />
              </IconButton>
              <Divider />
            </Paper>
          ))}
          <IconButton
            aria-label='add'
            size='large'
            color='primary'
            onClick={() => addPhoneEmail('email')}
          >
            <AddBoxIcon fontSize='large' />
          </IconButton>
        </InnerItem>
        <Button variant='outlined' sx={{ m: 2, width: '30%' }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='contained' sx={{ m: 2, width: '30%' }} onClick={handleSubmit}>
          Submit
        </Button>
      </Item>
    </Box>
  );
};

export default ContactForm;
