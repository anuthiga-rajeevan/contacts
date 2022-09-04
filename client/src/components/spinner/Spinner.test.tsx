import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import { LoadingStatus } from '../../types/types';

describe('Spinner', () => {
  it('should render CircularProgress component when loading status is loading', () => {
    render(<Spinner loadingStatus={LoadingStatus.loading} />);
    const spinnerElement = screen.queryAllByTestId('testSpinnerId');
    expect(spinnerElement).toHaveLength(1);
  });
  it('should not render CircularProgress component when loading status is not loading', () => {
    render(<Spinner loadingStatus={LoadingStatus.idle} />);
    const spinnerElement = screen.queryAllByTestId('testSpinnerId');
    expect(spinnerElement).toHaveLength(0);
  });
});
