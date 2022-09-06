import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getUser } from '../../store/userSlice';
import { LoadingStatus } from '../../types/types';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: RootState) => state.user.loginStatus);
  const getUserInfoStatus = useSelector((state: RootState) => state.user.getUserInfoStatus);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (getUserInfoStatus === LoadingStatus.idle) {
      dispatch(getUser());
    }
    if (getUserInfoStatus === LoadingStatus.success && !userInfo.name) {
      navigate('/login');
    }
    if (getUserInfoStatus === LoadingStatus.success && userInfo.name) {
      navigate('/contacts');
    }
  }, [getUserInfoStatus, loginStatus, dispatch, navigate, userInfo]);
  return <p>Home</p>;
};

export default Home;
