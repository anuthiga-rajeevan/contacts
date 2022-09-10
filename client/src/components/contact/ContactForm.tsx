import React from 'react';
import { Contact } from '../../types/types';
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
} from '@mui/material';

interface IProps {
  formData: Contact;
  handleChange: () => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  addPhoneEmail: (type: String) => void;
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
}: IProps) => {
  const phoneNoTypes = ['home', 'mobile', 'work', 'business'];
  const emailTypes = ['personal', 'work', 'business'];

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
          onChange={handleChange}
        />
        <TextField
          required
          id='lastName'
          label='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
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
          {formData.phone.map((phone) => (
            <Paper elevation={0} sx={{ mt: 2 }}>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={phone.type}
                label='Type'
                onChange={handleChange}
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
                onChange={handleChange}
                sx={{ ml: 2 }}
              />
              <Checkbox checked={phone.isPrimary} sx={{ ml: 2 }} />
              <IconButton aria-label='delete' size='large' color='error' sx={{ ml: 5 }}>
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
          {formData.email.map((email) => (
            <Paper elevation={0} sx={{ mt: 2 }}>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={email.type}
                label='Type'
                onChange={handleChange}
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
                onChange={handleChange}
                sx={{ ml: 2 }}
              />
              <Checkbox checked={email.isPrimary} sx={{ ml: 2 }} />
              <IconButton aria-label='delete' size='large' color='error' sx={{ ml: 5 }}>
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
