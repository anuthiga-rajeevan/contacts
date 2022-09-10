import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUser } from '../../store/userSlice';
import { AppDispatch, RootState } from '../../store';
import { LoadingStatus } from '../../types/types';
import Spinner from '../../components/spinner/Spinner';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
  const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (loginStatus === LoadingStatus.success && getUserInfoStatus === LoadingStatus.idle) {
      dispatch(getUser());
    }
    if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
      navigate('/login');
    }
    if (getUserInfoStatus === LoadingStatus.success && userInfo.name) {
      navigate('/contacts');
    }
  }, [getUserInfoStatus, loginStatus, dispatch, navigate, userInfo]);

  const validate = () => {
    setEmailError(null);
    setPasswordError(null);
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
        '& .MuiTextField-root': { m: 1, width: '85%' },
      }}
      autoComplete='off'
    >
      {loginStatus === LoadingStatus.loading ? (
        <Spinner loadingStatus={loginStatus} />
      ) : (
        <>
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
              Login
            </Typography>
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
            <Button variant='contained' sx={{ m: 2, width: '50%' }} onClick={handleSubmit}>
              Submit
            </Button>
          </Item>
          <Item>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Don't you have account yet? Please{' '}
              <Link to='/register' style={{ textDecoration: 'none' }}>
                Register
              </Link>{' '}
              Here
            </Typography>
          </Item>
        </>
      )}
    </Box>
  );
}

export default Login;
