import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UpcomingMovie from './UpcomingMovie';
import * as movieServices from '../../services/movies';

const mockMovie = {
  poster_path: '/pEFRzXtLmxYNjGd0XqJDHPDFKB2.jpg',
  release_date: '2016-09-02',
  title: 'The Light Between Oceans',
  overview:
    'A lighthouse keeper and his wife living off the coast of Western Australia raise a baby they rescue from an adrift rowboat.',
  genres: ['Suspense', 'Action'],
  id: 283552,
};
const mockStore = configureStore();
const store = mockStore({
  movies: {},
  user: { userDetails: {} },
  favourites: {},
});

test('should render dynamic movie data', () => {
  const date = new Date(mockMovie.release_date);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const releaseDate = `${month} ${day}`;
  render(
    <Provider store={store}>
      <UpcomingMovie movie={mockMovie} />
    </Provider>,
  );
  expect(screen.getByText(mockMovie.title));
  expect(screen.getByText(mockMovie.overview));
  expect(screen.getByText(`Coming ${releaseDate}`));
});

test('should render video player after fetch video data', async () => {
  const expectedUrl = 'https://www.youtube.com/embed/6JnN1DmbqoU';
  const getVideoSpy = jest
    .spyOn(movieServices, 'getVideoUrl')
    .mockResolvedValue(expectedUrl);
  render(
    <Provider store={store}>
      <UpcomingMovie movie={mockMovie} />
    </Provider>,
  );
  await waitFor(() => expect(getVideoSpy).toHaveBeenCalledWith(mockMovie.id));
  const videoPlayer = screen.getByTitle(mockMovie.title);
  expect(videoPlayer).toBeInTheDocument();
  expect(videoPlayer).toHaveAttribute('src', expectedUrl);
});

test('should not render video player because video object is not expected', async () => {
  const getVideoSpy = jest
    .spyOn(movieServices, 'getVideoUrl')
    .mockResolvedValue('');
  render(
    <Provider store={store}>
      <UpcomingMovie movie={mockMovie} />
    </Provider>,
  );
  await waitFor(() => expect(getVideoSpy).toHaveBeenCalledWith(mockMovie.id));
  expect(screen.queryByTitle(mockMovie.title)).not.toBeInTheDocument();
});
