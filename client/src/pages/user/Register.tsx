import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/userSlice';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);

  const validate = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setRepeatPasswordError(null);
    if (formData.email === '') {
      setEmailError('Please enter your email');
    }
    if (formData.password === '') {
      setPasswordError('Please enter your password');
    }
    if (formData.email === '' || formData.password === '') {
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (validate()) {
      dispatch(login(formData));
      navigate('/spells');
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Box
      component='form'
      sx={{
        mt: 15,
        '& .MuiTextField-root': { m: 1, width: '95%' },
      }}
      autoComplete='off'
    >
      <Item>
        <Typography
          variant='h2'
          noWrap
          component='a'
          href='/'
          sx={{
            fontWeight: 200,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Register
        </Typography>
        <TextField
          required
          id='name'
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontWeight: 'light' }}>{nameError}</div>
        <TextField
          required
          id='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontWeight: 'light' }}>{emailError}</div>
        <TextField
          required
          id='password'
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontWeight: 'light' }}>{passwordError}</div>
        <TextField
          required
          id='repeatPassword'
          label='Repeat Password'
          type='password'
          name='repeatPassword'
          value={formData.repeatPassword}
          onChange={handleChange}
        />
        <div style={{ color: 'red', fontWeight: 'light' }}>{repeatPasswordError}</div>
        <Button variant='contained' sx={{ m: 2, width: '50%' }} onClick={handleSubmit}>
          Submit
        </Button>
      </Item>
    </Box>
  );
}

export default Register;
