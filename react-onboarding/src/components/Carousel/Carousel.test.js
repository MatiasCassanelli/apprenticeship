import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
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
  {
    poster_path: '/poster_path5.jpg',
    release_date: 'date5',
    title: 'title5',
    overview: 'overview5',
    genres: ['genre1', 'genre2'],
    id: 5,
  },
];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
  movies: {},
  user: { userDetails: {} },
  favourites: {},
});

describe('Carousel', () => {
  test('should render nothing because slides prop is empty', () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 1200,
        clientWidth: 1200,
      },
    }));
    render(
      <Provider store={store}>
        <Carousel slides={[]} />
      </Provider>,
    );
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
    render(
      <Provider store={store}>
        <Carousel slides={slides.slice(0, 2)} />
      </Provider>,
    );
    const prevButton = screen.queryByTestId('prev-button');
    const nextButton = screen.queryByTestId('next-button');
    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });
  test('should render the next button enabled because carousel is larger than screen', () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 800,
        clientWidth: 800,
      },
    }));
    render(
      <Provider store={store}>
        <Carousel slides={slides} />
      </Provider>,
    );
    const prevButton = screen.queryByTestId('prev-button');
    const nextButton = screen.queryByTestId('next-button');
    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
  test('should disable previous button when reach the initial slide', async () => {
    useRef.mockImplementation(() => ({
      current: {
        scrollWidth: 800,
        clientWidth: 800,
      },
    }));
    render(
      <Provider store={store}>
        <Carousel slides={slides} />
      </Provider>,
    );
    const nextButton = screen.queryByTestId('next-button');
    expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
    userEvent.click(nextButton);
    const prevButton = screen.queryByTestId('prev-button');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeEnabled();
    userEvent.click(prevButton);
    expect(prevButton).not.toBeInTheDocument();
  });
});
