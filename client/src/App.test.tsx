import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

const initialState = {
  user: { userInfo: { name: 'test', email: 'test@gmail.com', token: 'token' } },
  alert: [],
};
const mockStore = configureStore();
let store;

describe('App', () => {
  it('should render header component', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );
    const headerElement = screen.queryAllByTestId('testHeaderId');
    expect(headerElement).toHaveLength(1);
  });
});
