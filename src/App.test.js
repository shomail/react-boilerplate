import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

describe('App', () => {
  test('Renders without error', () => {
    render(<App />);
  });
});
