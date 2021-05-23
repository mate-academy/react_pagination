import React from 'react';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../App';

describe('Default Pagination component', () => {
  beforeEach(() => render(<App />));

  test('Pressing next and previous button should update info', () => {
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Next'));
    expect(screen.getByText('6 - 10 of 42')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Previous'));
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();
  });

  test('Pressing the page should change the info', () => {
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('2'));
    expect(screen.getByText('6 - 10 of 42')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('3'));
    expect(screen.getByText('11 - 15 of 42')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('1'));
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();
  });

  test('Pressing the page should highlight the new current page', () => {
    fireEvent.click(screen.getByTestId('2'));
    expect(screen.getByTestId('2')
      .parentElement.classList.contains('active')).toBe(true);
  });

  test('Changing total in the input should update the info', () => {
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Total items:'), {
      target: {
        value: 20,
      },
    });

    expect(screen.getByText('1 - 5 of 20')).toBeInTheDocument();
  });

  test('Changing perPage select option should update the info', () => {
    expect(screen.getByText('1 - 5 of 42')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Items per page:'), {
      target: {
        value: 10,
      },
    });

    expect(screen.getByText('1 - 10 of 42')).toBeInTheDocument();
  });
});
