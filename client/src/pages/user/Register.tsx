import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../store/userSlice';
import { AppDispatch, RootState } from '../../store';
import Spinner from '../../components/spinner/Spinner';
import { LoadingStatus } from '../../types/types';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
    const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
    const navigate = useNavigate();
    const initialState = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);

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
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setRepeatPasswordError(null);

        if (formData.name === '' || formData.email === '' || formData.password === '' || formData.repeatPassword === '') {
            if (formData.name === '') {
                setNameError('Please enter your name');
            }
            if (formData.email === '') {
                setEmailError('Please enter your email');
            }
            if (formData.password === '') {
                setPasswordError('Please enter your password');
            }
            if (formData.repeatPassword === '') {
                setRepeatPasswordError('Please re-enter your password');
            }
            return false;
        } else if (formData.password !== '' && formData.repeatPassword !== '' && formData.repeatPassword !== formData.password) {
            setRepeatPasswordError('Password didn\'t match');
            return false;
        }
        return true;
    };
    const handleSubmit = () => {
        if (validate()) {
            dispatch(register({ ...formData }));
            // navigate('/');
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
            {loginStatus === LoadingStatus.loading ? <Spinner loadingStatus={loginStatus} /> : <Item>
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
                <Button variant='outlined' sx={{ m: 2, width: '30%' }} onClick={() => setFormData(initialState)}>
                    Cancel
                </Button>
                <Button variant='contained' sx={{ m: 2, width: '30%' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </Item>}

        </Box>
    );
}

export default Register;
