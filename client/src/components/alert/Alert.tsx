import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';

import { RootState, AppDispatch } from '../../store';
import { removeAlert } from '../../store/alertSlice';
import { useEffect } from 'react';

const Alert = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alerts = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (alerts.length > 0) {
      setTimeout(() => dispatch(removeAlert()), 5000);
    }
  });
  if (alerts !== null && alerts.length > 0) {
    return (
      <Snackbar key={alerts[0].id} open={true} autoHideDuration={6000} message={alerts[0].msg} />
    );
  }

  return null;
};

export default Alert;
