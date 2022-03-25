import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

const slides = [
  {
    poster_path: '/poster_path1.jpg',
    release_date: 'date1',
    title: 'title1',
    overview: 'overview1',
    genres: ['genre1', 'genre2'],
    id: 1,
  },
  {
    poster_path: '/poster_path2.jpg',
    release_date: 'date2',
    title: 'title2',
    overview: 'overview2',
    genres: ['genre1', 'genre2'],
    id: 2,
  },
  {
    poster_path: '/poster_path3.jpg',
    release_date: 'date3',
    title: 'title3',
    overview: 'overview3',
    genres: ['genre1', 'genre2'],
    id: 3,
  },
  {
    poster_path: '/poster_path4.jpg',
    release_date: 'date4',
    title: 'title4',
    overview: 'overview4',
    genres: ['genre1', 'genre2'],
    id: 4,
  },
];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));
describe('Carousel', () => {
  test('should render nothing because slides prop is empty', () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 1200,
        clientWidth: 1200,
      },
    }));
    render(<Carousel slides={[]} />);
    const prevButton = screen.queryByTestId('prev-button');
    const nextButton = screen.queryByTestId('next-button');
    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });
  test('both buttons should be disabled because screen is larger than carousel width', async () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 1200,
        clientWidth: 1200,
      },
    }));
    render(<Carousel slides={slides.slice(0, 2)} />);
    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
  test('should render the next button enabled because carousel is larger than screen', () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 800,
        clientWidth: 800,
      },
    }));
    render(<Carousel slides={slides} />);
    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeEnabled();
    expect(prevButton).toBeDisabled();
  });
  test('should disable previous button when reach the initial slide', async () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 800,
        clientWidth: 800,
      },
    }));
    render(<Carousel slides={slides} />);
    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');
    expect(prevButton).toBeDisabled();
    userEvent.click(nextButton);
    expect(prevButton).toBeEnabled();
    userEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });
});
